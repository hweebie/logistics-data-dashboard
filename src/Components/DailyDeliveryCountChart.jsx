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
  };

  // Step 1: Use reduce to create an object with date counts
  const dateCounts = props.tripsData.reduce((acc, record) => {
    const { actualDeliveryDate } = record;
    acc[actualDeliveryDate] = (acc[actualDeliveryDate] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Convert the object to an array of objects with date and count
  let dataArray = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));

  //Sort by date in ascending order
  dataArray = dataArray.sort((recordA, recordB) => {
    const dateA = new Date(recordA.date);
    const dateB = new Date(recordB.date);
    return dateA - dateB;
  });

  const data = {
    labels: dataArray.map((row) => row.date),
    datasets: [
      {
        label: "Count of trips",
        data: dataArray.map((row) => row.count),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default DailyDeliveryCountChart;
