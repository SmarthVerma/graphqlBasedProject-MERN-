import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CATEGORY_STYLES } from "@/constants/constant";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const data = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        borderWidth: 1,
        spacing: 5,
        cutout: 100,
        borderRadius: 24,
        backgroundColor: [
          CATEGORY_STYLES.SAVING.backgroundColor,
          CATEGORY_STYLES.EXPENSE.backgroundColor,
          CATEGORY_STYLES.INVESTMENT.backgroundColor,
        ],
        hoverOffset: 3,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          padding: 10, // Add padding between labels and chart
        },
      },
    },
  };
  return (
    <div className=" self-top  flex justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default PieChart;
