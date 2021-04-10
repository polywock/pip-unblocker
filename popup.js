
const standardIcons = {
  "128": `icon128.png`
}

const grayscaleIcons = {
  "128": `icon128_grayscale.png`
}


function getDefaultConfig() {
  return {
    version: 1,
    enabled: true
  }
}


let activateDiv = document.getElementById("activate")
document.getElementById("github").addEventListener("click", e => {
  window.open("https://github.com/polywock/pipUnblocker", '_blank');
})

let config;

activateDiv.addEventListener("click", e => {
  config.enabled = !config.enabled
  chrome.storage.local.set({config})
})



chrome.storage.local.get(items => {
  config = items["config"] || getDefaultConfig()
  syncDOM()
  syncIcon()
})

chrome.storage.onChanged.addListener(changes => {
  const newConfig = changes["config"].newValue
  if (!newConfig) return 
  config = newConfig
  syncDOM()
  syncIcon()
})

function syncDOM() {
  activateDiv.style.color = config.enabled ? "#24c" : "#888"
}

function syncIcon() {
  chrome.browserAction.setIcon({
    path: config.enabled ? standardIcons : grayscaleIcons
  })
}
