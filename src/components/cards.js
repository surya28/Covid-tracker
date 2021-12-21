import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StateCard = (props) => {
  const [state, setState] = useState();
  const [districts, setDistricts] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    setState(props.state);
  }, [props]);

  useEffect(() => {
    let disctrictCopy = [],
      key;
    for (key in state?.districts) {
      disctrictCopy.push(key);
    }
    setDistricts(disctrictCopy);
  }, [props]);

  const handleDistrictChange = (e) => {
    if (e.target.value === "all") {
      setState(props.state);
    } else {
      setState({
        ...props.state.districts[e.target.value],
        state: state.state,
      });
    }
  };

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
          <select className="select" onChange={handleDistrictChange}>
            <option value="all">All</option>
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
        <p>1st dose done - {state?.total?.vaccinated1 || "NA"}</p>
        <p>2 doses done - {state?.total?.vaccinated2 || "NA"}</p>
      </div>
    </article>
  );
};

export default StateCard;
