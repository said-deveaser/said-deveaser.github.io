
const users = [
    "Саид", "Алина", "Вероника", "Лиза", "Маша", "Аким"
]
const passwords = {
    "Саид": "привет",
    "Алина": "астарион",
    "Вероника": "люблю работать",
    "Лиза": "ура новый год",
    "Маша": "чехол лапша",
    "Аким": "helloworld"
}

const createPairs = () => {
    const pass = "]2v\"2uм2tи2sк2rА2q\"2p,2o\"2nд2mи2lа2kС2j\"2i,2h\"2gа2fз2eи2dЛ2c\"2b,2a\"2zа2yш2xа2wМ2v\"2u,2t\"2sа2rн2qи2pл2oА2n\"2m,2l\"2kа2jк2iи2hн2gо2fр2eе2dВ2c\"2b[2a"
    const basket = JSON.parse(decryptPassword(pass))
    const pairs = {}
    for (let i = 0; i < basket.length; i++) {
        const fI = i
        let fL = i+1
        if (fL >= basket.length) fL = 0

        pairs[basket[fI]] = basket[fL]
    }
    return pairs
}

const getShufleNames = () => {
    return encryptPassword(JSON.stringify(shuffle(users)))
}
console.log(getShufleNames())

function shuffle(array) {
    const ar = [...array]
    ar.sort(() => Math.random() - 0.5);
    return ar
}
function encryptPassword(password) {
    let encryptedPassword = "";
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < password.length; i++) {
        encryptedPassword += alphabet[i % alphabet.length] + "2" + password[i];
    }
    return encryptedPassword.split("").reverse().join("");
}

function decryptPassword(encryptedPassword) {
    let decryptedPassword = "";
    let reversedEncryptedPassword = encryptedPassword.split("").reverse().join("");
    for (let i = 0; i < reversedEncryptedPassword.length; i += 3) {
        decryptedPassword += reversedEncryptedPassword[i + 2];
    }
    return decryptedPassword;
}

const openModal = () => {
    const modal = document.getElementById("modal")
    modal.classList.remove("modal-close")
}
const closeModal = () => {
    const modal = document.getElementById("modal")
    modal.classList.add("modal-close")
    document.getElementById("your-name").innerHTML = ``

}

const confirmPass = () => {

    if (passwords[nameToCheck] === document.getElementById("pass-input").value) {
        const name = createPairs()[nameToCheck]
        document.getElementById("your-name").innerHTML = `Вы дарите: ${name}`
    } else {
        alert("Неверный пароль")
    }

}

document.getElementById("close-modal-button").onclick = closeModal
document.getElementById("confirm-modal-button").onclick = confirmPass

let nameToCheck
const onNameClick = (name) => {
    openModal()
    document.getElementById("modal-card-name").innerHTML = name
    nameToCheck =  name
}

// render app
const renderApp = () => {
    const namesDiv = document.getElementById("names")
    namesDiv.innerHTML = ""
    users.forEach(user => {
        const el = document.createElement("div")
        el.onclick = () => onNameClick(user)
        el.innerHTML = user
        namesDiv.append(el)
    })

}
renderApp()
