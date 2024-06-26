import React, { useState } from "react";
import '../../assets/css/GeneratToken.css'
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';

const GenerateToken = () => {
  const [Token, setToken] = useState({
    name: "",
    mobile: "",
    no_of_person: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const Navigate = useNavigate()

  const handle_token = (e) => {
    setToken({ ...Token, [e.target.name]: e.target.value });
  };

  //#region Generate Token 
  const handle_CreateToken = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Token),
        credentials: "include"
      });
      const result = await response.json();

      console.log(result);

      if (result.message === "Mobile is required") {
        alert("Mobile is required")
        return
      }

      console.log(result);
      // Reset the Token state or any other form fields here

      // alert("Token generated successfully");
      // Save result if needed (assuming result.save() is a valid method
      setToken({
        name: "",
        mobile: "",
        no_of_person: "",
      });
      if (result.save) {
        result.save();
      }
      if (result.message === "Check your Mobile no") {
        alert("Please check Mobile no");
        return;
      }
      setIsModalOpen(true);
      // Navigate to a different route
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };
  //#endregion

  //#region Pop-up modalclose
  const closeModal = () => {
    setIsModalOpen(false);
    setReceiptData(null);
    Navigate(''); // Navigate to a different route if needed
  };
  //#endregion




  return <div>
    <div className="container">
      <div className="button-container">
        <button className="button">
          <Link className="link" to="/dashboard">Back</Link>
        </button>
        <button className="button">Cancel</button>
        <button className="button">Reset Detail</button>
      </div>
      <h1>Softcron Tecnology</h1>
      <div className="input-container">
        <input type="text" name="name" value={Token.name} onChange={handle_token} placeholder="Name" />
        <p className="mobile_req">*</p>
        <input type="text" name="mobile" value={Token.mobile} onChange={handle_token} placeholder="Mobile Number" />
      </div>
      <div className="input-container">
        <input type="text" name="no_of_person" value={Token.no_of_person} onChange={handle_token} placeholder="No. of person" />
      </div>
      {/* <div className="input-container">
      <input type="text"  onChange={handle_token} placeholder="Email" />
    </div> */}
      {/* <div className="input-container">
      <input type="text" onChange={handle_token} placeholder="Address" />
    </div> */}
      {/* <div className="input-container">
      <input type="text" onChange={handle_token} placeholder="To whom (Dropdown)" />
    </div> */}
      {/* <div className="input-container">
      <input type="text" onChange={handle_token} placeholder="Counter no." />
    </div> */}
      {/* <div className="input-container">
      <input type="text" onChange={handle_token} placeholder="Purpose" />
    </div> */}
      <div>
        <button className="button1" onClick={(e) => handle_CreateToken(e)}>Generate Token</button>
      </div>

    </div>
    {/* <div className="image-container">
    <p>Images Of Companies</p>
  </div> */}
  //#region Modal for Receipt
   <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Receipt">
        <h2>Softcron tecnology</h2>
        {receiptData && (
          <div>
            <p>Name: {receiptData.name}</p>
            <p>Mobile: {receiptData.mobile}</p>
            <p>No. of Person: {receiptData.no_of_person}</p>
            <p>Token ID: {receiptData.token_id}</p>
            {/* Display other receipt details here */}
            <div className="QR_Code">

            </div>
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
      //#endregion


  </div>
};

export default GenerateToken;
