// App.js
import './App.css';
import React, { useState} from 'react';
import { submitForm} from './api';




function App() {

  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    selectedBatch: '',
  });

  const [member, setMember] = useState(false);
  // const [id, setId] = useState(1);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);

  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitStatus(true);
    

    submitForm(formData)
    .then((response) => {
      console.log('Form submission response:', response);
      // Handle the response as needed
    });
  
  };


  const handleAddNewMember=()=>{
    if(member)
      setMember(false);
  }

  const handleSearchUser=()=>{
    if(!member)
      setMember(true);
  }

  const handleCloseClick=()=>{
    if(submitStatus)
      setSubmitStatus(false);
  }



  const [searchResult, setSearchResult] = useState(null);
  const handleSearchClick=(searchData)=>{
    if(!searchStatus)
      setSearchStatus(true);

      // Call an API endpoint to search for the user
    // Update the URL and endpoint according to your backend
    fetch(`/api/admissions/search-user?name=${searchData.name}&age=${searchData.age}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('API response:', data);
      setSearchResult(data);
    })
    .catch((error) => {
      console.error('Error searching for user:', error);
    });
  }

  const handleCloseUser=()=>{
    if(searchStatus)
    {
      setSearchStatus(false);
      setMember(false);

      setSearchResult(null); // Reset searchResult when closing user details
    }
  }

  return (
    <>
      {submitStatus ? <SubmittedCard name={formData.name} age={formData.age} batch={formData.selectedBatch} handleCloseClick={handleCloseClick} /> :
        ( searchStatus ? <ShowUserCard handleCloseUser={handleCloseUser} name={searchResult?.name} age={searchResult?.age} batch={searchResult?.selectedBatch} /> :
          <>
            {member ? <SearchUserForm handleSearchClick={handleSearchClick}/>  : <RegistrationForm onSubmit={handleSubmit}  onChange={handleInputChange} />}
            <button onClick={handleAddNewMember}>Become a member</button>
            <button onClick={handleSearchUser}>Existing Member</button>
          </>
        )
      }
    </>
    
  );
}




function RegistrationForm({onSubmit, onChange})
{

  return (
    <form onSubmit={onSubmit}>
      <label>Name:</label>
      <input type="text" name="name" onChange={onChange} required />

      <label>Age:</label>
      <input type="number" name="age" onChange={onChange} required />

      <label>Choose Batch:</label>
      <select name="selectedBatch" onChange={onChange} required>
        <option value="">Select Batch</option>
        <option value="6-7AM">6-7AM</option>
        <option value="7-8AM">7-8AM</option>
        <option value="8-9AM">8-9AM</option>
        <option value="5-6PM">5-6PM</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );

}

function SearchUserForm({handleSearchClick}){

  const [searchData, setSearchData] = useState({
    name: '',
    age: '',
  });

  const handleInputChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };


  const handleSearch = (e) => {
    e.preventDefault();
    // Call the onSearch function passed from the parent component
    const searchDataWithNumberAge = { ...searchData, age: parseInt(searchData.age, 10) };
    handleSearchClick(searchDataWithNumberAge);
  };


  return(
    <form onSubmit={handleSearch}>
      <label>Name:</label>
      <input type='text' name="name" onChange={handleInputChange} required />

      <label>Age:</label>
      <input type="number" name="age" onChange={handleInputChange} required />

      <button type="submit" >Search</button>
    </form>
  )
}


function SubmittedCard({name, age, batch, handleCloseClick}){
  return(
    <div>
      <p>Congratulations {name}({age}) ! You've successfully registered for this month's yoga classes.</p>
      <p>You have selected the batch of {batch}.</p>
      {/* <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Batch: {batch} </p> */}

      <button onClick={handleCloseClick}>X</button>
    </div>
  )
}


function ShowUserCard({handleCloseUser, name, age, batch}){
  return(
    <div>
      <p>Name-{name}</p>
      <p>Age-{age}</p>
      <p>batch-{batch}</p>
      <button onClick={handleCloseUser}>X</button>
    </div>
  )
}

export default App;


