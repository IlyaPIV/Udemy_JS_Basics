"use strict";

/*
ЗАДАЧИ:

1) Создайте массив уникальных событий "events"(события), которые произошли в игре, за все время матча.
2) После окончания матча оказалось что выдача желтой карточки на 64-ой минуте матча была ошибочка. Удалите это свойство из Map.
3) Подсчитайте среднее время появления событий с учетом того что матч идет 90 минут. Напишите результат в консоль: (Пример: Событие в этом матче, появлялось в среднем, раз в 5 мин.)
4) Переберите Map, чтобы получить в консоль результат, какие события матча происходили в первой половине и какие во второй. Результат вывода в консоли должен быть таким:
[ПЕРВАЯ ПОЛОВИНА] 17: GOAL
[ПЕРВАЯ ПОЛОВИНА] 36: Substitution ... и так далее

*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

const uniqEvents = new Set(gameEvents.values());
console.log(uniqEvents);

gameEvents.delete(64);
console.log(gameEvents);

const numEvents = gameEvents.size;
console.log(`Всего событий: ${numEvents}`);
console.log(`Средняя частота: ${90 / numEvents} минут`);

let firstTime = [];
let secondTime = [];
gameEvents.forEach((value, key) => {
  if (key <= 45) {
    firstTime.push(key + ": " + value);
  } else {
    secondTime.push(key + ": " + value);
  }
});
console.log("Первый тайм: " + firstTime);
console.log("Второй тайм: " + secondTime);