const loanSlider = document.querySelector(".loanSlider");
const loanBox = document.querySelector(".loanBox");
const loan = document.querySelector(".loan");

const yearSlider = document.querySelector(".yearSlider");
const yearBox = document.querySelector(".yearBox");
const year = document.querySelector(".year");

const monthCost = document.querySelector(".monthCost");
const maxLoan = document.querySelector(".maxLoan");
const maxYear = document.querySelector(".maxYear");
const btn = document.querySelector(".btn");

const loanContainer = document.querySelector(".loanContainer");
const compStyle = window.getComputedStyle(loanContainer);

const loanContainerWidth = compStyle.width.slice(0, 3);

const yearlyInterestRate = 9.9;

let currentMonthLoan = loanSlider.value;
let currentYear = parseInt(yearSlider.value);

const setMonthlyCost = (amount, year) => {
  const monthlyInterestRate = yearlyInterestRate / 100 / 12;
  let months = year * 12;
  let monthlyAmount =
    (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);

  return Math.round(monthlyAmount);
};

const getInitialPayment = () => {
  monthCost.innerHTML =
    setMonthlyCost(loanSlider.value, yearSlider.value) + " SEK / månad";
};

getInitialPayment();

loanSlider.addEventListener("input", () => {
  let percentage =
    ((loanSlider.value - loanSlider.min) / (loanSlider.max - loanSlider.min)) *
    100;
  loanSlider.style.background =
    "linear-gradient(to right, #512D6D, #512D6D " +
    percentage +
    "%, #ffffff " +
    percentage +
    "%, #ffffff 100%)";

  amountDurationDisplay(percentage);

  if (loanSlider.value === loanSlider.max) {
    maxLoan.style.display = "none";
    loanSlider.style.borderRight = "none";
  } else {
    loanSlider.style.borderRight = "1px solid rgb(94, 94, 94)";
    maxLoan.style.display = "block";
  }
});

yearSlider.addEventListener("input", () => {
  let percentage =
    ((yearSlider.value - yearSlider.min) / (yearSlider.max - yearSlider.min)) *
    100;
  yearSlider.style.background =
    "linear-gradient(to right, #512D6D, #512D6D " +
    percentage +
    "%, #ffffff " +
    percentage +
    "%, #ffffff 100%)";

  yearDurationDisplay(percentage);

  if (yearSlider.value === yearSlider.max) {
    maxYear.style.display = "none";
    yearSlider.style.borderRight = "none";
  } else {
    maxYear.style.display = "block";
    yearSlider.style.borderRight = "1px solid rgb(94, 94, 94)";
  }
});

const yearDurationDisplay = (percentage) => {
  currentYear = yearSlider.value;
  let size = (percentage / 100) * (parseFloat(loanContainerWidth) - 30);
  yearBox.style.display = "block";

  if (currentYear < 3) {
    year.style.top = "35px";
    year.style.backgroundColor = "#512d6d";
    year.style.padding = "10px";
    year.style.borderRadius = "6px";
    yearBox.style.minWidth = "48px";
  } else {
    year.style.top = "0px";
    year.style.right = `${size * 0.07}px`;
    year.style.color = "#ffff";
    year.style.padding = "0px";
    yearBox.style.width = `${size}px`;
  }
  monthCost.innerHTML =
    setMonthlyCost(currentMonthLoan, currentYear) + " SEK / månad";
  year.innerHTML = currentYear + " år ";
};

const amountDurationDisplay = (percentage) => {
  currentMonthLoan = loanSlider.value;
  let size = (percentage / 100) * (parseFloat(loanContainerWidth) - 30);
  loanBox.style.display = "block";
  if (currentMonthLoan < 60000) {
    loan.style.top = "35px";
    loan.style.backgroundColor = "#512d6d";
    loan.style.padding = "10px";
    loan.style.borderRadius = "6px";
  } else {
    loan.style.top = "0px";
    loan.style.padding = "0px";
    loan.style.color = "#ffff";
    loan.style.right = `${size * 0.07}px`;
    loan.style.minWidth = "60px";
    loanBox.style.width = `${size}px`;
  }

  monthCost.innerHTML =
    setMonthlyCost(currentMonthLoan, currentYear) + " SEK / månad";
  loan.innerHTML =
    currentMonthLoan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
    " " +
    "kr";
};

btn.addEventListener("click", () => {
  var url = new URL("http://test/loan-application/");

  url.searchParams.append("amount", currentMonthLoan);
  url.searchParams.append("months", currentYear * 12);

  console.log(url.pathname + url.search);
});
