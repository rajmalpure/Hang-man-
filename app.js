const hangmanImage = document.querySelector(".hangman-image")
const wordDisplay = document.querySelector(".word-display")
const hintText = document.querySelector(".hint-text")
const guessno = document.querySelector("#guess-no")
const playAgainBtn = document.querySelector(".play-again")
const keyboardDiv = document.querySelector(".keyboard");
const resultContainer = document.querySelector('.result-container')
const bgblack = document.querySelector('.bg-black')

let currentWord , correctLetters = [] , wrongGuessCount = 0;
let maxGuesses = 6


function gameOver(gameovervalue){
    if (gameovervalue === false){
        resultContainer.querySelector('img').src = `./images/lost.gif`
        resultContainer.querySelector('h3').innerHTML = `Game Over..!!`
        resultContainer.querySelector('p').innerHTML = `Correct word is <b>${currentWord}</b>`
        bgblack.classList.add("show")
        resultContainer.classList.add('showwithanimation')
    }
    else if (gameovervalue === true){
        resultContainer.querySelector('img').src = `./images/victory.gif`
        resultContainer.querySelector('h3').innerHTML = "Congrats..!!"
        resultContainer.querySelector('p').innerHTML = `You Found the Word : <b>${currentWord}</b>`
        bgblack.classList.add("show")
        resultContainer.classList.add('showwithanimation')
    }  
}

function randomword(){
    const {word,hint} = wordList[Math.floor(Math.random() * wordList.length)]
    // console.log(wordList.length)
    console.log(word)
    currentWord = word;
    hintText.innerText = "Hint : " + hint
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("")
}

function initiateGame(button , clickedLetter){
    // Checking if clicked letter is in the word or not
    if (currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index) =>{
            if (letter === clickedLetter){
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    }else{
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `./images/hangman-${wrongGuessCount}.png`; 
    }
    button.disabled = true
    guessno.innerText = String(wrongGuessCount) + "/ 6"
    
    // Calling gameOver function if any of these condition meets
    if (wrongGuessCount === maxGuesses) return gameOver(false)
    if (correctLetters.length === currentWord.length) return gameOver(true)
}

for (let i = 97; i <= 122; i++){
    // creating keyboard buttons
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    // console.log(String.fromCharCode(i))
    keyboardDiv.appendChild(button);
    button.onclick = (e) =>{
        initiateGame(e.target , String.fromCharCode(i))
    }
} 

randomword()
playAgainBtn.onclick = () =>{
    randomword()
    correctLetters = []
    wrongGuessCount = 0
    hangmanImage.src = "./images/hangman-0.png"
    guessno.innerText = String(wrongGuessCount) + "/ 6"
    // wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("")
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    bgblack.classList.remove("show")
    resultContainer.classList.remove('showwithanimation')
}



