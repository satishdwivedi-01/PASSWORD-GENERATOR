let input_slider = document.querySelector('.slider')
let lenght_display = document.querySelector('.password-lenght')

let copy = document.querySelector('.copy-button')
let copy_message = document.querySelector('.copy-message')

let include_uppercase = document.querySelector('#uppercase')
let include_lowercase = document.querySelector('#lowercase')
let include_numbers = document.querySelector('#numbers')
let include_symbols = document.querySelector('#symbols')
let checkBoxes = document.querySelectorAll('input[type=checkbox]')

let streanght_indicator = document.querySelector('.indicator')

let passwordDisplay = document.querySelector('.password-display')
let generate_password = document.querySelector('.generate-button')

var noOfCheckCounts = 0
include_uppercase.checked =true
var symbolsString = '@#$%^&*!~()+-/*?><.,/;'

var password_lenght = 10

var password = ''


// slider handel
console.log(input_slider.min)
function handleSlider() {
    input_slider.value = password_lenght
    
    lenght_display.textContent=password_lenght

    const minimum= input_slider.min ;
    const maximum= input_slider.max ;

    input_slider.style.backgroundSize= ( (password_lenght-minimum)*100/(maximum-minimum)) + "% 100%"
}
handleSlider()

// indicator
function indicator() {
    streanght_indicator.style.backgroundcolor=color;
}

// random integer
function randomInteger(min,max) {
    return Math.floor(Math.random() * (max-min) ) + min 
}

// random no.
function randomNumberr() {
    return randomInteger(0,9)  // to get no. between 0-9 
}

// random uppercase
function randomUppercase() {
    let r = randomInteger(65,91)  // to get no. between 65-90(ASCII value of uppercase )
    return String.fromCharCode(r)
}

// random lowercase
function randomLowercase() {
    let r = randomInteger(97,123)  // to get no. between 97-122(ASCII value of lowercase )
    return String.fromCharCode(r)
}

// random Symbol
function randomSymbol() {
    let r = randomInteger(0,symbolsString.length)  // to get no. between 97-122(ASCII value of lowercase )
    return symbolsString.charAt(r)
}

// streangth check
function checkStreanth(){
    if (noOfCheckCounts>3 && password_lenght>8 || noOfCheckCounts>2 && password_lenght>10 || noOfCheckCounts>1 && password_lenght>15 ) {
        streanght_indicator.style.backgroundColor='Lightgreen'
        streanght_indicator.style.boxShadow = "0 0 1rem 3px Lightgreen"
    }
    else if (noOfCheckCounts>3 && password_lenght>6 || noOfCheckCounts>2 && password_lenght>7 || noOfCheckCounts>1 && password_lenght>11) {
        streanght_indicator.style.backgroundColor='yellow'
        streanght_indicator.style.boxShadow = "0 0 1rem 2px yellow"
    }
    else  {
        streanght_indicator.style.backgroundColor='red'
        streanght_indicator.style.boxShadow = "0 0 1rem 2px red"
    }
}


// copy password to clipboard
async function copyPassword(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copy_message.innerText='copied'
    }
    catch(e) {
        copy_message.innerText='failed'
    }

    copy_message.classList.add('active')

    setTimeout( ()=> {
        copy_message.classList.remove('active')
    } , 2000)

}

// password shuffle
function shufflePassword(pass_array){
    for (let i=0; i<pass_array.length;i++){
        let rndmindx = randomInteger(0,pass_array.length)
        let tempt= [pass_array[i]]
        pass_array[i] = pass_array[rndmindx]
        pass_array[rndmindx]= tempt
    }
    str =''
    pass_array.forEach((el)=> {
        str += el
    })
    return str
}

// checkbox chnage handler
function checkBoxeChangeHAndle() {
    noOfCheckCounts= 0
    checkBoxes.forEach( (checkBoxe) => {
      if (checkBoxe.checked) {
        noOfCheckCounts ++ ;
      }  
    })

    // if passlength < checkCounts 
    if (password_lenght < noOfCheckCounts) {
        password_lenght = noOfCheckCounts
        handleSlider()
    }
}

// event listners

input_slider.addEventListener('input',(e)=>{
    password_lenght= e.target.value
    handleSlider()
})

copy.addEventListener('click',()=> {
    if (passwordDisplay.value) {
        copyPassword()
    }
})

checkBoxes.forEach( checkBoxe => {
    checkBoxe.addEventListener('change' , checkBoxeChangeHAndle)
})

// generate button
generate_password.addEventListener('click', () => {

    if (noOfCheckCounts == 0) return ;
    
    if (password_lenght < noOfCheckCounts) {
        password_lenght = noOfCheckCounts
        handleSlider()
    }
    console.log(password_lenght)

    //  remove old pass 
    password = ''

    // generating
    let funcArray = []

    if (include_uppercase.checked) {
        funcArray.push(randomUppercase) 
    }
    if (include_lowercase.checked) {
        funcArray.push(randomLowercase)  ;
    }
    if (include_numbers.checked) {
        funcArray.push(randomNumberr)  ;
    }
    if (include_symbols.checked) {
        funcArray.push( randomSymbol) ;
    }
    
    for ( let i=0; i<funcArray.length ; i++){
        password += funcArray[i]() ;
    }
    
    for ( let i=0; i<password_lenght-funcArray.length ; i++){
        let randIndex = randomInteger(0,funcArray.length)
        password += funcArray[randIndex]() ;
    }
    
    
    password = shufflePassword(Array.from(password))

    passwordDisplay.value= password ;

    // streanth
    checkStreanth()

})
