import React, { useEffect, useRef, useState, useCallback } from 'react';
import { QrReader } from 'react-qr-reader';
import './QrScanner.css';
import { VscScreenFull } from 'react-icons/vsc';

const Scanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [is_scanned, setIs_scanned] = useState(true)

  const tableRef = useRef(null);

  const handleScan = useCallback(async (result) => {
    if (result?.text) {
      setScanResult(result.text);
      try {
        const token_no = result.text

        const response = await fetch("http://localhost:8000/api/v1/scan-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token_no, is_scanned }),
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);

        if (data.message === "Token not found or Expired, Try again!") {
          setScanResult("")
          return alert("Token Invalid")

        }

        if (data.message === "Your token is valid") {
          setScanResult("")
          return alert("Token Valid")

        }

        // if (Array.isArray(result)) {
        //   setTableData(result);
        // } else {
        //   console.error("Expected an array but got:", result);
        //   setTableData([]);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
        setScanResult("")
      }
    }
  }, []);

  // const handleError = useCallback((err) => {
  //   console.error("QR Scan Error:", err);
  // }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("msfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
      document.removeEventListener("msfullscreenchange", handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (tableRef.current.requestFullscreen) {
        tableRef.current.requestFullscreen();
      } else if (tableRef.current.mozRequestFullScreen) {
        tableRef.current.mozRequestFullScreen();
      } else if (tableRef.current.webkitRequestFullscreen) {
        tableRef.current.webkitRequestFullscreen();
      } else if (tableRef.current.msRequestFullscreen) {
        tableRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div>
      <div className="d-flex justify-content-end p-3">
        <div className="btn-group me-4" role="group">
          <button className="btn btn-outline-primary" onClick={toggleFullScreen}>
            <VscScreenFull className="icon" />
          </button>
        </div>
      </div>
      <div ref={tableRef} className="qr-scanner-container">
        <h2 style={{ color: isFullScreen ? "white" : "" }}>QR Code Scanner</h2>
        <div className="qr-reader" style={{ height: isFullScreen ? "50%" : "100%" }}>
          <QrReader
            onResult={(result, error) => {
              if (result) {
                handleScan(result);
                setIs_scanned(true)
              }
            }}
            style={{ width: '100%', }}
          />
          <div className="scanning-line"></div>
        </div>
        <p className="scan-result">
          {scanResult ? `Scanned Result: ${scanResult}` : 'Scan a QR code'}
        </p>
      </div>
    </div>
  );
};

export default Scanner;
