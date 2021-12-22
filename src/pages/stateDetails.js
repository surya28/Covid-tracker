import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../api/useAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NoResult from "../components/noResults";

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

  const {
    loading: dataLoading,
    data: total,
    error: dataError,
  } = useApi("https://data.covid19india.org/v4/min/data.min.json");

  useEffect(() => {
    if (data && total) {
      let copy = data[state]["dates"];
      const population = total[state]?.meta?.population;
      Object?.keys(copy).forEach((item) => {
        if (copy[item]?.total?.vaccinated2) {
          copy[item] = {
            ...copy[item],
            vaccinatedPercentage:
              (copy[item]?.total?.vaccinated2 / population) * 100,
          };
        } else {
          copy[item] = { ...copy[item], vaccinatedPercentage: 0 };
        }
        copy[item] = {
          ...copy[item],
          affectedPercentage: (copy[item]?.total?.confirmed / population) * 100,
        };
      });
      setInfo(copy);
    }
  }, [data, total, state]);

  const sortByCount = () => {
    let copy = JSON.parse(JSON.stringify(info)),
      sorted = {};
    if (sortObject.confirmed === "desc") {
      Object.keys(copy)
        .sort(function (a, b) {
          return copy[b]?.total?.confirmed - copy[a]?.total?.confirmed;
        })
        .forEach(function (key) {
          sorted[key] = copy[key];
        });
      setSortObject({ ...sortObject, confirmed: "asc" });
    } else {
      Object.keys(copy)
        .sort(function (a, b) {
          return copy[a]?.total?.confirmed - copy[b]?.total?.confirmed;
        })
        .forEach(function (key) {
          sorted[key] = copy[key];
        });
      setSortObject({ ...sortObject, confirmed: "desc" });
    }
    setInfo(sorted);
  };

  const sortByAffected = () => {
    let copy = JSON.parse(JSON.stringify(info)),
      sorted = {};
    if (sortObject.affected === "desc") {
      Object.keys(copy)
        .sort(function (a, b) {
          return copy[b]?.affectedPercentage - copy[a]?.affectedPercentage;
        })
        .forEach(function (key) {
          sorted[key] = copy[key];
        });
      setSortObject({ ...sortObject, affected: "asc" });
    } else {
      Object.keys(copy)
        .sort(function (a, b) {
          return copy[a]?.affectedPercentage - copy[b]?.affectedPercentage;
        })
        .forEach(function (key) {
          sorted[key] = copy[key];
        });
      setSortObject({ ...sortObject, affected: "desc" });
    }
    setInfo(sorted);
  };

  const sortByVaccinated = () => {
    let copy = JSON.parse(JSON.stringify(info)),
      sorted = {};
    if (sortObject.vaccinated === "desc") {
      Object.keys(copy)
        .sort(function (a, b) {
          return copy[b]?.vaccinatedPercentage - copy[a]?.vaccinatedPercentage;
        })
        .forEach(function (key) {
          sorted[key] = copy[key];
        });
      setSortObject({ ...sortObject, vaccinated: "asc" });
    } else {
      Object.keys(copy)
        .sort(function (a, b) {
          return copy[a]?.vaccinatedPercentage - copy[b]?.vaccinatedPercentage;
        })
        .forEach(function (key) {
          sorted[key] = copy[key];
        });
      setSortObject({ ...sortObject, vaccinated: "desc" });
    }
    setInfo(sorted);
  };

  if (loading || dataLoading) return <div className="loader"></div>;
  if (error || dataError) return <NoResult />;

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
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Confirmed</th>
              <th>Recovered</th>
              <th>Deceased</th>
              <th>Delta</th>
              <th>Delta7</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(info)?.length > 0 ? (
              Object?.keys(info)?.map((key) => {
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{info[key]?.total?.confirmed || 0}</td>
                    <td>{info[key]?.total?.recovered || 0}</td>
                    <td>{info[key]?.total?.deceased || 0}</td>
                    <td>
                      <p>{`Confirmed - ${info[key]?.delta?.confirmed || 0}`}</p>
                      <p>{`Recovered - ${info[key]?.delta?.recovered || 0}`}</p>
                      <p>{`Deceased - ${info[key]?.delta?.deceased || 0}`}</p>
                    </td>
                    <td>
                      <p>{`Confirmed - ${
                        info[key]?.delta7?.confirmed || 0
                      }`}</p>
                      <p>{`Recovered - ${
                        info[key]?.delta7?.recovered || 0
                      }`}</p>
                      <p>{`Deceased - ${info[key]?.delta7?.deceased || 0}`}</p>
                    </td>
                  </tr>
                );
              })
            ) : (
              <NoResult />
            )}
          </tbody>
        </table>
      </div>
      <hr />
    </>
  );
};

export default StateDetails;
