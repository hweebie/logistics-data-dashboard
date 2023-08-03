import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailyDeliveryCountChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total actual deliveries per day",
      },
    },
    scales: {
      y: {
        ticks: {
          suggestedMin: 0,
          stepSize: 1, //set tick interval on y-axis as 1
        },
      },
      x: {
        ticks: {
          stepSize: 1, //set tick interval on x-axis as 1
        },
      },
    },
  };

  //Calculate daily delivery count by actual delivery date
  //use reduce to create an object with date counts
  const dateCounts = props.tripsData.reduce((acc, record) => {
    const { actualDeliveryDate } = record;
    acc[actualDeliveryDate] = (acc[actualDeliveryDate] || 0) + 1;
    return acc;
  }, {});

  //convert the object to an array of objects with date and count
  let dataArray = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));

  //sort by date in ascending order
  dataArray = dataArray.sort((recordA, recordB) => {
    const dateA = new Date(recordA.date);
    const dateB = new Date(recordB.date);
    return dateA - dateB;
  });

  //adjust array to show 5 most recent dates
  const numDatesToShow = 7;
  const startIndex = Math.max(0, dataArray.length - numDatesToShow);
  const recentDataArray = dataArray.slice(startIndex);

  const data = {
    labels: recentDataArray.map((row) => row.date),
    datasets: [
      {
        label: "Count of trips",
        data: recentDataArray.map((row) => row.count),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default DailyDeliveryCountChart;
