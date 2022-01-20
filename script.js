const loanSlider = document.querySelector(".loanSlider");
const loanBox = document.querySelector(".loanBox");
const loan = document.querySelector(".loan");

const timeSlider = document.querySelector(".timeSlider");
const timeBox = document.querySelector(".timeBox");
const time = document.querySelector(".time");

const monthCost = document.querySelector(".monthCost");
const maxLoan = document.querySelector(".maxLoan");
const maxTime = document.querySelector(".maxTime");
const btn = document.querySelector(".btn");

const yearlyInterestRate = 9.9;

let currentMonthLoan = loanSlider.value;
let currentTime = timeSlider.value;

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
    setMonthlyCost(loanSlider.value, timeSlider.value) + " SEK / månad";
};

initialPayment();

const timeRange = [2, 3, 4, 5, 6, 7, 8, 9, 10];

loanSlider.addEventListener("input", (event) => {
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

timeSlider.addEventListener("input", () => {
  let percentage =
    ((timeSlider.value - timeSlider.min) / (timeSlider.max - timeSlider.min)) *
    100;
  timeSlider.style.background =
    "linear-gradient(to right, #512D6D, #512D6D " +
    percentage +
    "%, #ffffff " +
    percentage +
    "%, #ffffff 100%)";

  timeDisplayer(percentage);

  if (timeSlider.value === timeSlider.max) {
    maxTime.style.display = "none";
    timeSlider.style.borderRight = "none";
  } else {
    timeSlider.style.borderRight = "1px solid rgb(94, 94, 94)";
  }
});

const timeDisplayer = (percentage) => {
  let timeConverter = parseInt(timeSlider.value / 10);
  if (timeRange.includes(parseFloat(timeConverter))) {
    currentTime = timeConverter;
    monthCost.innerHTML =
      setMonthlyCost(currentMonthLoan, currentTime) + " SEK / månad";

    time.style.right = "-50px";
    time.style.width = "100px";
    timeBox.style.width = `${(percentage / 100) * 360}px`;
    time.innerHTML = currentTime + " år ";
    
  }
};

const monthlyCostDisplayer = (percentage) => {
  loan.style.right = "-20px";
  loan.style.width = "100px";
  loanBox.style.width = `${(percentage / 100) * 360}px`;

  currentMonthLoan = loanSlider.value;
  monthCost.innerHTML =
    setMonthlyCost(currentMonthLoan, currentTime) + " SEK / månad";
  loan.innerHTML =
    currentMonthLoan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
    " " +
    "kr";
};

btn.addEventListener("click", () => {
  var url = new URL("http://test/loan-application/");

  url.searchParams.append("amount", currentMonthLoan);
  url.searchParams.append("months", currentTime * 12);

  console.log(url.pathname + url.search);
});
