import { useState, useEffect } from 'react'
import { ourFetch, fetchCallback } from './functions';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * MARK: Line Chart
 */
export const LineChart = ( props ) => {
    const { api, label, title } = props,
        [ monthlyFines, setMonthlyFines ] = useState([]),
        months = monthlyFines.reduce(( value, fine ) => {
            let { month, totalFines } = fine
            value = { ...value, [ month ]: totalFines }
            return value;
        }, {}),
        // labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        labels = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    useEffect(() => {
        ourFetch({
            api,
            callback: fetchCallback,
            setter: setMonthlyFines
        })
    }, [])

    const data = {
        labels,
        datasets: [{
            label,
            data: labels.map(( month ) => {
                if( month in months ) {
                    return months[ month ]
                } else {
                    return 0
                }
            }),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
            tension: 0.3,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: title
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
        },
    };

    return <div className="cmg-line-chart cmg-chart card">
        <Line data={data} options={options} />
    </div>
};

/**
 * MARK: PIE CHART
 */
export const DoughnutChart = ( props ) => {
    const { api, label, title } = props
    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'Votes',
                data: [12, 19, 7],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                borderWidth: 1,
            },
        ],
        label
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: {
                display: true,
                text: title
            },
        },
    };

    return <div className="cmg-doughnut-chart cmg-chart card">
        <Doughnut data={data} options={options} />
    </div>
}