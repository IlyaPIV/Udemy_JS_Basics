"use strict";

///////////////////////////////////////

/* 
ЗАДАЧА: 
Создайте игру в угадай число.


Удачи)
*/
let rndNumber = 0;

const recordField = document.querySelector(".highscore");
const scoreField = document.querySelector(".score");
const inputVal = document.querySelector(".guess");

let record = Number(recordField.innerHTML);
let score = Number(scoreField.innerHTML);
console.log(score);
console.log(record);



function checkRecord(){
    if (record < score) {
        record = score;
        recordField.innerHTML = record.toString();
    }
}

function refresh(){
    console.log("Lets try again!");
    console.log(`Загаданое ранее число = ${rndNumber}`);

    score = 20;
    scoreField.innerHTML = score.toString();
    updateText("Начните угадывать...");
    inputVal.value = 0;
    document.querySelector("body").style.background = "black";

}

function updateText(str){
    document.querySelector(".message").innerHTML = str;
}

function getRndNumber(){
    let newVal = Math.trunc(Math.random() * 20) + 1;
    console.log(`Новое загаданое число = ${newVal}`);
    rndNumber = newVal;
}

function checkValue(){
    let inp = inputVal.value;
    console.log(inp);

    if (inp < 1 || inp > 20){
        updateText("Некорректный ввод");
    } else {
        score--;
        scoreField.innerHTML = score.toString();

        if (inp == rndNumber) {
            updateText("Победа!!!");
            document.querySelector("body").style.background = "green";
            checkRecord();
        } else if (inp > rndNumber) {
            updateText("Загаданное число меньше");
        } else {
            updateText("Загаданное число больше");
        }

        if (score == 0) {
            updateText("Вы проиграли!");
            document.querySelector("body").style.background = "red";
        }
    }
}

getRndNumber();

const refreshBtn = document.querySelector(".again");
const checkBtn = document.querySelector(".check");

checkBtn.addEventListener("click", checkValue);
refreshBtn.addEventListener("click", refresh);
refreshBtn.addEventListener("click", getRndNumber);

