export const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};

export const getDaysArray = function (start, end) {
  let arr;
  let date;
  for (
    arr = [], date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    arr.push(new Date(date));
  }
  return arr;
};

export const dateFunc = (string) => {
  const today = new Date();
  if (string === "yesterday") {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return formatDate(date);
  }
  if (string === "last week") {
    let first = today.getDate() - today.getDay();
    const last = first + 6;
    const firstDay = formatDate(new Date(today.setDate(first)).toUTCString());
    const lastDay = formatDate(new Date(today.setDate(last)).toUTCString());
    return { firstDay, lastDay };
  }
  if (string === "last month") {
    const firstDay = formatDate(
      new Date(today.getFullYear(), today.getMonth() - 1, 1)
    );
    const lastDay = formatDate(
      new Date(today.getFullYear(), today.getMonth(), 0)
    );
    return { firstDay, lastDay };
  }
  if (string === "date range") {
    const firstDay = document.getElementById("start").value;
    const lastDay = document.getElementById("end").value;
    return { firstDay, lastDay };
  }
  return formatDate(today);
};
