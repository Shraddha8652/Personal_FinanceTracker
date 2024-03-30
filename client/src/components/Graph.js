import React from "react";
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line } from "react-chartjs-2"
import styled from 'styled-components'
import { dateFormat } from "../style/details";
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)
const Graph = ({ allTransaction }) => {
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const data = {
    labels: totalIncomeTransactions.map((inc) => {
      const { date } = inc
      return dateFormat(date)
    }),
    datasets: [
      {
        label: 'Income',
        data: [
          ...totalIncomeTransactions.map((income) => {
            const { amount } = income
            return amount
          })
        ],
        backgroundColor: 'green',
        tension: .2
      },
      {
        label: 'Expense',
        data: [
          ...totalExpenseTransactions.map((expense) => {
            const { amount } = expense
            return amount
          })
        ],
        backgroundColor: 'red',
        tension: .2
      }
    ]
  }
  return (
    <div className="row m-4">
      
    <ChartStyled >
      <Line data={data} />
    </ChartStyled>
    </div>
  )
}

const ChartStyled = styled.div`
   background: #FCF6F9;
   border: 2px solid #FFFFFF;
   box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
   padding: 1rem;
   border-radius: 20px;
   height: 500px;
   display: flex;
   justify-content: center; /* Center horizontally */
   align-items: center; /* Center vertically */
   `;

export default Graph;