"use strict";



console.log(document.querySelector(".header"));

let elem = document.querySelector("h1");
console.log(elem.innerHTML);

elem.innerHTML = "<p>Новый текст!</p>";