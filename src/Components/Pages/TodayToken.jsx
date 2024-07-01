import React, { useEffect, useRef, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link, Navigate } from 'react-router-dom';
import { VscScreenFull } from 'react-icons/vsc';
import { Typography } from '@mui/material';
import Cookies from "js-cookie";

const ProductList = () => {
    const [tableData, setTableData] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const tableRef = useRef(null);

    

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/get-today-tokens", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const result = await response.json();
                console.log(result);

                if (Array.isArray(result)) {
                    setTableData(result);
                } else {
                    console.error("Expected an array but got:", result);
                    setTableData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setTableData([]);
            }
        };

        fetchList();

        const intervalId = setInterval(fetchList, 1000);

        return () => clearInterval(intervalId);
    }, []);

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

    const columns = [
        {
            name: "customer_name",
            label: "Name",
            options: {
                sort: true,
                filter: true,
                customHeadRender: ({ label }) => (
                    <th style={{ textAlign: 'left', paddingLeft: "15px" }}>
                        <strong>{label}</strong>
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue) => {
                    const customer = tableData[tableMeta.rowIndex];
                    return (
                        <div className="d-flex justify-content-start align-items-center product-name">
                            <div className="d-flex flex-column">
                                <h6 className="text-body text-left text-nowrap mb-0">{customer.customer_name}</h6>
                            </div>
                        </div>
                    );
                },
            }
        },
        {
            name: "customer_mobile",
            label: "Mobile",
            options: {
                sort: true,
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const customer = tableData[tableMeta.rowIndex];
                    return (
                        <h6 className="text-body text-nowrap mb-0">{customer.customer_mobile}</h6>
                    );
                },
            }
        },
        {
            name: "no_of_person",
            label: "No Of Person",
            options: {
                sort: true,
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const customer = tableData[tableMeta.rowIndex];
                    return (
                        <h6 className="text-body text-nowrap mb-0">{customer.no_of_person}</h6>
                    );
                },
            }
        },
        {
            name: "token_no",
            label: "Token Number",
            options: {
                sort: true,
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const customer = tableData[tableMeta.rowIndex];
                    return (
                        <h6 className="text-body text-nowrap mb-0">{customer.token_no}</h6>
                    );
                },
            }
        },
        {
            name: "qr_b64",
            label: "QR Code",
            options: {
                sort: false,
                filter: false,
                customHeadRender: ({ label }) => (
                    <th style={{ fontWeight: 'bold', textAlign: "center" }}>
                        {label}
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue) => {
                    const customer = tableData[tableMeta.rowIndex];
                    const base64Image = customer.qr_b64;
                    return (
                        <div className="text-center">
                            <img src={base64Image} alt="QR Code" style={{ width: 64, height: 64 }} />
                        </div>
                    );
                },
            }
        }
    ];


    const options = {
        selectableRows: 'none',
        search: true,
        sort: true,
        filter: true,
        responsive: 'standard', // Options are 'stacked', 'scrollFullHeight', 'scrollMaxHeight', 'standard'
    };

    const isAuthenticated = Cookies.get("token") !== undefined;

    console.log(isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <div className="d-flex justify-content-end p-3">
                <div className="btn-group me-4" role="group">
                    <button className="btn btn-outline-primary" onClick={toggleFullScreen}>
                        <VscScreenFull className="icon" />
                    </button>
                </div>
                <div>
                    <Link to="/generate-token">
                        <button className="btn btn-primary">Create New Token</button>
                    </Link>
                </div>
            </div>
            <div ref={tableRef} className={`mui-datatables ${isFullScreen ? 'fullscreen' : ''}`}>
                <MUIDataTable
                    title={
                        <Typography variant="h5" style={{ fontWeight: 'bold', color: "#2a2a2a", textAlign: "left" }}>
                            Today's All Tokens
                        </Typography>
                    }
                    data={tableData}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    );
};

export default ProductList;
