"use strict";

const account1 = {
    owner: "Dmitrii Fokeev",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    pin: 1111,
};

const account2 = {
    owner: "Anna Filimonova",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    pin: 2222,
};

const account3 = {
    owner: "Polina Filimonova",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    pin: 3333,
};

const account4 = {
    owner: "Stanislav Ivanchenko",
    movements: [430, 1000, 700, 50, 90],
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");


// вывод блока с данными транзакции
function displayTransactions(movements, sort = false){
    containerMovements.innerHTML = "";

    const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;

    movs.forEach(function (value, index) {
        const type = value > 0 ? "deposit" : "withdrawal";
        const operation = value < 0 ? "СНЯТИЕ" : "ЗАЧИСЛЕНИЕ";
        const htmlElem = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${index + 1} ${operation}
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">${value}₽</div>
      </div>
    `;
        containerMovements.insertAdjacentHTML("afterbegin", htmlElem);
    });
}

function createLogIn(accs){
    accs.forEach(acc => {
        acc.logIn = acc.owner.toLowerCase()
                                .split(" ")
                                .map(function (value) {
                                    return value[0];
                                })
                                .join("");
    });
}

createLogIn(accounts);


// подсчёт итого баланса счёта после всех операций
function calculateBalance(acc){
    const balance = acc.movements.reduce(function (accumulation, val){
       return accumulation + val;
    });
    acc.balance = balance;
    labelBalance.textContent = `${balance} ₽`;
}

// подсчитывает сумму всех операций прихода или расхода
function calcTransactionsSum(movements, incoming){
    return movements.filter((mov) => incoming ? mov > 0 : mov < 0)
                    .reduce((acc, mov) => acc + mov, 0);
}

// подсчет и вывод на страницу суммы оборотов денег
function calcTransactions(movements){
    const incSum = calcTransactionsSum(movements, true);
    const outSum = calcTransactionsSum(movements, false);
    const balanceSum = incSum + outSum;
    labelSumIn.textContent = `${incSum}₽`;
    labelSumOut.textContent = `${Math.abs(outSum)}₽`;
    labelSumInterest.textContent = `${balanceSum}₽`;
}

// const acc = accounts.find(function (acc){
//     return acc.owner === "Anna Filimonova";
// });
// console.log(acc);

let currAccount;

function updateUI(account){
    displayTransactions(account.movements);
    calculateBalance(account);
    calcTransactions(account.movements);
}

btnLogin.addEventListener(`click`, function (event){
    event.preventDefault();
    currAccount = accounts.find(function (acc){
       return acc.logIn === inputLoginUsername.value && acc.pin === Number(inputLoginPin.value);
    });

    console.log(currAccount);
    if (currAccount){
        containerApp.style.opacity = 100;
        inputLoginPin.value = inputLoginUsername.value = "";

        console.log("Pin OK");
        updateUI(currAccount);
    }
});

// перевод денег на другой счёт
btnTransfer.addEventListener('click', function (event){
    event.preventDefault();

    const recieverAcc = accounts.find(function (acc){
        return acc.logIn === inputTransferTo.value;
    });
    const amount = Number(inputTransferAmount.value);
    console.log(amount, recieverAcc);

    if (recieverAcc && amount > 0
        && currAccount.balance >= amount
        && recieverAcc.logIn !== currAccount.logIn) {

        console.log("Платёж прошёл");
        currAccount.movements.push(-amount);
        recieverAcc.movements.push(amount);

        updateUI(currAccount);
        inputTransferTo.value = inputTransferAmount.value = "";
    }
});

// обработчик закрытия аккаунта
btnClose.addEventListener('click', function (event){
    event.preventDefault();

    if (inputCloseUsername.value === currAccount.logIn
            && Number(inputClosePin.value) === currAccount.pin){
        const index = accounts.findIndex(function (acc){
            return acc.logIn === currAccount.logIn;
        });
        accounts.splice(index, 1);

        containerApp.style.opacity = 0;
        inputClosePin.value = inputCloseUsername.value = "";
    } else {
        console.log("Wrong credentials");
    }
});

// пополнение денег на счету
btnLoan.addEventListener('click', function (event){
   event.preventDefault();

   const amount = Number(inputLoanAmount.value);
   if (amount > 0){
       currAccount.movements.push(amount);
       updateUI(currAccount);
       inputLoanAmount.value = "";
   }
});


const totalBalance = accounts.map((acc) => acc.movements)
                                            .flat()
                                            .reduce((acc, mov) => acc + mov, 0);
console.log(totalBalance);


let sorted = false;
btnSort.addEventListener('click', function (event){
   event.preventDefault();

   displayMovements(currAccount.movements, !sorted);
   sorted = !sorted;
});


labelBalance.addEventListener('click', function (){
    Array.from(document.querySelectorAll(".movements__value"), function(val, i){
        return val.innerText = val.textContent.replace("₽","RUB")
    });
})