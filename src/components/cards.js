import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TOTAL_SLIDES = 2;
const StateCard = (props) => {
  const [state, setState] = useState();
  const [districts, setDistricts] = useState(null);
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const history = useNavigate();

  const next = () => {
    if (current >= TOTAL_SLIDES) return;
    else setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 0) return;
    else setCurrent(current - 1);
  };

  useEffect(() => {
    ref.current.style.transition = "all 0.2s ease-in-out";
    ref.current.style.transform = `translateX(-${current}00%)`;
  }, [current]);

  useEffect(() => {
    setState(props.state);
  }, [props]);

  useEffect(() => {
    let disctrictCopy = [],
      key;
    for (key in state?.districts) {
      disctrictCopy.push(key);
    }
    setDistricts(disctrictCopy); // eslint-disable-next-line
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
      </div>
      <div className="wrapper">
        <div className="frame">
          <div className="box-container" ref={ref}>
            <div className="box">
              {" "}
              <p>Confirmed - {state?.total?.confirmed || "NA"}</p>
              <p>Recovered - {state?.total?.recovered || "NA"}</p>
              <p>Deceased - {state?.total?.deceased || "NA"}</p>
              <p>1st dose done - {state?.total?.vaccinated1 || "NA"}</p>
              <p>2 doses done - {state?.total?.vaccinated2 || "NA"}</p>
            </div>
            <div className="box">
              {" "}
              <p>Confirmed - {state?.delta?.confirmed || "NA"}</p>
              <p>Recovered - {state?.delta?.recovered || "NA"}</p>
              <p>Deceased - {state?.delta?.deceased || "NA"}</p>
              <p>1st dose done - {state?.delta?.vaccinated1 || "NA"}</p>
              <p>2 doses done - {state?.delta?.vaccinated2 || "NA"}</p>
            </div>
            <div className="box">
              {" "}
              <p>Confirmed - {state?.delta7?.confirmed || "NA"}</p>
              <p>Recovered - {state?.delta7?.recovered || "NA"}</p>
              <p>Deceased - {state?.delta7?.deceased || "NA"}</p>
              <p>1st dose done - {state?.delta7?.vaccinated1 || "NA"}</p>
              <p>2 doses done - {state?.delta7?.vaccinated2 || "NA"}</p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="button" onClick={prev}>
            Prev
          </div>
          <div className="button" onClick={next}>
            Next
          </div>
        </div>
      </div>
    </article>
  );
};

export default StateCard;
