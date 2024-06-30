
    const imageInput = document.getElementById('input-image')
    const imagePreview = document.getElementById('image-preview')

    const sliderParent = document.getElementById('slider-parent')
    const sliderChild = document.getElementById('slider-child')

    const camStartBtn = document.getElementById('cam-start-btn')
    const camStopBtn = document.getElementById('cam-stop-btn')
    const video = document.getElementById('cam-video')

    imageInput.addEventListener('change', function() {
        const file = this.files[0]
        if (file) {
            const loadedImage = document.createElement('img')
            loadedImage.src = URL.createObjectURL(file)
            loadedImage.onload = () => {
                URL.revokeObjectURL(loadedImage.src)
                imagePreview.innerHTML = ''
                imagePreview.appendChild(loadedImage)
        }} else {
            imagePreview.innerHTML = 'noImage'
        }
    })

    const sreamContrains = {
        video: {
            width: {
                min: 640,
                ideal: 1280,
                max: 1920
            },
            height: {
                min: 480,
                ideal: 720,
                max: 1080
            },
            facingMode: {
                ideal: 'environment'
            }
        }
    }

    camStartBtn.addEventListener('click', async () => {
       try {
        stream = await navigator.mediaDevices.getUserMedia(sreamContrains)
        video.srcObject = stream
        video.style.height = '700px'
       } catch (error) {
            alert(error)
       }
    })

    camStopBtn.addEventListener('click', () => {
        if (stream) {
            const tracks = stream.getTracks()
            tracks.forEach(track => track.stop())
            video.srcObject = null
        }
    })

    sliderParent.addEventListener('click', (event) => {

        const sliderParentTotalWidth = event.target.offsetWidth
        const sliderParentWidth = event.offsetX
        sliderChild.style.width = `${sliderParentWidth}px`
        const percentageWidth = (sliderParentWidth/sliderParentTotalWidth)
        
        const image = document.querySelector('img')
        if(image) {
            image.style.opacity = percentageWidth
        }
    })