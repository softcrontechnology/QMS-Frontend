import React, { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import './QrScanner.css';
import { VscScreenFull } from 'react-icons/vsc';

const Scanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const tableRef = useRef(null);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

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

  setTimeout(() => {
    setScanResult("")
  }, 3000);

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
        <h2 style={{color: isFullScreen ? "white" : ""}}>QR Code Scanner</h2>
        <div className="qr-reader" style={{ height: isFullScreen ? "50%" : "100%" }}>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                handleScan(result);
              }
              if (!!error) {
                handleError(error);
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
