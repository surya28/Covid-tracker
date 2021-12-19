import React, { useState, useEffect } from "react";
import useApi from "../api/useAPI";
import StateCard from "../components/cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { loading, data, error } = useApi(
    "https://data.covid19india.org/v4/min/data.min.json"
  );

  const [info, setInfo] = useState(null);
  const [sortObject, setSortObject] = useState({
    confirmed: "desc",
    affected: "desc",
    vaccinated: "desc",
  });

  useEffect(() => {
    if (data) {
      let key,
        dataCopy = JSON.parse(JSON.stringify(data)),
        infoCopy = [];
      for (key in dataCopy) {
        dataCopy[key].state = key;
        dataCopy[key].vaccinatedPercentage =
          (dataCopy[key]?.total?.vaccinated2 /
            dataCopy[key]?.meta?.population) *
          100;
        dataCopy[key].affectedPercentage =
          (dataCopy[key]?.total?.confirmed / dataCopy[key]?.meta?.population) *
          100;
        infoCopy.push(dataCopy[key]);
      }
      setInfo(infoCopy);
    }
  }, [data]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const handleOnChange = (e) => {
    let key,
      dataCopy = JSON.parse(JSON.stringify(data)),
      infoCopy = [];
    for (key in dataCopy) {
      dataCopy[key].state = key;
      infoCopy.push(dataCopy[key]);
    }
    infoCopy = infoCopy.filter((state) => {
      if (state.state.toLowerCase().includes(e.target.value)) return state;
    });
    setInfo(infoCopy);
  };

  const sortByCount = () => {
    let infoCopy = JSON.parse(JSON.stringify(info));
    if (sortObject.confirmed === "asc") {
      infoCopy = infoCopy.sort((state1, state2) => {
        if (state1.total.confirmed < state2.total.confirmed) {
          return 1;
        } else {
          return -1;
        }
      });
      setSortObject({
        ...sortObject,
        confirmed: "desc",
      });
    } else if (sortObject.confirmed === "desc") {
      infoCopy = infoCopy.sort((state1, state2) => {
        if (state1.total.confirmed < state2.total.confirmed) {
          return -1;
        } else {
          return 1;
        }
      });
      setSortObject({
        ...sortObject,
        confirmed: "asc",
      });
    }
    setInfo(infoCopy);
  };

  const sortByAffected = () => {
    let infoCopy = JSON.parse(JSON.stringify(info));
    if (sortObject.affected === "asc") {
      infoCopy = infoCopy.sort((state1, state2) => {
        return state1.affectedPercentage - state2.affectedPercentage;
      });
      setSortObject({
        ...sortObject,
        affected: "desc",
      });
    } else if (sortObject.affected === "desc") {
      infoCopy = infoCopy.sort((state1, state2) => {
        return state2.affectedPercentage - state1.affectedPercentage;
      });
      setSortObject({
        ...sortObject,
        affected: "asc",
      });
    }
    setInfo(infoCopy);
  };

  const sortByVaccinated = () => {
    let infoCopy = JSON.parse(JSON.stringify(info));
    if (sortObject.vaccinated === "asc") {
      infoCopy = infoCopy.sort((state1, state2) => {
        return state1.vaccinatedPercentage - state2.vaccinatedPercentage;
      });
      setSortObject({
        ...sortObject,
        vaccinated: "desc",
      });
    } else if (sortObject.vaccinated === "desc") {
      infoCopy = infoCopy.sort((state1, state2) => {
        return state2.vaccinatedPercentage - state1.vaccinatedPercentage;
      });
      setSortObject({
        ...sortObject,
        vaccinated: "asc",
      });
    }
    setInfo(infoCopy);
  };
  return (
    <>
      <div className="header">
        <h1>Covid Tracker - India</h1>
      </div>
      <hr />
      <div className="toolbar">
        <div>
          <input
            type="text"
            placeholder="search a state"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <input type="date" />
        </div>
        <div>
          <span>
            <button className="sortbtn" onClick={sortByCount}>
              Sort by Confirmed count
              <FontAwesomeIcon icon={faSort} className="ml-2" />
            </button>
          </span>
          <span>
            <button className="sortbtn" onClick={sortByAffected}>
              Sort by Affected percentage
              <FontAwesomeIcon icon={faSort} className="ml-2" />
            </button>
          </span>
          <span>
            <button className="sortbtn" onClick={sortByVaccinated}>
              Sort by Vaccinated percentage
              <FontAwesomeIcon icon={faSort} className="ml-2" />
            </button>
          </span>
        </div>
      </div>
      <div className="cards">
        {info?.map((state) => {
          return <StateCard state={state} key={state.state} />;
        })}
      </div>
    </>
  );
};

export default Home;
