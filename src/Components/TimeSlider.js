import React, { useState, useEffect } from "react";
import "./TimeSlider.css";
import { connectRefinementList } from "react-instantsearch-dom";

const TimeSlider = (props) => {
  const [value, setValue] = useState(0);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  const handleChange = (value) => {
    setValue(value);
    const selection = [props.items[value].label];
    props.refine(selection);
  };

  const handleClick = () => {
    for (var i = 0; i <= props.items.length - 1; i++) {
      var tick = function (i) {
        return function () {
          document.querySelector("input[type=range]").value = i;
          handleChange(i);
        };
      };
      setTimeout(tick(i), 500 * i);
    }
  };

  return (
    <div className={props.className}>
      {props.items.length > 0 ? (
        <div>
          <h4>{props.items[value].label}</h4>
          <button className="button" onClick={handleClick} />
          <label>{props.items[0].label}</label>
          <input
            type="range"
            min={0}
            max={props.items.length - 1}
            step={1}
            value={value}
            onChange={(changeEvent) => handleChange(changeEvent.target.value)}
          />
          <label>{props.items[props.items.length - 1].label}</label>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default connectRefinementList(TimeSlider);
