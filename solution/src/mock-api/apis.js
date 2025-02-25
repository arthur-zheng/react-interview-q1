/**
 * do not change the implementation
 */
export const isNameValid = (name) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(name !== "invalid name");
    }, Math.random() * 2000);
  });

/**
 * do not change the implementation
 */
export const getLocations = () =>
  Promise.resolve(["Canada", "China", "USA", "Brazil"]);

export const postData = (inputData, setFormData) =>
  new Promise((resolve) => {
    setTimeout(() => {
      setFormData((existingFormData) => [
        ...existingFormData,
        [inputData.name, inputData.location],
      ]);
      resolve();
    }, Math.random() * 1000);
  });
