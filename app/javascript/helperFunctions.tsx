// In this application, for simplicity, I will ignore issues like timezone

type DateString = Date | string;

// Input: Date object or valid dateString are both acceptable
const dateToString = (date: DateString) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
};

// inspired by
// https://stackoverflow.com/questions/34430704/update-react-native-view-on-day-change
function getMillisecondsToNextHour(time: Date) {
  const secondsInHour = 3600;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const totalSeconds = minutes * 60 + seconds;
  return (secondsInHour - totalSeconds) * 1000;
}

const sameDay = (d1: Date, d2: Date) => {
  const sameYear = d1.getFullYear() === d2.getFullYear();
  const sameMonth = d1.getMonth() === d2.getMonth();
  const sameDate = d1.getDate() === d2.getDate();
  return sameYear && sameMonth && sameDate;
};

const getPrevDay = (date: DateString) => {
  const yest = new Date(date);
  yest.setDate(yest.getDate() - 1);
  return yest;
};

const getNextDay = (date: DateString) => {
  const tmr = new Date(date);
  tmr.setDate(tmr.getDate() + 1);
  return tmr;
};

type generateDateListArgs = {
  curDate: Date;
  days: number;
}

const generateDateList = ({ curDate, days }: generateDateListArgs) => {
  const dateList = [];
  for (let i = 0; i < days; i++) {
    dateList.push(curDate);
    curDate = getNextDay(curDate);
  }
  return dateList;
};

type compareDateByDayArgs = {
  date1: DateString;
  date2: DateString;
  strict: boolean;
}

const compareDateByDay = ({ date1, date2, strict }: compareDateByDayArgs) => {
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

type dateLiesBetweenArgs = {
  startDate: DateString;
  endDate: DateString;
  date: DateString;
}

const dateLiesBetween = ({ startDate, endDate, date }: dateLiesBetweenArgs) => {
  return (
    compareDateByDay({ date1: startDate, date2: date, strict: false }) &&
    compareDateByDay({ date1: date, date2: endDate, strict: false })
  );
};

const generatePostRequest = (body: string): RequestInit => {
  const csrfToken = document
    .querySelector("[name=csrf-token]")!
    .getAttribute("content")!;
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

const generateDeleteRequest = (): RequestInit => {
  const csrfToken = document
    .querySelector("[name=csrf-token]")!
    .getAttribute("content")!;
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

const generateEditRequest = (body: string): RequestInit => {
  const csrfToken = document
    .querySelector("[name=csrf-token]")!
    .getAttribute("content")!;
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

type listContainsArgs = {
  smaller: unknown[];
  larger: unknown[];
}

// returns true if smaller list is contained in larger list
const listContains = ({ smaller, larger }: listContainsArgs) => {
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

const getColorForPercentage = (pct: number) => {
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
  getMillisecondsToNextHour,
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
