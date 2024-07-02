import React, { useState, useEffect } from "react";
import '../Dashboard/Dashboard.css';
import MUIDataTable from 'mui-datatables';
import { Typography } from "@mui/material";
import ChartOne from '../charts/ChartOne';
import ChartThree from '../charts/ChartThree';
import ChartTwo from '../charts/ChartTwo';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [thisWeekData, setThisWeekData] = useState([]);
  const [lastWeekData, setLastWeekData] = useState([]);
  const [TodayTokenList, setTodayTokenList] = useState([]);
  const [monthToken, setMonthToken] = useState([]);
  const [YearData, setYearData] = useState([]);
  const [report, setReport] = useState({
    TodayTokens: 0,
    TodayScannedTokens: 0,
    TodayWaitingTokens: 0
  });

  // Fetching functions
  const fetchQueueData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/getQueue", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      if (Array.isArray(result.message[0])) {
        setTableData(result.message[0]);
      } else {
        console.error("Expected an array but got:", result.message[0]);
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
    }
  };

  const fetchWeekReport = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/get-this-week-report", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      if (Array.isArray(result.message)) {
        setThisWeekData(result.message);
      } else {
        console.error("Expected an array but got:", result.message);
        setThisWeekData([]);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Try Again!");
    }
  };

  const fetchLastWeekReport = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/get-last-week-report", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      if (result) {
        setLastWeekData(result.message);
      } else {
        console.error("Expected an array but got:", result.message);
        setLastWeekData([]);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Try Again!");
    }
  };

  const fetchMonthReport = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/get-this-month-report", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      if (Array.isArray(result.message)) {
        setMonthToken(result.message);
      } else {
        console.error("Expected an array but got:", result.message);
        setMonthToken([]);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Try Again!");
    }
  };

  const fetchTodayReport = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/get-today-report", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      if (result.message.ResponseCode === 1) {
        setTodayTokenList(result.message);
        setReport({ TodayTokens: result.message.TodayTokens, TodayScannedTokens: result.message.TodayScannedTokens, TodayWaitingTokens: result.message.TodayWaitingTokens });
      } else {
        console.error("Expected an array but got:", result.message);
        setTodayTokenList([]);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Try Again!");
    }
  };

  const fetchYearReport = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/get-this-year-report", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      if (Array.isArray(result.message)) {
        setYearData(result.message);
      } else {
        console.error("Expected an array but got:", result.message);
        setYearData([]);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Try Again!");
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchQueueData();
    const intervalId = setInterval(fetchQueueData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchWeekReport();
  }, []);

  useEffect(() => {
    fetchLastWeekReport();
  }, []);

  useEffect(() => {
    fetchMonthReport();
  }, []);

  useEffect(() => {
    fetchTodayReport();
  }, []);

  useEffect(() => {
    fetchYearReport();
  }, []);

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
        customBodyRender: (value, tableMeta) => {
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
        customBodyRender: (value, tableMeta) => {
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
        customBodyRender: (value, tableMeta) => {
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
        customBodyRender: (value, tableMeta) => {
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
        customBodyRender: (value, tableMeta) => {
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

  return (
    <div className="main_dashboard">
      <div className="Token">
        <div className="dashboard_token_no total">
          <h4>Total Token</h4>
          <p>{report.TodayTokens}</p>
        </div>
        <div className="dashboard_token_no pending">
          <h4>Pending Token</h4>
          <p>{report.TodayWaitingTokens}</p>
        </div>
        <div className="dashboard_token_no complete">
          <h4>Complete Token</h4>
          <p>{report.TodayScannedTokens}</p>
        </div>
        <div className="dashboard_token_no waiting">
          <h4>Waiting Token</h4>
          <p>{report.TodayWaitingTokens}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne thisWeekData={thisWeekData} thisMonthData={monthToken} thisYearData={YearData} />
        <div className="chart_conainer">
          <ChartTwo thisWeekData={thisWeekData} lastWeekData={lastWeekData} />
          <ChartThree />
        </div>
      </div>
      <Link to="/display-queue">
        <div className="table_section">
          <div style={{ marginTop: "30px", width: "95%", marginLeft: "2%" }} className={`mui-datatables fullscreen`}>
            <MUIDataTable
              title={<Typography variant="h5" style={{ fontWeight: 'bold', color: "#2a2a2a", textAlign: "left" }}>Live Queue</Typography>}
              data={tableData}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </Link>
    </div>
  )
};

export default Dashboard;
