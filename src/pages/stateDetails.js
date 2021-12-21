import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../api/useAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const StateDetails = () => {
  const { state } = useParams();
  const history = useNavigate();
  const [info, setInfo] = useState({});
  const [sortObject, setSortObject] = useState({
    confirmed: "desc",
    affected: "desc",
    vaccinated: "desc",
  });
  const { loading, data, error } = useApi(
    "https://data.covid19india.org/v4/min/timeseries.min.json"
  );

  useEffect(() => {
    if (data) {
      let key,
        dataCopy = JSON.parse(JSON.stringify(data));
      for (key in dataCopy) {
        if (key === state) {
          setInfo(dataCopy[key]["dates"]);
        }
      }
    }
  }, [data, state]);

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

  const sortByRecovered = () => {
    console.log("clicked");
  };

  const sortByDeceased = () => {
    console.log("clicked");
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const onDateChange = (e) => {
    let key,
      dataCopy = JSON.parse(JSON.stringify(data));
    if (!e.target.value) {
      for (key in dataCopy) {
        if (key === state) {
          setInfo(dataCopy[key]["dates"]);
        }
      }
    } else {
      let object = {};
      object[e.target.value] = dataCopy[state]["dates"][e.target.value];
      setInfo(object);
    }
  };
  return (
    <>
      <div className="header">
        <h1>
          Covid Tracker - India{" "}
          <span
            onClick={() => {
              history(-1);
            }}
            style={{
              cursor: "pointer",
              float: "right",
              fontSize: "1rem",
              fontWeight: "normal",
              color: "red",
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </span>
        </h1>
      </div>
      <div className="toolbar">
        <div>
          <input type="date" onChange={onDateChange} />
        </div>
        <div>
          <span>
            <button className="sortbtn" onClick={sortByCount}>
              Sort by Confirmed count
              <FontAwesomeIcon icon={faSort} className="ml-2" />
            </button>
          </span>
          <span>
            <button className="sortbtn" onClick={sortByRecovered}>
              Sort by Recovered count
              <FontAwesomeIcon icon={faSort} className="ml-2" />
            </button>
          </span>
          <span>
            <button className="sortbtn" onClick={sortByDeceased}>
              Sort by Deceased count
              <FontAwesomeIcon icon={faSort} className="ml-2" />
            </button>
          </span>
        </div>
      </div>
      <div>
        <table className="table">
          <thead>
            <th>Date</th>
            <th>Confirmed</th>
            <th>Recovered</th>
            <th>Deceased</th>
            <th>Delta</th>
            <th>Delta7</th>
          </thead>
          <tbody>
            {Object?.keys(info)?.map((key) => {
              return (
                <tr>
                  <td>{key}</td>
                  <td>{info[key]?.total?.confirmed || "NA"}</td>
                  <td>{info[key]?.total?.recovered || "NA"}</td>
                  <td>{info[key]?.total?.deceased || "NA"}</td>
                  <td>
                    <p>{`Confirmed - ${
                      info[key]?.delta?.confirmed || "NA"
                    }`}</p>
                    <p>{`Recovered - ${
                      info[key]?.delta?.recovered || "NA"
                    }`}</p>
                    <p>{`Deceased - ${info[key]?.delta?.deceased || "NA"}`}</p>
                  </td>
                  <td>
                    <p>{`Confirmed - ${
                      info[key]?.delta7?.confirmed || "NA"
                    }`}</p>
                    <p>{`Recovered - ${
                      info[key]?.delta7?.recovered || "NA"
                    }`}</p>
                    <p>{`Deceased - ${info[key]?.delta7?.deceased || "NA"}`}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <hr />
    </>
  );
};

export default StateDetails;
