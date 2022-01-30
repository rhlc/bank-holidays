import { useEffect, useState } from "react";

import { formatDate, getDaysArray, dateFunc } from "../../utils/DateUtil";
import { Button } from "../../components/Button";

function Index() {
  const [fetchedData, setFetchedData] = useState(null);
  const [res, setRes] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getData = () => {
      fetch("https://www.gov.uk/bank-holidays.json", {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => cleanUpData(result))
        .catch((error) => console.log("error", error));
    };
    getData();
  }, []);

  const cleanUpData = (fetchedData) => {
    let resArray = [];
    const fetchedDataArr = Object.keys(fetchedData).map((key) => [
      key,
      fetchedData[key],
    ]);
    fetchedDataArr.forEach((country) => {
      resArray.push(country[1]);
    });
    setFetchedData(resArray);
  };

  const searchFunc = (date) => {
    const res = [];
    const daysList = getDaysArray(
      new Date(date.firstDay),
      new Date(date.lastDay)
    );
    for (let index = 0; index < fetchedData.length; index++) {
      const country = fetchedData[index];
      daysList.forEach((day) => {
        const countryArr = Object.keys(country).map((key) => [
          key,
          country[key],
        ]);
        countryArr[1][1].forEach((event) => {
          if (event.date === formatDate(day)) {
            res.push({
              event: event.title,
              date: event.date,
              country: country.division,
            });
          }
        });
      });
    }
    setRes(res);
  };

  const handleYesterdayBtn = () => {
    const date = dateFunc("yesterday");
    searchFunc(date);
  };

  const handleLastWeekBtn = () => {
    const date = dateFunc("last week");
    searchFunc(date);
  };

  const handleLastMonthBtn = () => {
    const date = dateFunc("last month");
    searchFunc(date);
  };

  const handleRangeBtn = () => {
    const date = dateFunc("date range");
    searchFunc(date);
  };

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
                setRes(false);
              }}
            >
              Done
            </button>
          </span>
        ) : (
          ""
        )}
        {res ? (
          <div>
            {res.map((resultItem) => (
              <p key={Math.floor(Math.random() * 10000000 + 1)}>
                {JSON.stringify(resultItem)}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Index;
