import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import '../charts/Chart.css'

const options= {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

// interface ChartTwoState {
//   series: {
//     name: string;
//     data: number[];
//   }[];
// }

const ChartTwo = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Sales',
        data: [44, 55, 41, 67, 22, 43, 65],
      },
      {
        name: 'Revenue',
        data: [13, 23, 20, 8, 13, 27, 15],
      },
    ],
  });
  
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  useEffect(() => {
    handleReset()
  
  }, [])
   

  return (
    <div className="Chart_main_2">
      <div className="chart_profit_main">
        <div>
          <h4 className="chart_profit">
            Profit this week
          </h4>
        </div>
        <div>
          <div className="chart_det">
            <select
              name="#"
              id="#"
              className="Chart_two_detailed"
            >
              <option value="" className='dark:bg-boxdark'>This Week</option>
              <option value="" className='dark:bg-boxdark'>Last Week</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="main_chart">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
