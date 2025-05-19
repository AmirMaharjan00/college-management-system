import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import { useDate } from './hooks'

export const TodaysDate = () => {
    const { getDate, getTime } = useDate()
    
    return <div className='today-date'>
        <span className='today date'>
            <FontAwesomeIcon icon={ faCalendarDays } />
            <span>{ getDate() }</span>
        </span>
        <span className='today time'>
            <FontAwesomeIcon icon={ faClock } />
            <span>{ getTime() }</span>
        </span>
    </div>
}