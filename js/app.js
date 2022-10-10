var res = fetch('http://127.0.0.1:8000/songs/')
  .then((response) => response.json())
  .then((data) => dataSongs = data);
var dataSongs = null
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const imgMusicPlaying = $(".cd-thumb")
const nameMusicPlaying = $("header h2")
const audioMusicPlaying = $("#audio")
const buttonPause = $(".icon-pause")
const buttonPlay = $(".icon-play")
const buttonControl = $(".btn-toggle-play")
const player = $(".player")
const progress = $("#progress")
const buttonNext = $(".btn-next")
const buttonPre = $(".btn-prev")
const buttonRandom = $(".btn-random")
const buttonRepeat = $(".btn-repeat")
const musicActive = $(".song.active")
const playlist = $(".playlist")
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    nextSong() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadMucsic()
    },
    preSong() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadMucsic()
    },
    randomSong() {
        let newIndexSong
        do {
            newIndexSong = Math.floor(Math.random() * this.songs.length)
        } while (this.currentIndex === newIndexSong)
        this.currentIndex = newIndexSong
        this.loadMucsic()
    },
    songs: dataSongs,
    defindProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadMucsic() {
        imgMusicPlaying.style.backgroundImage = `url(${this.currentSong.image})`
        nameMusicPlaying.textContent = `${this.currentSong.name}`
        audioMusicPlaying.src = `${this.currentSong.path}`
    },
    scrollToView(){
        $(".song.active").scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    },
    render() {
        const htmls = this.songs.map((song,index) => {
            return `
          <div data-id = ${index} class="song ${index === this.currentIndex? 'active' : ''}">
              <div class="thumb"
                  style="background-image: url('${song.image}')">
              </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
          `
        })
        playlist.innerHTML = htmls.join('')
    },
    handleEvent() {
        //Event Scroll
        const widthCd = $(".cd").clientHeight
        document.onscroll = () => {
                const scrollY = window.scrollY || document.documentElement.scrollTop
                var newCdWidth = widthCd - scrollY
                $(".cd").style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 + 'px'
                $(".cd").style.opacity = newCdWidth / widthCd
            }
            //Event buttonControl clicked
        buttonControl.onclick = () => {
                if (app.isPlaying) {
                    audioMusicPlaying.pause()
                } else {
                    audioMusicPlaying.play()
                }
            }
            //Rotate Img
        const imgRotate = imgMusicPlaying.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        imgRotate.pause()
            //Event pause
        audioMusicPlaying.onpause = () => {
                app.isPlaying = false
                player.classList.remove("playing")
                imgRotate.pause()
            }
            //Event playing
        audioMusicPlaying.onplay = () => {
                app.isPlaying = true
                player.classList.add("playing")
                imgRotate.play()
            }
            //Event seek
        audioMusicPlaying.ontimeupdate = () => {
            if (audioMusicPlaying.duration) {
                progressPercent = audioMusicPlaying.currentTime / audioMusicPlaying.duration * 100
                progress.value = progressPercent
            }
            //Xử lí khi tua
            progress.oninput = (e) => {
                    const seekTime = audioMusicPlaying.duration / 100 * progress.value
                    audioMusicPlaying.currentTime = seekTime
                }
                //Xử lí khi endSong
            audioMusicPlaying.onended = () => {
                    if (this.isRepeat) {
                        audioMusicPlaying.play()
                    } else {
                        buttonNext.click()
                    }
                }
                //Bấm next
            buttonNext.onclick = () => {
                    if (this.isRandom) {
                        app.randomSong()
                    } else {
                        app.nextSong()
                    }
                    audioMusicPlaying.play()
                    app.render()
                    app.scrollToView()
                }
                //Bấm Pre
            buttonPre.onclick = () => {
                    if (this.isRandom) {
                        app.randomSong()
                    } else {
                        app.preSong()
                    }
                    audioMusicPlaying.play()
                    app.render()
                    app.scrollToView()
                }
                //Bấm random
            buttonRandom.onclick = () => {
                    app.isRandom = !app.isRandom
                    buttonRandom.classList.toggle("active", app.isRandom)
                }
                //Bấm repeat
            buttonRepeat.onclick = () => {
                app.isRepeat = !app.isRepeat
                buttonRepeat.classList.toggle("active", app.isRepeat)
            }
            //Bấm bài hát nào sẽ chuyển sang bài hát đó
           playlist.onclick = (e)=>{
            const nodePlaylist = e.target.closest(".song:not(.active)") 
            if(nodePlaylist || e.target.closest(".option")) {
                if(nodePlaylist && !e.target.closest(".option")) {
                    app.currentIndex = Number(nodePlaylist.getAttribute("data-id"))
                    app.loadMucsic()
                    audioMusicPlaying.play()
                    app.render()
                }
                else if(e.target.closest(".option")) {
                    console.log(1234)
                }
            }
           }
        }
    },
    start(x) {
        console.log(x)
        app.songs = x
        //Định nghĩa các thuộc tính của Object App
        this.defindProperties()
            //Load bài hát đầu tiên
        this.loadMucsic()
            //Xử lí các sự kiện (DOM Event)
        this.handleEvent()
            //Render Playlist
        this.render()
    }
}
// app.start()
var res = fetch('http://127.0.0.1:8000/songs/')
  .then((response) => response.json())
  .then((data) => {
    app.start(data)
  });