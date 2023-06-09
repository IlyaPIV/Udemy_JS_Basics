"use strict";

/*
ЗАДАЧИ:

Создайте программу которая будет преобразовывать переменные слова в которых разделены нижним тире, в переменные которые будут записанны в camelCase нотации.
/////////

Подсказки:
1) Решение должно работать с переменными из 2-х слов. Не больше
2)Чтобы получить строку введенных данных из textarea, можно получить значение свойства value, DOM элемента textarea
3) Практика сложная, поэтому если на чем то застряли, посмотрите решение проблемы и пробуйте дальше самостоятельно.
4)Записать результат вы можете в div с классом output, через innerText
5)  По итогу переменные должны выглядеть так: 
underscoreCase
firstName
someVariable
calculateAge
delayedDeparture

*/
document.querySelector(".btn").addEventListener('click', function (){
    const inputText = document.querySelector(".text").value;
    const inputWords = inputText.split("\n");
    console.log(inputWords);
    const outputText = document.querySelector(".output");
    let output = "";
    let isFirst = true;
    inputWords.forEach(word => {
        if (!isFirst) output += "\n";
        const [left, right] = word.trim().toLocaleLowerCase().split("_");
        output += left;
        output += right[0].toLocaleUpperCase() + right.slice(1);
        isFirst = false;
    })
    outputText.innerText = output;
});
