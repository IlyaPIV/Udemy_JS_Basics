/* ЗАДАЧА:

1. - Вам нужно создать калькулятор индекса массы тела (BMI).

2. - Индекс массы тела рассчитывается по формуле: 
вес в Кг / Рост в квадрате.

Например, масса человека = 74 кг, рост = 172 см. Следовательно, индекс массы тела в этом случае равен:
ИМТ = 74кг / 1,722м² ≈ 25,01 кг/м²

3. Сравнить массы тел двух людей (данные ниже), и вывести в консоль сравнения двух результатов в булевом значении (true / false).

ДАННЫЕ:

    Петр: Вес: 72кг рост: 1.88м
    Денис: Вес: 82кг рост: 1.73м

4. У кого индекс BMI больше?

*/
const weigth1 = 72, height1 = 1.88,
    weigth2 = 82, height2 = 1.73;

function indexBody(w, h){
    return w / (h ** 2);
}

console.log("Petr: " + indexBody(weigth1, height1));
console.log("Denis: " + indexBody(weigth2, height2));

console.log("index Petr > index Denis? " 
            + (indexBody(weigth1, height1) > indexBody(weigth2, height2)));
