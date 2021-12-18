import React, { useEffect, useState } from "react";

const StateCard = ({ state }) => {
  const [districts, setDistricts] = useState(null);

  useEffect(() => {
    let disctrictCopy = [],
      key;
    for (key in state?.districts) {
      console.log(key);
      disctrictCopy.push(key);
    }
    setDistricts(disctrictCopy);
  }, [state]);

  console.log(districts);
  return (
    <article className="card">
      <header>
        <h2>State - {state?.state}</h2>
        <span>
          <select className="select">
            <option value="none">Select a district</option>
            {districts?.map((district) => {
              return <option value={district}>{district}</option>;
            })}
          </select>
        </span>
        <span></span>
        <p>Confirmed - {state?.total?.confirmed}</p>
        <p>Recovered - {state?.total?.recovered}</p>
        <p>Deceased - {state?.total?.deceased}</p>
      </header>
    </article>
  );
};

export default StateCard;
