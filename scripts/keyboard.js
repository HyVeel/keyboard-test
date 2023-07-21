document.addEventListener("keydown", keylogger)
document.addEventListener("keyup", keylogger)
document.addEventListener("contextmenu", key => key.preventDefault())

let keyboard = document.getElementById("keyboard")
let history = document.getElementById("history")
let historyLimit = 50

history.style.width = keyboard.offsetWidth + "px"

function keylogger(key)
{
    key.preventDefault()
    
    if(!key.repeat)
    {
        if(key.type == "keydown") history.innerHTML += "<p class='history-key'>&lt" + (key.key.toUpperCase() ?? "unknown") + "&gt</p>"
        if(history.children.length > historyLimit) history.removeChild(history.children[0])

        let keyName = "key-" + key.keyCode
        let leftKeys = ["Subtract", "Enter", "ShiftLeft", "ControlLeft", "AltLeft"]
        let rightKeys = ["NumpadSubtract", "NumpadEnter", "ShiftRight", "ControlRight","AltRight"]

        if(leftKeys.includes(key.code)) keyName += "-l"
        else if(rightKeys.includes(key.code)) keyName += "-r"

        pressKey(keyName)
    }
}

function pressKey(keyName)
{
    if(document.getElementById(keyName))
    {
        document.getElementById(keyName).classList.add("active")
        document.getElementById(keyName).classList.toggle("press")
    }
    else console.log("%cError:%c There is no key with such id (" + keyName + ")", "color: red", "color: white")
}
