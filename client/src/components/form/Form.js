import React, { useEffect, useState } from "react";
import './Form.css'
import Data from '../data/Data'
const Form = () => {
  const [data,setData]=useState({})  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const handleSubmit=(e)=>{
    fetch(" http://localhost:3001/add", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
  }
  return (
    <>
      <form >
        <div className="flat">
          <label>Flat No:</label>
              
          <input type="number" name="flatNo" value={data.flatNo} placeholder="Enter Flat No" onChange={handleChange} required/>
        </div>
        <p>MemberList</p>
        <div className="members">
          <input type="text" name="fName" value={data.fName} placeholder="First Name" onChange={handleChange} required/>
          <input type="text" name="lName" value={data.lName} placeholder="Last Name" onChange={handleChange} required/>
          <input type="number" name="mobileNo" value={data.mobileNo} placeholder="Phone Number" onChange={handleChange} required/>
          <input type="submit" value="+" onClick={handleSubmit}/>
        </div>
      </form>
      <Data />
      <button onClick={handleSubmit}>Submit</button>

    </>
  );
};

export default Form;
