import { useState, useEffect, useMemo, useContext } from 'react'
import { ourFetch, fetchCallback } from './functions';
import { Line, Doughnut } from 'react-chartjs-2';
import { GLOBALCONTEXT } from '../App';
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
    const Global = useContext( GLOBALCONTEXT ),
        { formSuccess } = Global,
        { api, label, title } = props,
        [ monthlyFines, setMonthlyFines ] = useState([]),
        months = monthlyFines.reduce(( value, fine ) => {
            let { month, total } = fine
            value = { ...value, [ month ]: total }
            return value;
        }, {}),
        labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        // labels = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    useEffect(() => {
        ourFetch({
            api,
            callback: fetchCallback,
            setter: setMonthlyFines
        })
    }, [ formSuccess ])

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
        maintainAspectRatio: false, // ignore default aspect ratio
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
    const Global = useContext( GLOBALCONTEXT ),
        { formSuccess } = Global,
        { api, label, title } = props,
        [ students, setStudents ] = useState([]),
        studentsData = useMemo(() => {
            return Object.values( students ).map( item => item )
        }, [ students ])

    useEffect(() => {
        ourFetch({
            api,
            callback: fetchCallback,
            setter: setStudents
        })
    }, [ formSuccess ])

    const data = {
        labels: [ 'paidFull', 'unpaid' ],
        datasets: [
            {
                label: 'Students',
                data: studentsData,
                backgroundColor: [ '#36a2eb', '#ffce56' ],
                borderWidth: 1,
            },
        ],
        label
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // ignore default aspect ratio
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