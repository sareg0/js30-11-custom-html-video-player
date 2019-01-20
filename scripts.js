/*Get the elements */
//jumpback and forward could probably have the same event listeners
//see if you can go more generic
const jumpBack = document.querySelector('button[data-skip="25"]')
const jumpForward = document.querySelector('button[data-skip="-10"]')
const progressBar = document.querySelector("div.progress")
const playButton = document.querySelector(".player__button.toggle")
const scrubber = document.querySelector(".progress__filled")
const speedControl = document.querySelector('input[name="playbackRate"]')
const volControl = document.querySelector('input[name="volume"]')
const video = document.querySelector(".player__video")

console.log(progressBar)

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
  let unit = progressBar.offsetWidth/video.duration
  let position = event.layerX
  let vidPoint = unit * position
  video.currentTime = vidPoint
}

/* hook up the event listeners */
playButton.addEventListener("click", togglePlayState)
progressBar.addEventListener("click", scrubProgress)