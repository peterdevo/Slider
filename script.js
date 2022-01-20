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

const yearlyInterestRate = 9.9;

let currentMonthLoan = loanSlider.value;
let currentYear = yearSlider.value;

const setMonthlyCost = (amount, year) => {
  const monthlyInterestRate = yearlyInterestRate / 100 / 12;
  let months = year * 12;
  let monthlyAmount =
    (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);

  return Math.round(monthlyAmount);
};

const initialPayment = () => {
  monthCost.innerHTML =
    setMonthlyCost(loanSlider.value, yearSlider.value) + " SEK / månad";
};

initialPayment();

const timeRange = [2, 3, 4, 5, 6, 7, 8, 9, 10];

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

  monthlyCostDisplayer(percentage);

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

  timeDisplayer(percentage);

  if (yearSlider.value === yearSlider.max) {
    maxYear.style.display = "none";
    yearSlider.style.borderRight = "none";
  } else {
    maxYear.style.display = "block";
    yearSlider.style.borderRight = "1px solid rgb(94, 94, 94)";
  }
});

const timeDisplayer = (percentage) => {
  let timeConverter = parseInt(yearSlider.value / 10);
  if (timeRange.includes(parseFloat(timeConverter))) {
    currentYear = timeConverter;
    monthCost.innerHTML =
      setMonthlyCost(currentMonthLoan, currentYear) + " SEK / månad";

    year.style.right = "-50px";
    year.style.width = "100px";
    yearBox.style.width = `${(percentage / 100) * 360}px`;
    year.innerHTML = currentYear + " år ";
    
  }
};

const monthlyCostDisplayer = (percentage) => {
  loan.style.right = "-18px";
  loan.style.width = "100px";
  loanBox.style.width = `${(percentage / 100) * 360}px`;

  currentMonthLoan = loanSlider.value;
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
