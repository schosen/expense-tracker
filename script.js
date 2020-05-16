const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amaount = document.getElementById('amount');

/*
const dummyTransactions = [
    {id: 1, text: 'Flower', amount: -20},
    {id: 2, text: 'Salary', amount: 300},
    {id: 3, text: 'Book', amount: -10},
    {id: 4, text: 'Camera', amount: 150}
    
];
*/

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
  );
  
  // see if anything is in local storage using ternary operator
  let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


//Add new transaction to list
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() ==='') {
        alert('Please add a text amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);
        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Generate random ID 
function generateID() {
    return Math.floor(Math.random() * 1000000000); 
}


// Add a new transactions to DOM list 
function addTransactionDOM(transaction) {
    // Get sign (using ternary statement)
    const sign = transaction.amount < 0 ? '-' : '+';


    // Add new list item
    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    //set inner html for the list item
    //Math.abs changes numbers with negative sign to absolute number
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

    list.appendChild(item);
}

//Update the balance income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);


    // use the reduce method to accumulate all costs. The toFixed() method converts a number into a string, rounding to a specified number of decimals
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    //calculate total income and total expense
    const income = amounts
                        .filter(item => item > 0)
                        .reduce((acc, item) => (acc += item), 0)
                        .toFixed(2)

    
    const expense = (amounts
                        .filter(item => item < 0)
                        .reduce((acc, item) => (acc += item), 0) * -1)
                        .toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}

//remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init()
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

//Init app 
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues()
}

init();

form.addEventListener('submit', addTransaction)

