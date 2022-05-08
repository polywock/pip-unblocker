
let config;

window.github.addEventListener("click", e => {
  window.open("https://github.com/polywock/pipUnblocker", '_blank');
})


window.activate.addEventListener("click", e => {
  config.enabled = !config.enabled
  chrome.storage.local.set({config})
})

chrome.storage.local.get(items => {
  config = items["config"] || getDefaultConfig()
  syncDOM()
  syncIcon()
})

chrome.storage.onChanged.addListener(changes => {
  const newConfig = changes["config"]?.newValue
  if (!newConfig) return 
  config = newConfig
  syncDOM()
  syncIcon()
})


function getDefaultConfig() {
  return {
    version: 1,
    enabled: true
  }
}

function syncDOM() {
  window.activate.style.color = config.enabled ? "#24c" : "#888"
}

function syncIcon() {
  chrome.browserAction.setIcon({
    path: {"128": config.enabled ? "icon128.png" : "icon128_grayscale.png"} 
  })
}
