// In this application, for simplicity, I will ignore issues like timezone

// Input: Date object or valid dateString are both acceptable
const dateToString = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
};

const sameDay = (d1, d2) => {
  const sameYear = d1.getFullYear() === d2.getFullYear();
  const sameMonth = d1.getMonth() === d2.getMonth();
  const sameDate = d1.getDate() === d2.getDate();
  return sameYear && sameMonth && sameDate;
};

const getPrevDay = (date) => {
  const yest = new Date(date);
  yest.setDate(yest.getDate() - 1);
  return yest;
};

const getNextDay = (date) => {
  const tmr = new Date(date);
  tmr.setDate(tmr.getDate() + 1);
  return tmr;
};

const generateDateList = ({ curDate, days }) => {
  const dateList = [];
  for (let i = 0; i < days; i++) {
    dateList.push(curDate);
    curDate = getNextDay(curDate);
  }
  return dateList;
};

const compareDateByDay = ({ date1, date2, strict }) => {
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
    return d1.getTime() <= d2.getTime();
  }
};

const dateLiesBetween = ({ startDate, endDate, date }) => {
  return (
    compareDateByDay({ date1: startDate, date2: date, strict: false }) &&
    compareDateByDay({ date1: date, date2: endDate, strict: false })
  );
};

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

const generateEditRequest = (body) => {
  const csrfToken = document
    .querySelector("[name=csrf-token]")
    .getAttribute("content");
  console.log("csrfToken", csrfToken);
  return {
    method: "PATCH",
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

// returns true if smaller list is contained in larger list
const listContains = ({ smaller, larger }) => {
  const largerSet = new Set(larger);
  return smaller.reduce((accumulator, curValue) => {
    return accumulator && largerSet.has(curValue);
  }, true);
};

// From https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
const percentColors = [
  { pct: 0.0, color: { r: 0x00, g: 0xff, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } },
];

const getColorForPercentage = (pct) => {
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  let lower = percentColors[i - 1];
  let upper = percentColors[i];
  let range = upper.pct - lower.pct;
  let rangePct = (pct - lower.pct) / range;
  let pctLower = 1 - rangePct;
  let pctUpper = rangePct;
  let color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
  // or output as hex if preferred
};

export {
  dateToString,
  sameDay,
  getPrevDay,
  getNextDay,
  generateDateList,
  compareDateByDay,
  dateLiesBetween,
  generatePostRequest,
  generateDeleteRequest,
  generateEditRequest,
  listContains,
  getColorForPercentage,
};
