// src/api.js
const baseURL = 'http://localhost:3001/api';

const submitFormEndpoint = `${baseURL}/admissions/submit-form`;

const submitForm = (formData) => {
  return fetch(submitFormEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error submitting form:', error);
    });
};



export { submitForm};
