
chrome.action.onClicked.addListener(async tab => {
    const results = await chrome.scripting.executeScript({
        func: getPageInfo,
        target: {
            tabId: tab.id,
            allFrames: true
        }
    })

    // Check if any enabled 
    const activeResult = results.find(r => r.result?.active)
    if (activeResult) {

        await chrome.scripting.executeScript({
            func: exitPiP,
            target: {
                tabId: tab.id,
                frameIds: [activeResult.frameId]
            }
        })
        return 
    }

    const video = getVideos(results).sort((a, b) => b.score - a.score)[0]
    if (video) {
        await chrome.scripting.executeScript({
            func: enterPiP,
            target: {
                tabId: tab.id,
                frameIds: [video.frameId]
            },
            args: [video.pipId]
        })
    }
})

/**
 * @returns {VideoInfo[]}
 */
function getVideos(results) {
    return results.filter(r => r.result?.videos?.length).map(r => {
        const videos = r.result.videos.map(v => {
            v.frameId = r.frameId
            v.score = calculateScore(v)
            return v 
        })
        return videos 
    }).flat(1)
}

/**
 * @returns {Result}
 */
function getPageInfo() {
    return {
        active: !!document.pictureInPictureElement,
        videos: [...document.getElementsByTagName("video")]
        .filter(v => v.duration)
        .map(v => {
            v.removeAttribute("disablePictureInPicture")
            v.pipTek = Math.random().toString()

            const b = v.getBoundingClientRect()
            const partInterx = b.x + b.w >= 0 && b.y < window.innerHeight
            const fullInterx = b.x >= 0 && b.y + b.height < window.innerHeight

            return {
                score: 0,
                duration: v.duration,
                partInterx,
                fullInterx,
                frameId: 0,
                pipId: v.pipTek
            }
        })
    }
}

/**
 * @param {VideoInfo} video 
 */
function calculateScore(video) {
    const topFrame = video.frameId === 0
    let score = 0 
    if (video.fullInterx && topFrame) score += 150
    if (video.partInterx && topFrame) score += 70
    if (video.duration > 60 * 10) score += 100
    if (topFrame) score += 20
    if (video.duration > 60 * 1) score += 10

    return score 
}

function exitPiP() {
    document.exitPictureInPicture()
}


function enterPiP(pipId) {
    [...document.getElementsByTagName("video")].find(v => v.pipTek === pipId)?.requestPictureInPicture()
}