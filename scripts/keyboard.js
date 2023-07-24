document.addEventListener("keydown", logKey)
document.addEventListener("keyup", logKey)
document.addEventListener("contextmenu", key => key.preventDefault())
keyboard.addEventListener("click", fixClick)

let history = document.getElementById("history")
let historyLimit = 50
let pressedKeys = 0

function logKey(key)
{
    key.preventDefault()

    if(!key.repeat)
    {
        pressKey("key-" + (key.code == "MetaLeft" ? "OSLeft" : key.code))
        
        if(key.type == "keydown" || key.code == "PrintScreen")
        {
            history.innerHTML += "<p class='history-key'>&lt;" + (key.key == " " ? "SPACE" : key.key.toUpperCase()) + "&gt;</p>"
            if(history.children.length > historyLimit) history.removeChild(history.children[0])
        }
    }
}

function pressKey(keyName)
{
    if(key = document.getElementById(keyName))
    {
        key.classList.add("active")
        key.classList.toggle("press")

        pressedKeys += (key.classList.contains("press") ? 1 : -1)
        stats.innerText = (pressedKeys == 0 ? "" : pressedKeys)
    }
    else console.log(`%cError:%c There is no key with such id (${keyName})`, "color: red", "color: white")
}

function fixClick(click)
{
    let element = click.target

    if(element.classList.contains("press")) pressKey(element.id)
    else if(element.parentElement.classList.contains("press")) pressKey(element.parentElement.id)
}