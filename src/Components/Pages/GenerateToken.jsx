import React from "react";
import '../../assets/css/GeneratToken.css'

const GenerateToken = () => {
  return<div>
  <div className="container">
  <div className="button-container">
      <button className="button">Back</button>
      <button className="button">Cancel</button>
      <button className="button">Reset Detail</button>
    </div>
    <h1>Softcron Tecnology</h1>
    <div className="input-container">
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Mobile Number" />
    </div>
    <div className="input-container">
      <input type="text" placeholder="Email" />
    </div>
    <div className="input-container">
      <input type="text" placeholder="Address" />
    </div>
    <div className="input-container">
      <input type="text" placeholder="To whom (Dropdown)" />
    </div>
    <div className="input-container">
      <input type="text" placeholder="Counter no." />
    </div>
    <div className="input-container">
      <input type="text" placeholder="No. of person" />
    </div>
    <div className="input-container">
      <input type="text" placeholder="Purpose" />
    </div>
    <div>
    <button className="button1">Generate Token</button>
    </div>
   
  </div>
  {/* <div className="image-container">
    <p>Images Of Companies</p>
  </div> */}
</div>
};

export default GenerateToken;
