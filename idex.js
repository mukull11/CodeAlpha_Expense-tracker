let balance = 0;
let income = 0;
let expense = 0;
let transactionHistory = [];

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("balance").innerText = `Rs. ${balance}.00`;
  document.getElementById("money-plus").innerText = `+Rs. ${income}.00`;
  document.getElementById("money-minus").innerText = `-Rs. ${expense}.00`;

  document.getElementById("input-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let transactionName = document.getElementById("text").value;
    let transactionAmount = parseInt(document.getElementById("amount").value);

    let transactionType = document.querySelector(".buttons_container button.active");
    if (transactionType) {
      if (transactionType.id === "earnBtn") {
        income += transactionAmount;
        balance += transactionAmount;
        transactionHistory.push({ name: transactionName, amount: transactionAmount, type: "income" });
      } else if (transactionType.id === "expBtn") {
        expense += transactionAmount;
        balance -= transactionAmount;
        transactionHistory.push({ name: transactionName, amount: transactionAmount, type: "expense" });
      }

      document.getElementById("balance").innerText = `Rs. ${balance}.00`;
      document.getElementById("money-plus").innerText = `+Rs. ${income}.00`;
      document.getElementById("money-minus").innerText = `-Rs. ${expense}.00`;

      updateTransactionHistory();

      document.getElementById("text").value = "";
      document.getElementById("amount").value = "";
      document.querySelectorAll(".buttons_container button").forEach((button) => button.classList.remove("active"));
    }
  });

  document.querySelectorAll(".buttons_container button").forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".buttons_container button").forEach((button) => button.classList.remove("active"));
      this.classList.add("active");
    });
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      let transactionIndex = transactionHistory.findIndex(
        (transaction) => transaction.name === e.target.parentNode.textContent.trim().split(" ")[0]
      );

      if (transactionHistory[transactionIndex].type === "income") {
        income -= transactionHistory[transactionIndex].amount;
        balance -= transactionHistory[transactionIndex].amount;
      } else if (transactionHistory[transactionIndex].type === "expense") {
        expense -= transactionHistory[transactionIndex].amount;
        balance += transactionHistory[transactionIndex].amount;
      }

      transactionHistory.splice(transactionIndex, 1);

      document.getElementById("balance").innerText = `Rs. ${balance}.00`;
      document.getElementById("money-plus").innerText = `+Rs. ${income}.00`;
      document.getElementById("money-minus").innerText = `-Rs. ${expense}.00`;

      updateTransactionHistory();
    }
  });
});

function updateTransactionHistory() {
  let transactionList = document.querySelector(".list");
  transactionList.innerHTML = "";

  transactionHistory.forEach((transaction) => {
    let transactionHTML = `
      <li class="${transaction.type === "income"? "plus" : "minus"}">
        ${transaction.name} <span>${transaction.type === "income"? "+Rs." : "-Rs."} ${transaction.amount}</span><button class="delete-btn">X</button>
      </li>
    `;

    transactionList.insertAdjacentHTML("beforeend", transactionHTML);
  });
}
