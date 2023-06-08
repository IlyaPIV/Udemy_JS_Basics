"use strict";

class Card{
    constructor(src, alt, price, oldPrice, type, description, parent) {
        this.src = src;
        this.alt = alt;
        this.price = price;
        this.oldPrice = oldPrice;
        this.type = type;
        this.descr = description;
        this.random = Math.random();
        this.sale = Math.floor(price * 100 / oldPrice - 100);
        this.parent = parent;
    }

    render(){
        document.querySelector(this.parent).insertAdjacentHTML("beforeend",
            `
                <div class="cards">
                    <div class="card">
                      <img class="card__img" src="${this.src}" alt="${this.alt}" />
                      <div class="card__sale">${this.sale}%</div>
                      <div class="card__price">
                        ${this.price}р<span class="card__old-Price"> <s>${this.oldPrice}р</s> </span>
                      </div>
                      <div class="card__type">${this.type}</div>
                      <div class="card__descr">${this.descr}</div>
                    </div>
                </div>
                `
        );
    }
}

document.querySelector(".btn").addEventListener("click", function (){
    for (let i = 0; i < 5; i++) {
        new Card(`img/tv-${i + 1}.png`, "tv", 19990, 25480, "Old collection", "Best tv 2023", ".cards").render();
    }
});

