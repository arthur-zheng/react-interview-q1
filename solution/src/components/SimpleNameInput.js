import { React, useState, useCallback } from "react";
import { debounce } from "lodash";
import { isNameValid } from "../mock-api/apis";

function SimpleNameInput({ value, handleChange, setErrors, errorMessage }) {
  const [abortController, setAbortController] = useState(null);

  const validateNameInput = async (value) => {
    // To block the user from submitting an form when validating
    setErrors((errors) => ({ ...errors, name: "Checking..." }));
    // Abort the previous request
    if (abortController) {
      abortController.abort();
    }
    // Create a new AbortController for the new request
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    try {
      console.log("value is:", value);
      const response = await isNameValid(value);
      if (response === true) {
        console.log(":", "valid");
        setErrors((errors) => ({ ...errors, name: "" }));
      } else {
        console.log("res:", "invalid");
        setErrors((errors) => ({
          ...errors,
          name: "this name has already been taken",
        }));
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        setErrors((errors) => ({ ...errors, name: "Error checking validity" }));
      }
    }
  };

  // Debounce the validateInput function, to reduce the number of API calls
  const debouncedValidateInput = useCallback(
    debounce(validateNameInput, 500),
    []
  );

  const onInputChange = (e) => {
    const newValue = e.target.value;
    handleChange(newValue);
    debouncedValidateInput(newValue);
  };

  return (
    <>
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          name="name"
          placeholder="Enter name"
          value={value}
          type="text"
          onChange={onInputChange}
        />
      </div>
      <p className={`error-message ${errorMessage !== "" ? "show" : ""}`}>
        {errorMessage}
      </p>
    </>
  );
}

export default SimpleNameInput;
