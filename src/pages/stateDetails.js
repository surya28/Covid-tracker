import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../api/useAPI";

const StateDetails = () => {
  const { state } = useParams();
  const [info, setInfo] = useState(null);
  const { loading, data, error } = useApi(
    "https://data.covid19india.org/v4/min/timeseries.min.json"
  );

  useEffect(() => {
    if (data) {
      let key,
        dataCopy = JSON.parse(JSON.stringify(data)),
        infoCopy = [];
      for (key in dataCopy) {
        if (key === state) {
          dataCopy[key].state = key;
          infoCopy.push(dataCopy[key]);
        }
      }
      setInfo(infoCopy);
    }
  }, [data]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  console.log(data);
  return (
    <>
      <div className="header">
        <h1>Covid Tracker - India</h1>
      </div>
      <div>state - {state}</div>
      <hr />
    </>
  );
};

export default StateDetails;
