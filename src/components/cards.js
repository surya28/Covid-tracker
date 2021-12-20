import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StateCard = ({ state }) => {
  const [districts, setDistricts] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    let disctrictCopy = [],
      key;
    for (key in state?.districts) {
      disctrictCopy.push(key);
    }
    setDistricts(disctrictCopy);
  }, [state]);

  return (
    <article className="card">
      <div>
        <h2
          onClick={() => {
            history(`${state?.state}`);
          }}
        >
          State - {state?.state}
        </h2>
        <span>
          <select className="select">
            <option value="all">Select a district</option>
            {districts?.map((district) => {
              return (
                <option value={district} key={district}>
                  {district}
                </option>
              );
            })}
          </select>
        </span>
        <span></span>
        <p>Confirmed - {state?.total?.confirmed || "NA"}</p>
        <p>Recovered - {state?.total?.recovered || "NA"}</p>
        <p>Deceased - {state?.total?.deceased || "NA"}</p>
      </div>
    </article>
  );
};

export default StateCard;
