import React, { useState, useEffect } from "react";
import '../Dashboard/Dashboard.css'
import { Chart } from 'react-charts'
import MUIDataTable from 'mui-datatables';
import { Typography } from "@mui/material";
import ChartOne from '../charts/ChartOne';
import ChartThree from '../charts/ChartThree';
import ChartTwo from '../charts/ChartTwo';


const Dashboard = () => {
  const [tableData, setTableData] = useState([]);

  //#region Chart On Dashboard
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  //#endregion


  //#region Get Live Queue Token on Dashboard

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/getQueue", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        console.log(result);

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

    fetchList();

    const intervalId = setInterval(fetchList, 1000);

    return () => clearInterval(intervalId);
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

  //#endregion


  return (
    <div className="main_dashboard">
      <div className="Token">
        <div className="dashboard_token_no">
          <h4>Total Token</h4>
          <p>20</p>
        </div>
        <div className="dashboard_token_no">
          <h4>Pending Token</h4>
          <p>15</p>
        </div>
        <div className="dashboard_token_no">
          <h4>Complete Token</h4>
          <p>5</p>
        </div>
      </div>
      {/* <h1 className="text-center mt-5">Welcome To DashBoard</h1> */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <div className="chart_conainer">
          <ChartTwo />
          <ChartThree />
        </div>
      </div>
      <div className="table_section">
        <div>
          <div className={`mui-datatables  'fullscreen' `}>
            <MUIDataTable
              title={
                <Typography variant="h5" style={{ fontWeight: 'bold', color: "#2a2a2a", textAlign: "left" }}>
                  Live Queue
                </Typography>
              }
              data={tableData}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
