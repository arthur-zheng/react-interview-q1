import { React, useState } from "react";
import { postData } from "./mock-api/apis";
import SimpleTable from "./components/SimpleTable";
import SimpleSelect from "./components/SimpleSelect";
import SimpleNameInput from "./components/SimpleNameInput";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "", location: "" });
  const [errors, setErrors] = useState({
    name: "",
    location: "",
  });
  const [tableData, setTableData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // To handle the case when user submits an empty form without clicking input/select
    const isNameEmpty = formData.name === "";
    const isLocationEmpty = formData.location === "";
    const newErrors = {
      ...errors,
      name: isNameEmpty ? "Please type in a name" : errors.name,
      location: isLocationEmpty ? "Please select a location" : errors.location,
    };
    setErrors(newErrors);
    // Only proceed if there are no errors
    if (
      !isNameEmpty &&
      !isLocationEmpty &&
      !newErrors.name &&
      !newErrors.location
    ) {
      clearForm();
      postData(formData, setTableData);
    }
  };

  const clearForm = () => {
    setFormData({ name: "", location: "" });
    setErrors({ name: "", location: "" });
  };

  return (
    <>
      <header className="App-header">
        <h1>React-interview-q1 solution</h1>
      </header>
      <div className="App">
        <form>
          <SimpleNameInput
            handleChange={(value) => setFormData({ ...formData, name: value })}
            value={formData.name}
            setErrors={setErrors}
            errorMessage={errors.name}
          />
          <SimpleSelect
            location={formData.location}
            handleChange={(value) =>
              setFormData({ ...formData, location: value })
            }
            setErrors={setErrors}
            errorMessage={errors.location}
          />
          <div className="form-row controls">
            <button type="button" onClick={clearForm}>
              Clear
            </button>
            <button type="submit" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </form>
      </div>
      <SimpleTable tableData={tableData} />
    </>
  );
}

export default App;
