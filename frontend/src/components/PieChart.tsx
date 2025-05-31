import { CATEGORY_STYLES } from "@/constants/constant";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ transactionData }: { transactionData: any }) {
  console.log("this is transactionData", transactionData);
  // const { data, loading, error } = useQuery(GET_ALL_TRANSACTION);
  const data = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          transactionData.transactions
            .filter((t: any) => t.category === 'SAVING')
            .reduce((sum: number, t: any) => sum + t.amount, 0),
          transactionData.transactions
            .filter((t: any) => t.category === 'EXPENSE')
            .reduce((sum: number, t: any) => sum + t.amount, 0),
          transactionData.transactions
            .filter((t: any) => t.category === 'INVESTMENT')
            .reduce((sum: number, t: any) => sum + t.amount, 0),
        ],
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
    <div className=" self-top w-1/3  flex justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default PieChart;
