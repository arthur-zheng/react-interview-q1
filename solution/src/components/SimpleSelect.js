import { React, useState, useEffect } from "react";
import { getLocations } from "../mock-api/apis";

const isSelectionValid = (value) => value !== "";

const SimpleSelect = ({ location, handleChange, errorMessage, setErrors }) => {
  const [options, setOptions] = useState([]);

  // TODO: Retry get locations if failed
  useEffect(() => {
    getLocations().then((locations) => setOptions(locations));
  }, []);

  const locationOptions = options.map((location) => (
    <option key={location} value={location}>
      {location}
    </option>
  ));

  const onSelectionChange = (e) => {
    const newValue = e.target.value;
    handleChange(newValue);
    if (isSelectionValid(newValue)) {
      setErrors((errors) => ({ ...errors, location: "" }));
    } else {
      setErrors((errors) => ({
        ...errors,
        location: "Please select a location",
      }));
    }
  };

  return (
    <>
      <div className="form-row">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <select
          name="location"
          value={location}
          placeholder="Enter name"
          type="text"
          onChange={onSelectionChange}
        >
          <option value="" disabled>
            Select an option
          </option>
          {locationOptions}
        </select>
      </div>
      <p className={`error-message ${errorMessage ? "show" : ""}`}>
        {errorMessage}
      </p>
    </>
  );
};

export default SimpleSelect;
