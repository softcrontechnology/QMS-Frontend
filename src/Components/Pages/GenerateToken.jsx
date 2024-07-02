import React, { useState, useRef } from "react";
import '../../assets/css/GeneratToken.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { useReactToPrint } from "react-to-print";
import Cookies from "js-cookie";

const GenerateToken = () => {
  const [Token, setToken] = useState({
    name: "",
    mobile: "",
    no_of_person: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [cancelTokenNo, setCancelTokenNo] = useState("");

  const navigate = useNavigate();
  const printRef = useRef();
  const handle_Print = useReactToPrint({
    content: () => printRef.current,
  });

  const handle_token = (e) => {
    setToken({ ...Token, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handle_CreateToken = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Token),
        credentials: "include",
      });
      const result = await response.json();

      setReceiptData(result);

      if (result.message === "Mobile is required") {
        alert("Mobile is required");
        return;
      }

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
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReceiptData(null);
    navigate(''); // Navigate to a different route if needed
  };

  const handle_CancelToken = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/cancel-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token_no: cancelTokenNo }),
        credentials: "include",
      });
      const result = await response.json();

      if (result.message === "Token not found") {
        alert("Token not found");
        return;
      }

      alert("Token cancelled successfully");
      setIsCancelModalOpen(false);
      setCancelTokenNo("");
    } catch (error) {
      console.error("Error cancelling token:", error);
    }
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setCancelTokenNo("");
  };

  const isAuthenticated = Cookies.get("token") !== undefined;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className="container">
        <div className="button-container">
          <button className="button">
            <Link className="link" to="/dashboard">Back</Link>
          </button>
          <button className="button" onClick={() => setIsCancelModalOpen(true)}>Cancel</button>
        </div>
        <h1>Softcron Technology</h1>
        <div className="input-container">
          <input type="text" name="name" value={Token.name} onChange={handle_token} placeholder="Name" />
          <p className="mobile_req">*</p>
          <input type="text" name="mobile" value={Token.mobile} onChange={handle_token} placeholder="Mobile Number" />
        </div>
        <div className="input-container">
          <input type="text" name="no_of_person" value={Token.no_of_person} onChange={handle_token} placeholder="No. of person" />
        </div>
        <div>
          <button className="button1" onClick={(e) => handle_CreateToken(e)}>Generate Token</button>
        </div>
      </div>
      <div className="modal">
        <Modal ref={printRef} isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Receipt">
          <button onClick={closeModal}>Close</button>
          <div className="Print_button_receipt">
            <button className="btn_print" onClick={handle_Print}>Print</button>
          </div>
          <div className="pop_up" ref={printRef}>
            <div>
              <h2>Softcron Technology</h2>
            </div>
            {receiptData && (
              <div>
                <div className="detail_Token_receipt">
                  <div className="head_date_token">
                    <p>Token_No: {receiptData.token_no}</p>
                    <p>Date: {formatDate(receiptData.created_datetime)}</p>
                  </div>
                  <div className="detail_of_users">
                    <p>Name: {receiptData.name}</p>
                    <p>Mobile: {receiptData.mobile}</p>
                    <p>No. of Person: {receiptData.no_of_person}</p>
                    <p>Token ID: {receiptData.token_id}</p>
                  </div>
                  <div className="QR_Code">
                    <img src={receiptData.qr_b64} alt="QRCode" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
      <div className="modal">
        <Modal isOpen={isCancelModalOpen} onRequestClose={closeCancelModal} contentLabel="Cancel Token">
          <button onClick={closeCancelModal}>Close</button>
          <form onSubmit={handle_CancelToken}>
            <h2>Cancel Token</h2>
            <div className="input-container">
              <input
                type="text"
                name="cancel_token_no"
                value={cancelTokenNo}
                onChange={(e) => setCancelTokenNo(e.target.value)}
                placeholder="Token Number"
              />
            </div>
            <div>
              <button className="button1" type="submit">Cancel Token</button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default GenerateToken;
