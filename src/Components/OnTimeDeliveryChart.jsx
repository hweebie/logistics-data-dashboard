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

//chart options
const OnTimeDeliveryChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "On-time deliveries by requested delivery date",
      },
    },
  };

  //Calculate % on time deliveries by requested delivery date
  //Step 1: Use reduce to create an object with total and true counts per date
  const countsByDate = props.tripsData.reduce((acc, record) => {
    const { deliveryDate, isOnTime } = record;
    acc[deliveryDate] = acc[deliveryDate] || { total: 0, trueCount: 0 };
    acc[deliveryDate].total += 1;
    if (isOnTime === true) {
      acc[deliveryDate].trueCount += 1;
    }
    return acc;
  }, {});

  // Step 2: Convert the object to an array of objects with date and % true
  let dataArray = Object.entries(countsByDate).map(([date, counts]) => ({
    date,
    onTimeRate: (counts.trueCount / counts.total) * 100,
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
        label: "On-time delivery % ",
        data: dataArray.map((row) => row.onTimeRate),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default OnTimeDeliveryChart;
