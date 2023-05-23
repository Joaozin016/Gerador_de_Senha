let passwordLength = 16
const inputE1 = document.querySelector("#password")
const upperCaseCheckE1 = document.querySelector("#uppercase-check")
const numberCheckE1 = document.querySelector("#number-check")
const symbolCheckE1 = document.querySelector("#symbol-check")
const securityIndicatorBarE1 = document.querySelector("#security-indicator-bar")
function generatePassword(){
    
    //Elementos da senha
    let chars = "abcdefghjkmnpqrstuvwxyz"
    
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXY"
    const numberChars = "123456789"
    const symbolChars = "?!@#%&*(){}[]"
    if(upperCaseCheckE1.checked){
        chars += upperCaseChars
    }
    if(numberCheckE1.checked){
        chars += numberChars
    }
    if(symbolCheckE1.checked){
        chars += symbolChars
    }
    

    let password = ""

    for(let i = 0; i < passwordLength; i++){
        //Aqui tem um numero randomico que vai do 1 até a quantidade de elementos que foi colocado no chars
        const randomNumber = Math.floor(Math.random() * chars.length)
        
        //substring é um recorte de uma string
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    //toda vez que é gerada a senha ele vai aparecer no input
    inputE1.value = password

    calculateQuality()
    calculateFontSize()
}

function calculateQuality(){
    // 20% -> critico => 100% algo safe 
    //A multiplicação por 0.25 para que todas as funções calcule para dar o valor exato na barra
    //T*0.25 + M*0.15 + N*0.25 + S*0.35 = 100
    const percent = Math.round((passwordLength/64) * 25 + (upperCaseCheckE1.checked ? 15 : 0) + (numberCheckE1.checked ? 25 : 0) + (symbolCheckE1.checked ? 35 : 0))
    
    securityIndicatorBarE1.style.width = `${percent}%`

    if(percent > 69) {
        //safe
        securityIndicatorBarE1.classList.remove('critical')
        securityIndicatorBarE1.classList.remove('warning')
        securityIndicatorBarE1.classList.add('safe')
    } else if(percent > 50){
        //warning
        securityIndicatorBarE1.classList.remove('critical')
        securityIndicatorBarE1.classList.add('warning')
        securityIndicatorBarE1.classList.remove('safe')
    } else {
        //critical
        securityIndicatorBarE1.classList.add('critical')
        securityIndicatorBarE1.classList.remove('warning')
        securityIndicatorBarE1.classList.remove('safe')
    }

    if(percent >= 100){
        securityIndicatorBarE1.classList.add('completed')
    } else {
        securityIndicatorBarE1.classList.remove('completed')
    }
}

function calculateFontSize(){
    if(passwordLength > 45){
        inputE1.classList.remove("font-sm")
        inputE1.classList.remove("font-xs")
        inputE1.classList.add("font-xxs")
    } else if(passwordLength > 32){
        inputE1.classList.remove("font-sm")
        inputE1.classList.add("font-xs")
        inputE1.classList.remove("font-xxs")
    } else if (passwordLength > 22){
        inputE1.classList.add("font-sm")
        inputE1.classList.remove("font-xs")
        inputE1.classList.remove("font-xxs")
    } else {
        inputE1.classList.remove("font-sm")
        inputE1.classList.remove("font-xs")
        inputE1.classList.remove("font-xxs")
    }
}


//Essa função vai copiar e colar a senha
function copy(){
    navigator.clipboard.writeText(inputE1.value)
}

const passwordLengthE1 = document.querySelector("#password-lenght")
//Essa função vai pegar o valor e vai executar a função genratePassord
passwordLengthE1.addEventListener("input", function(){
    passwordLength = passwordLengthE1.value
    document.querySelector('#password-lenght-text').innerText = passwordLength
    
    generatePassword() 
})

upperCaseCheckE1.addEventListener('click', generatePassword)
numberCheckE1.addEventListener('click', generatePassword)
symbolCheckE1.addEventListener('click', generatePassword)

document.querySelector("#copy-1").addEventListener("click",copy)
document.querySelector("#copy-2").addEventListener("click",copy)
document.querySelector("#renew").addEventListener("click",generatePassword)


generatePassword()