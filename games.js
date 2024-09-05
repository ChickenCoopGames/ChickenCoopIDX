let hasSeenTip = localStorage.getItem("hasSeenTip") || false

const unlockedGames = ['driftboss', 'minecraft', 'geoguessr', 'amongus', 'cookieclicker', 'geforce'].concat(JSON.parse(localStorage.getItem("unlockedGames")||'[]'))

const currentGame = location.href.split("?")[1]

let recentGames = JSON.parse(localStorage.getItem("recentGames") || '[]')

console.log("RECENT GAMES: ", recentGames)

// Check if they own the game
if (unlockedGames.indexOf(currentGame) == -1) {
  // They haven't unlocked the game they are on.
  // Later on we could do temp ban using expiring cookies but for now
  // we will just redirect them.

  location.href = '/'
} else {
  document.querySelector("iframe").src=gameList[currentGame].gameLink
  document.title = gameList[currentGame].name
  recentGames.push(currentGame)
  // recentGames = recentGames.length > 5 ? recentGames.splice(0, recentGames.length - 5) : recentGames
  recentGames = recentGames.filter((item, index) => recentGames.lastIndexOf(item) === index)
  recentGames.length > 5 ? recentGames.splice(0, recentGames.length - 5) : recentGames
  localStorage.setItem("recentGames", JSON.stringify(recentGames))
}

// Popup function
function showPopup(text, duration) {
  document.querySelector("body > div:has(i) > i").innerText=text
  document.querySelector("body > div:has(i)").classList.add("slideIn")
  localStorage.setItem("hasSeenTip", true)
  setTimeout(function(){
    document.querySelector("body > div:has(i)").classList.remove("slideIn")
  }, duration * 1000)
}

// Add Cc logo
document.querySelector("body > #menu").addEventListener('click', (e) => {
  if (confirm("Are you sure you'd like to return home?")) {
    location.href='/'
  }
})

// Show beginner's tip
if (!hasSeenTip) {
  setTimeout(function(){
    showPopup("Tip: Press the logo in the bottom left at any time to leave the game.", 5)
  },3000)
}

// Playtime rewards
let minuteCounter = localStorage.getItem("minuteCounter") || 0

let tokens = localStorage.getItem("tokens") || 0

function loopPurposes() {
  minuteCounter++
  if (minuteCounter == 10) {
    minuteCounter = 0
    tokens++
    localStorage.setItem("tokens", tokens)
    showPopup("+1 token for 10 minutes of playtime\nTotal tokens: " + tokens, 5)
  }
  localStorage.setItem("minuteCounter", minuteCounter)
  setTimeout(loopPurposes, 60000)
}

setTimeout(loopPurposes, 60000)