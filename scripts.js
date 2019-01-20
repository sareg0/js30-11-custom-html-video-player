/*Get the elements */
//jumpback and forward could probably have the same event listeners
//see if you can go more generic
const jumpBack = document.querySelector('button[data-skip="25"]')
const jumpForward = document.querySelector('button[data-skip="-10"]')
const progressBar = document.querySelector("div.progress")
const playButton = document.querySelector(".player__button.toggle")
const progress = document.querySelector(".progress__filled")
const speedControl = document.querySelector('input[name="playbackRate"]')
const volControl = document.querySelector('input[name="volume"]')
const video = document.querySelector(".player__video")

video.volume = volControl.value
video.playbackRate = speedControl.value


/*Build the functions */
function togglePlayState (event) {
  if (video.paused) {
    video.play()
    event.target.textContent = "❚❚"
  } else {
    //could listen for 'onpause' to change the content
    event.target.textContent = "►"
    video.pause()
  }
}

function scrubProgress (event) {
  //not very exact when clicking. Is math correct?
  let progressBarLength = progressBar.offsetWidth
  let unit = progressBarLength/video.duration
  let position = event.layerX
  let vidPoint = unit * position
  let percentageFinished = (event.layerX/progressBarLength)*100
  updateProgressBar(`${percentageFinished}%`)
  video.currentTime = vidPoint
}

function updateProgressBar(percentage) {
  progress.style.flexBasis = `${percentage}%`
  progress.style.width = `${percentage}%`
}

function updateProgress() {
  let progressBarLength = progressBar.offsetWidth
  let percentagePlayed = (video.currentTime/progressBarLength)*100
  updateProgressBar(percentagePlayed)
}

function changeVolume (event) {
  video.volume = event.target.value
}

function changePlaybackSpeed (event) {
  video.playbackRate = event.target.value
}

function seek (event) {
  let seekAmount = parseInt(event.target.getAttribute("data-skip")) 
  video.currentTime = video.currentTime + seekAmount
}

/* hook up the event listeners */
playButton.addEventListener("click", togglePlayState)
//click or mousemove for the scrubber?
progressBar.addEventListener("click", scrubProgress)
video.addEventListener("timeupdate", updateProgress)
jumpBack.addEventListener("click", seek)
jumpForward.addEventListener("click", seek)
speedControl.addEventListener("input", changePlaybackSpeed)
volControl.addEventListener("input", changeVolume)