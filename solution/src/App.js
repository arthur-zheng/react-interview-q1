import { React, useState, useEffect } from "react";
import { getLocations, isNameValid, postData } from "./mock-api/apis";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "", location: "" });
  const [formError, setFormError] = useState({
    name: "name taken",
    location: "location not valid",
  });
  const [options, setOptions] = useState(["loading"]);
  const [tableData, setTableData] = useState([
    ["tom", "atlanta"],
    ["jerry", "chicago"],
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: validate the input
    // TODO: check if the name is valid
  };

  // useEffect(() => {
  //   getLocations().then((locations) => {
  //     formData[1]({ ...formData[0], location: locations[0] });
  //   });
  // }, []);

  const locationOptions = options.map((location) => (
    <option value="Canada">{location}</option>
  ));

  const tableContent = tableData.map(([name, location]) => (
    <tr>
      <td>{name}</td>
      <td>{location}</td>
    </tr>
  ));

  return (
    <>
      <header className="App-header">
        <h1>React-interview-q1 solution</h1>
      </header>
      <div className="App">
        <form>
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input name="name" value={formData.name} type="text" />
          </div>
          {formError.name && <p className="error-message">{formError.name}</p>}
          <div className="form-row">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <select name="location" value={formData.name}>
              {locationOptions}
            </select>
          </div>
          {formError.location && (
            <p className="error-message">{formError.location}</p>
          )}
          <div className="form-row controls">
            <button type="">Clear</button>
            <button type="submit" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </form>
      </div>
      <table className="result-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </>
  );
}

export default App;
