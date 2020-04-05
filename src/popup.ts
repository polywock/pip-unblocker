import { Config } from "./types"
import { getDefaultConfig, standardIcons, grayscaleIcons } from "./defaults"


let activateDiv = document.getElementById("activate")
document.getElementById("github").addEventListener("click", e => {
  window.open("https://github.com/polywock/globalSpeed", '_blank');
})

let config: Config; 

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
  const newConfig = changes["config"].newValue as Config
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