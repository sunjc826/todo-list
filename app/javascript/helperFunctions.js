// In this application, for simplicity, I will ignore issues like timezone

// Input: Date object or valid dateString are both acceptable
function dateToString(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

function sameDay(d1, d2) {
  const sameYear = d1.getFullYear() === d2.getFullYear();
  const sameMonth = d1.getMonth() === d2.getMonth();
  const sameDate = d1.getDate() === d2.getDate();
  return sameYear && sameMonth && sameDate;
}

function getPrevDay(date) {
  const yest = new Date(date);
  yest.setDate(yest.getDate() - 1);
  return yest;
}

function getNextDay(date) {
  const tmr = new Date(date);
  tmr.setDate(tmr.getDate() + 1);
  return tmr;
}

function generateDateList(curDate, days) {
  const dateList = [];
  for (let i = 0; i < days; i++) {
    dateList.push(curDate);
    curDate = getNextDay(curDate);
  }
  return dateList;
}

function compareDateByDay(date1, date2, strict) {
  let d1 = new Date(date1);
  d1.setHours(0);
  d1.setMinutes(0);
  d1.setSeconds(0);
  d1.setMilliseconds(0);
  let d2 = new Date(date2);
  d2.setHours(0);
  d2.setMinutes(0);
  d2.setSeconds(0);
  d2.setMilliseconds(0);

  if (strict) {
    return d1.getTime() < d2.getTime();
  } else {
    return d2.getTime() <= d2.getTime();
  }
}

const generatePostRequest = (body) => {
  const csrfToken = document
    .querySelector("[name=csrf-token]")
    .getAttribute("content");
  console.log("csrfToken", csrfToken);
  return {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-Token": csrfToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
    credentials: "same-origin",
  };
};

const generateDeleteRequest = () => {
  const csrfToken = document
    .querySelector("[name=csrf-token]")
    .getAttribute("content");
  return {
    method: "DELETE",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-Token": csrfToken,
      Accept: "application/json",
    },
    credentials: "same-origin",
  };
};

// returns true if smaller list is contained in larger list
const listContains = ({ smaller, larger }) => {
  const largerSet = new Set(larger);
  return smaller.reduce((accumulator, curValue) => {
    return accumulator && largerSet.has(curValue);
  }, true);
};

export {
  dateToString,
  sameDay,
  getPrevDay,
  getNextDay,
  generateDateList,
  compareDateByDay,
  generatePostRequest,
  generateDeleteRequest,
  listContains,
};
