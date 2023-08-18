const yesBtn = document.querySelector("#yes");
const noBtn = document.querySelector("#no");
const readyWindow = document.querySelector(".areUready");
const cardsSec = document.querySelector(".cards");
const timer = document.querySelector("#timer");
const flag = document.querySelector("#flag");
const guessInput = document.querySelector("#guessInput");
const okBtn = document.querySelector("#ok");
const scoreSec = document.querySelector("#score");
const hintCapital = document.querySelector("#hintCapital");
const container = document.querySelector(".container");
const next = document.querySelector("#next")
let sec = timer.innerHTML;
let gameOver;
let guess ="";
let flagCorrect="";
let capitalCorrect="";
let score=0;
let timeDown;

yesBtn.addEventListener("click", function(){
    readyWindow.setAttribute("style","display:none");
    cardsSec.setAttribute("style","display:flex");
    timeDown = setInterval(timeFly, 1000);
    getFlag();
    timer.setAttribute("style","display:flex")
    scoreSec.setAttribute("style","display:flex")
})

function timeFly(){
    sec--;
    if(sec===0){
        timer.innerHTML ="00"
        clearInterval(timeDown);
        cardsSec.setAttribute("style","display:none");
        gameOver = document.createElement("div")
        gameOver.innerHTML = `Game over!<br> Your score is <b>${score}</b>
        <div class="gameOverBtns"> <button id="play" onclick="playAgain()">Play Again</button> 
        <button><a href="index.html">Go to Main Page</a></button> </div>`
        gameOver.classList.add("gameOver")
        container.append(gameOver)
        
    }
    else if(sec <10 && sec>=0){
        timer.innerHTML = `0${sec}`
    }else if(sec>=10) {
        timer.innerHTML = sec;
    }
}

function getFlag(){
    xhr = new XMLHttpRequest();
    xhr.open("GET","https://restcountries.com/v3.1/all",true)
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status===200){
            let data = JSON.parse(this.responseText);
            let i= Math.floor(Math.random()*250)
            flag.innerHTML = `<img src="${data[i].flags.png}" id="flag-box">`
            flagCorrect = data[i].name.common;
            capitalCorrect = data[i].capital[0];
            
        }
    }
    xhr.send()
}
function getInput(){
    guess = guessInput.value;
    if(guess.toLowerCase() === flagCorrect.toLowerCase()){
        score += 10;
        scoreSec.innerHTML = score;
        getFlag();
        guessInput.value = "";
        hintCapital.innerHTML = "Show the Capital";
        
    } else{
        
        guessInput.value = "";
    }
}

next.addEventListener("click",function(){
    getFlag();
    hintCapital.innerHTML = "Show the Capital";
})

okBtn.addEventListener("click", function(){
    getInput()
})

guessInput.addEventListener("keydown", function(e){
    if(e.key=="Enter"){
        getInput()
    }
})

hintCapital.addEventListener("click", function(){
    hintCapital.innerHTML = capitalCorrect;
    score -=5;
    scoreSec.innerHTML = score;
})

function playAgain(){
    clearInterval(timeDown);
    cardsSec.setAttribute("style","display:flex");
    gameOver.setAttribute("style","display:none");
    sec = 60;
    score=0;
    scoreSec.innerHTML=0;
    timeDown = setInterval(timeFly, 1000);
    getFlag();
    
}