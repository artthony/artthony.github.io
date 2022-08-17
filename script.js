const changeDiv = div => {
    const matches = document.querySelectorAll("div.page")
    const check = document.querySelector(`div.${div}`)
    const title = document.querySelector("#heading")
    const icon = document.querySelector("#navicon")
    // if we're already on navigation, return
    if (div == 'navigation' && check.style.display != "none") {
        switch(title.innerHTML) {
            case "work.":
                div = "projects"
                break
            case "fun.":
                div = "misc"
                break
            case "say hi back.":
                div = "contact"
                break
            case "hello.":
                div = "about"
                break
        }
    }
    // update div
    const change = document.querySelector(`div.${div}`)
    matches.forEach(d => d.style.display = 'none')
    change.style.display = 'flex'
    // change icon
    if (div == 'navigation') {
        icon.className = "fa-solid fa-xmark"
    } else {
        icon.className = "fa-solid fa-bars"
    }
    // update title
    switch (div) {
        case "projects": 
            title.innerHTML = "work."
            break;
        case "misc": 
            title.innerHTML = "fun."
            break;
        case "contact": 
            title.innerHTML = "say hi back."
            break;
        case "about": 
            title.innerHTML = "hello."
            break;
    }
}

const swapMode = () => {
    const body = document.querySelector("body")
    if (body.style.backgroundColor != "rgb(200, 215, 212)") {
        // update body
        body.style.backgroundColor = "#C8D7D4"
        body.style.color = "#121A14"
        // update buttons
        const buttons = document.querySelectorAll("button")
        buttons.forEach(b => {
            b.style.borderColor = "#C8D7D4"
            if (b.classList.contains('icon')) b.setAttribute('class', 'icon button-light')
            else if (b.classList.contains('accordpanel')) b.parentElement.setAttribute('class', 'accord-light')
            else b.setAttribute('class', 'button-light')
        })
        // update svgs
        const svgs = document.querySelectorAll(".svg")
        svgs.forEach(s => {
            s.contentDocument.querySelectorAll(".line").forEach(e => e.style.stroke = "#192320")
        })
        document.querySelector("#modeicon").classList = "fa-solid fa-moon"
    } else { // mode == light
       // update body
       body.style.backgroundColor = "#192320"
       body.style.color = "#F6F7F5"
       // update buttons
       const buttons = document.querySelectorAll("button")
       buttons.forEach(b => {
           b.style.borderColor = "#192320"
           if (b.classList.contains('icon')) b.setAttribute('class', 'icon button-dark') 
           else if (b.classList.contains('accordpanel')) b.parentElement.setAttribute('class', 'accord-dark')
           else b.setAttribute('class', 'button-dark')
       })
        // update svgs
        const svgs = document.querySelectorAll(".svg")
        svgs.forEach(s => {
            s.contentDocument.querySelectorAll(".line").forEach(e => e.style.stroke = "#F6F7F5")
        })
        document.querySelector("#modeicon").classList = "fa-solid fa-sun"
    }
}

const swapInfo = id => {
    const accordion = document.getElementById(id)
    const panelicon = accordion.querySelector(".accordpanel").querySelector('i')
    const info = accordion.querySelector(".accordinfo")
    const body = accordion.querySelector(".accordbody")
    if (info.style.display === 'none') { // open -> closed
        body.style.display = 'none'
        info.style.display = ''
        panelicon.classList = 'fa-solid fa-chevron-right'
    } else { // closed -> open
        body.style.display = ''
        info.style.display = 'none'
        panelicon.classList = 'fa-solid fa-chevron-down'
    }
}