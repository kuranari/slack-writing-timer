export {}

window.addEventListener('input', (event) => { console.log(event) })
const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await _sleep(2000);
const input = document.querySelector('.ql-editor')
const button = document.querySelector('[data-qa="texty_send_button"]')

const timeBox = document.createElement('div')

let startTime = null
let timerId = null

function reset() {
  startTime = null
  clearInterval(timerId)
  timeBox.textContent = ''
}

const showInterval = () => {
  timeBox.textContent = parseInt((new Date() - startTime) / 1000)
}

const onInput = () => {
  const buttonArea = document.querySelector('.c-texty_buttons')
  buttonArea.appendChild(timeBox)

  const text = input.innerText.replace(/\r?\n/g,"")
  console.log(text)
  if (text.length == 0) {
    reset()
    return 
  }

  if (startTime == null) {
    startTime = new Date()
    console.log(`start: ${startTime}`)
    showInterval()

    timerId = setInterval(showInterval, 500)
  }
}

input.addEventListener("input", onInput)

// 文字をすべて削除された場合には入力要素がDOMから取り除かれるため、inputイベントが発生しない
// そのため MutationObserver を使用して、文字が削除されたイベントを検知している
const observer = new MutationObserver(onInput)
const config = { 
  attributes: true, 
  childList: true, 
  characterData: true,
};
observer.observe(input, config)

button.addEventListener('click', (event) => {
  const endTime = new Date()
  const interval = (endTime - startTime) / 1000

  console.log(`end  : ${endTime}`)
  console.log(`interval: ${interval}sec`)

  reset()
  event.preventDefault()
});