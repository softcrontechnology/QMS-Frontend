import React, { useState, useRef } from "react";
import '../../assets/css/GeneratToken.css'
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { useReactToPrint } from "react-to-print";
import Cookies from "js-cookie";

const GenerateToken = () => {
  const [Token, setToken] = useState({
    name: "",
    mobile: "",
    no_of_person: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);



  // const baseImage64 = receiptData.qr_b64;
  const Navigate = useNavigate()
  const pritRef = useRef();
  const handle_Print = useReactToPrint({
    content: () => pritRef.current,
  })
  

  const handle_token = (e) => {
    setToken({ ...Token, [e.target.name]: e.target.value });
  };

  //#region Function to format data
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  //#endregion

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

      setReceiptData(result)
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

  //#region Html for create_token

  const isAuthenticated = Cookies.get("token") !== undefined;

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <div>
    <div className="container">
      <div className="button-container">
        <button className="button">
          <Link className="link" to="/dashboard">Back</Link>
        </button>
        {/* <button className="button">Cancel</button>
        <button className="button">Reset Detail</button> */}
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
    <div className="modal">
      <Modal ref={pritRef} isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Receipt">
        <button onClick={closeModal}>Close</button>
        <div className="Print_button_receipt">
          <button className="btn_print" onClick={handle_Print} >Print</button>
        </div>
        <div className="pop_up" ref={pritRef}>
          <div>
            <h2>Softcron tecnology</h2>
          </div>
          {receiptData && (
            <div>
              <div className="detail_Token_receipt">
                <div className="head_date_token">
                  <p>Token_No: {receiptData.token_no}</p>
                  <p>Date: {formatDate(receiptData.created_datetime)}</p>
                </div>
                <div className="detail_of_users">
                  <p>Name:           {receiptData.name}</p>
                  <p>Mobile:         {receiptData.mobile}</p>
                  <p>No. of Person:  {receiptData.no_of_person}</p>
                  <p>Token ID:       {receiptData.token_id}</p>
                </div>
                {/* Display other receipt details here */}
                <div className="QR_Code">
                  <img src={receiptData && receiptData.qr_b64} alt="QRCode" />
                </div>
              </div>
            </div>

          )}
        </div>
      </Modal>
    </div>



  </div>
  //#endregion


};



export default GenerateToken;
