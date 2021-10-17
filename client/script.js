const audio_elements = document.querySelectorAll('audio')
const play_elements = document.querySelectorAll('input[type="image"]')
const volume_elements = document.querySelectorAll('input[class="slider volume"]')
const stereo_elements = document.querySelectorAll('input[class="slider stereo"]')

const audioContext = new AudioContext()
const gainNodes = []
const pannerNodes = []
const sources = []

setupAudioNodes()
handleAudioLooping()
handlePlayPause()
handleSliders()

function setupAudioNodes() {
    volume_elements.forEach((item) => {
        gainNodes.push(new GainNode(audioContext, { gain: item.value }))
    })
    
    stereo_elements.forEach((item) => {
        pannerNodes.push(new StereoPannerNode(audioContext, { pan: item.value }))
    })
    
    audio_elements.forEach((item, index) => {
        sources.push(audioContext.createMediaElementSource(item))
        sources[index].connect(gainNodes[index]).connect(pannerNodes[index]).connect(audioContext.destination)
    })
}

function handleAudioLooping() {
    audio_elements.forEach((item, index) => {
        console.log(item)
        item.addEventListener('timeupdate', () => {
            switch(item.id) {
                case "chatter_audio":
                    if (item.currentTime > (item.duration - 1.45)) {
                        item.currentTime = 0.75
                        item.play()
                    }
                    break;
                case "barista_audio":
                    if (item.currentTime > (item.duration - .25)) {
                        item.currentTime = 0.25
                        item.play()
                    }
                    break;
                case "rainy_audio":
                    if (item.currentTime > (item.duration - 1)) {
                        item.currentTime = .812
                        item.play()
                    }
                    break;
                case "spring_audio":
                    if (item.currentTime > (item.duration - 1.45)) {
                        item.currentTime = 1.75
                        item.play()
                    }
                    break;
                case "sunny_audio":
                    if (item.currentTime > (item.duration - 1)) {
                        item.currentTime = 1
                        item.play()
                    }
                    break;
                default:
                    console.log('ERROR')
                    break;
            }
        })
    })
}

function handlePlayPause() {
    play_elements.forEach((item, index) => {
        item.addEventListener("click", async () => {
            if (audioContext.state === 'suspended') {
                await audioContext.resume()
            }
            item.src = item.src.match("./assets/images/icons8-play-24.png")
                ? "./assets/images/icons8-pause-24.png"
                :"./assets/images/icons8-play-24.png"
            audio_elements[index].paused ? audio_elements[index].play() : audio_elements[index].pause()
        })
    })
}

function handleSliders() {
    volume_elements.forEach((item, index) => {
        item.addEventListener('input', e => {
            const value = parseFloat(e.target.value)
            gainNodes[index].gain.value = value
        })
    })
    stereo_elements.forEach((item, index) => {
        item.addEventListener('input', e => {
            const value = parseFloat(e.target.value)
            pannerNodes[index].pan.value = value
        })
    })
}
