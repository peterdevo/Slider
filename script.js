const loanSlider = document.querySelector(".loanSlider");
const loan = document.querySelector(".loan");

const timeSlider = document.querySelector(".timeSlider");
const time = document.querySelector(".time");

const monthCost = document.querySelector(".monthCost");
const yearlyInterestRate = 9.9;
let loanSliderValue = loanSlider.value * 10000;

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
    setMonthlyCost(loanSliderValue, timeSlider.value) + " SEK / månad";
};

initialPayment();

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

  loanSliderValue = loanSlider.value * 10000;

  if (loanSlider.value > 2) {
    loan.style.display = "block";
    let position = parseInt(loanSlider.value);
    if (loanSlider.value > 5) {
      loan.style.left = `${(position *= 2)}%`;
    }
    loan.style.left = `${position}%`;
    loan.innerHTML =
      loanSliderValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
      " " +
      "kr";
  } else loan.style.display = "none";

  monthCost.innerHTML =
    setMonthlyCost(loanSliderValue, timeSlider.value) + " SEK / månad";
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
  let timeSliderValue = timeSlider.value;

  if (timeSlider.value > 2) {
    time.style.display = "block";
    let position = parseInt(timeSlider.value);
    if (timeSlider.value > 5) {
      time.style.left = `${(position *= 4.2)}%`;
    }
    time.style.left = `${position}%`;
    time.innerHTML =
      timeSliderValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
      " " +
      "år";
  } else time.style.display = "none";

  monthCost.innerHTML =
    setMonthlyCost(loanSliderValue, timeSlider.value) + " SEK / månad";
});
