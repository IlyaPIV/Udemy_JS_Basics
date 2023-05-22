"use strict";
/*
ЗАДАЧА:
Создайте игру "Собери алфавит"

ПОДСКАЗКИ:

1-Не думайте о сокращении кода. Если будет очень много повторений однотипного кода - это нормально. Первая задача понимать логику языка, а только после оптимизировать его.
2-Помните про методы переноса элемента из одного места в другое(before, after и т.д.)
3-Помните про свойства, получения соседних элементов (previousElementSibling, previousElementSibling и т.д)

*/
const letters = document.querySelectorAll(".boxes__box");
const clickSound = new Audio("audio/Mountain Audio - Menu Click.mp3");
const winSound = new Audio("audio/huge win.wav");
let currLetters;

for (let btn of letters){
    btn.addEventListener("click", function (){
        if (btn.previousElementSibling != null){
            btn.previousElementSibling.before(btn);
        } else if (btn.nextElementSibling != null) {
            btn.nextElementSibling.after(btn);
        }
        currLetters = document.querySelectorAll(".boxes__box");
        clickSound.play();
        console.log(currLetters);
        if (currLetters[0].classList.contains("box_a") &&
            currLetters[1].classList.contains("box_b") &&
            currLetters[2].classList.contains("box_c") &&
            currLetters[3].classList.contains("box_d") &&
            currLetters[4].classList.contains("box_e") &&
            currLetters[5].classList.contains("box_f")){
            winSound.play();
        }
    });
}