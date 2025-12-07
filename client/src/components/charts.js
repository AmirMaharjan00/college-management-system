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
        { api, label, title, short = false, useApi = true, _thisData = [] } = props,
        [ monthlyFines, setMonthlyFines ] = useState([]),
        months = monthlyFines.reduce(( value, fine ) => {
            let { month, total } = fine
            value = { ...value, [ month ]: total }
            return value;
        }, {}),
        fullMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        shortMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        labels = short ? shortMonths : fullMonths

    useEffect(() => {
        if( useApi ) {
            ourFetch({
                api,
                callback: fetchCallback,
                setter: setMonthlyFines
            })
        }
    }, [ formSuccess ])

    const data = {
        labels,
        datasets: [{
            label,
            data: _thisData.length > 0 ? _thisData : labels.map(( month ) => {
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
            legend: { position: 'top', display: false },
            // title: {
            //     display: true,
            //     text: title
            // },
            tooltip: {
                callbacks: {
                    // Format tooltip value as '2k' or '2.5k'
                    label: function (context) {
                        const v = context.parsed.y ?? 0;
                        // Show integer if divisible by 1000, otherwise one decimal (e.g. 2.5k)
                        if (v % 1000 === 0) return `${context.dataset.label}: ${v / 1000}k`;
                        return `${context.dataset.label}: ${+(v / 1000).toFixed(1)}k`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                // Force ticks at every 1000 so you'll see 0, 1k, 2k, 3k...
                ticks: {
                    stepSize: 1000,
                    callback: function (value) {
                        // value is the tick number
                        if (Number(value) === 0) return '0';
                        // leave as integer thousands (2k) or decimal (2.5k) if needed
                        return `${Number(value) / 1000}k`;
                    },
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