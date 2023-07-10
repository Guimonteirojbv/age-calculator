const day = document.getElementById("day");
const labelDay = document.getElementById("labelDay");

const month = document.getElementById("month");
const labelMonth = document.getElementById("labelMonth");

const year = document.getElementById("year");
const labelYear = document.getElementById("labelYear");

const form = document.getElementById("form");

const spanErrorDay = document.getElementById("error-day");
const spanErrorMonth = document.getElementById("error-month");
const spanErrorYear = document.getElementById("error-year");

const getDate = new Date();

const currentYear = getDate.getFullYear();

form.addEventListener("submit", validateDataForm);

function validateDataForm(event) {
  event.preventDefault();

  const valueDay = parseInt(event.target.day.value, 10);
  const valueMonth = parseInt(event.target.month.value, 10);
  const valueYear = parseInt(event.target.year.value, 10);

  if (valueDay > 31) {
    spanErrorDay.innerText = "Must be a valid day";
    day.classList.add("wraper-input-error");
    labelDay.classList.add("wraper-input-label-error");
  }
  if (valueMonth > 12) {
    spanErrorMonth.innerText = "Must be a valid month";
    month.classList.add("wraper-input-error");
    labelMonth.classList.add("wraper-input-label-error");
  }
  if (valueYear > currentYear) {
    spanErrorYear.innerText = "Must be a valid year";
    year.classList.add("wraper-input-error");
    labelYear.classList.add("wraper-input-label-error");
  }

  const isValidDate = validateDate(valueDay, valueMonth, valueYear);

  if (isValidDate) {
    spanErrorDay.innerText = "";
    day.classList.remove("wraper-input-error");
    labelDay.classList.remove("wraper-input-label-error");

    spanErrorMonth.innerText = "";
    month.classList.remove("wraper-input-error");
    labelMonth.classList.remove("wraper-input-label-error");

    spanErrorYear.innerText = "";
    year.classList.remove("wraper-input-error");
    labelYear.classList.remove("wraper-input-label-error");

    const spanYears = document.getElementById("span-elapsed-years");
    const spanMonths = document.getElementById("span-elapsed-months");
    const spanDays = document.getElementById("span-elapsed-days");

    const ageCalculated = calcAge(valueDay, valueMonth, valueYear);

    spanYears.innerText = ageCalculated.years;
    spanMonths.innerText = ageCalculated.months;
    spanDays.innerText = ageCalculated.days;
  }
}

function validateDate(dayInput, monthInput, yearInput) {
  const date = new Date(yearInput, monthInput - 1, dayInput);

  return (
    date.getDate() === dayInput &&
    date.getMonth() === monthInput - 1 &&
    date.getFullYear() === yearInput
  );
}

function calcAge(dayInput, monthInput, yearInput) {
  const date = new Date(yearInput, monthInput - 1, dayInput);
  const elapsedTime = getDate - date;

  const years = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor(
    (elapsedTime % (1000 * 60 * 60 * 24 * 365.25)) /
      (1000 * 60 * 60 * 24 * (365.25 / 12))
  );
  const days = Math.floor(
    (elapsedTime % (1000 * 60 * 60 * 24 * (365.25 / 12))) /
      (1000 * 60 * 60 * 24)
  );
  return {
    years,
    months,
    days,
  };
}
