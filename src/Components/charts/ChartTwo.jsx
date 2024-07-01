import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import '../charts/Chart.css';

const options = {
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

const ChartTwo = ({ thisWeekData, lastWeekData }) => {
  const [selectedOption, setSelectedOption] = useState("thisWeek");
  const [series, setSeries] = useState([
    {
      name: 'Generated',
      data: [],
    },
    {
      name: 'Used',
      data: [],
    },
  ]);

  useEffect(() => {
    let updatedSeries;
    if (selectedOption === "thisWeek") {
      if (thisWeekData) {
        updatedSeries = series.map((serie) => {
          if (serie.name === 'Generated') {
            return { ...serie, data: thisWeekData.map(item => item.today_tokens_count) };
          }
          if (serie.name === 'Used') {
            return { ...serie, data: thisWeekData.map(item => item.today_expired_tokens) };
          }
          return serie;
        });
      }
    } else if (selectedOption === "lastWeek") {
      if (lastWeekData) {
        updatedSeries = series.map((serie) => {
          if (serie.name === 'Generated') {
            return { ...serie, data: lastWeekData.map(item => item.today_tokens_count) };
          }
          if (serie.name === 'Used') {
            return { ...serie, data: lastWeekData.map(item => item.today_expired_tokens) };
          }
          return serie;
        });
      }
    }
    setSeries(updatedSeries);
  }, [thisWeekData, lastWeekData, selectedOption]);

  const handleChanges = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="Chart_main_2">
      <div className="chart_profit_main">
        <div>
          <h4 className="chart_profit">Profit this week</h4>
        </div>
        <div>
          <div className="chart_det">
            <select
              name="timeframe"
              id="timeframe"
              className="Chart_two_detailed"
              onChange={handleChanges}
              value={selectedOption}
            >
              <option value="thisWeek" className="dark:bg-boxdark">This Week</option>
              <option value="lastWeek" className="dark:bg-boxdark">Last Week</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="main_chart">
          <ReactApexChart options={options} series={series} type="bar" height={250} />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
