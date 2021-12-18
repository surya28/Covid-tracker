import React, { useState, useEffect } from "react";
import useApi from "../api/useAPI";
import StateCard from "../components/cards";

const Home = () => {
  const { loading, data } = useApi(
    "https://data.covid19india.org/v4/min/data.min.json"
  );

  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (data) {
      let key,
        dataCopy = JSON.parse(JSON.stringify(data)),
        infoCopy = [];
      for (key in dataCopy) {
        dataCopy[key].state = key;
        infoCopy.push(dataCopy[key]);
      }
      setInfo(infoCopy);
    }
  }, [data]);

  console.log(info);
  if (loading) return <p>Home</p>;

  return (
    <>
      <div className="header">
        <h1>Covid Tracker</h1>
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
