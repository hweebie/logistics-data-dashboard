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

const OnTimeDeliveryChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "On-time deliveries by date",
      },
    },
  };

  //placeholder data. to be replaced with actual delivery count per date
  const dataArray = [
    {
      date: "2023-07-25",
      onTimeRate: 95,
    },
    {
      date: "2023-07-26",
      onTimeRate: 96,
    },
    {
      date: "2023-07-27",
      onTimeRate: 94,
    },
    {
      date: "2023-07-28",
      onTimeRate: 98,
    },
    {
      date: "2023-07-29",
      onTimeRate: 99,
    },
    {
      date: "2023-07-30",
      onTimeRate: 99.5,
    },
  ];
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
