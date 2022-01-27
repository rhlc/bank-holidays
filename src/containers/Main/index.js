import { useEffect, useState } from "react";

import { formatDate, getDaysArray, dateFunc } from "../../utils/DateUtil";
import { Button } from "../../components/Button";

function Main() {
  const [fetchedData, setFetchedData] = useState(null);
  const [res, setRes] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://www.gov.uk/bank-holidays.json", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setFetchedData(result))
      .catch((error) => console.log("error", error));
  };

  const handleYesterdayBtn = () => {
    const date = dateFunc("yesterday");
    let result = [];
    for (let index = 0; index < Object.entries(fetchedData).length; index++) {
      const element = Object.entries(fetchedData)[index];
      const res =
        ("elem",
        element[1].events.filter(function (a) {
          return a.date === date;
        }));
      result.push(res);
    }
    setRes(result);
  };

  const handleLastWeekBtn = () => {
    const date = dateFunc("last week");
    for (let index = 0; index < Object.entries(fetchedData).length; index++) {
      const element = Object.entries(fetchedData)[index];
      const daysList = getDaysArray(
        new Date(date.firstDay),
        new Date(date.lastDay)
      );
      daysList.forEach((day) => {
        element[1].events.filter(function (a) {
          if (a.date === formatDate(day)) {
            console.log("some");
          }
          return a.date === day;
        });
      });
    }
  };

  const handleLastMonthBtn = () => {
    const date = dateFunc("last month");
    for (let index = 0; index < Object.entries(fetchedData).length; index++) {
      const element = Object.entries(fetchedData)[index];
      const daysList = getDaysArray(
        new Date(date.firstDay),
        new Date(date.lastDay)
      );
      daysList.forEach((day) => {
        element[1].events.filter(function (a) {
          if (a.date === formatDate(day)) {
            console.log("some");
          }
          return a.date === day;
        });
      });
    }
  };

  const handleRangeBtn = () => {
    setShow(true);
    let result = [];
    const date = dateFunc("date range");
    for (let index = 0; index < Object.entries(fetchedData).length; index++) {
      const element = Object.entries(fetchedData)[index];
      const daysList = getDaysArray(
        new Date(date.firstDay),
        new Date(date.lastDay)
      );
      daysList.forEach((day) => {
        element[1].events.filter(function (a) {
          if (a.date === formatDate(day)) {
            result.push(a);
          }
          return a.date === day;
        });
      });
    }
    setRes(result);
  };

  console.log(res);

  return (
    <>
      <div className="App">
        <header></header>
        <p>Bank Holidays</p>
        <Button onClick={handleYesterdayBtn} text={"yesterday"} />
        <Button onClick={handleLastWeekBtn} text="last week" />
        <Button onClick={handleLastMonthBtn} text="last month" />
        <Button onClick={handleRangeBtn} text="select range" />
        {show ? (
          <span>
            <p>
              Start <input type="date" id="start"></input>
            </p>
            <p>
              end <input type="date" id="end"></input>
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRangeBtn();
              }}
            >
              Search
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShow(false);
              }}
            >
              Done
            </button>
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Main;
