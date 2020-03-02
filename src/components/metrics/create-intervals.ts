import moment from 'moment';
import { TimeMode } from '../../shared/types';

const createIntervals = (_start: string, _end: string, _interval: TimeMode) => {
    const start = moment(_start, 'YYYY-MM-DD hh:mm a');
    const end = moment(_end, 'YYYY-MM-DD hh:mm a');
    
    if (_interval === 'minute') {
        // one minute intervals
        start.minutes(Math.ceil(start.minutes() / 1) * 1);
    } else if (_interval === 'hour') {
        // one hour intervals
        start.hours(Math.ceil(start.hours() / 1) * 1);
    } else if (_interval === 'day') {
        // one day intervals
        start.days(Math.ceil(start.days() / 1) * 1);
    }

    const result = [];

    const current = moment(start);

    while (current <= end) {
        if (_interval === 'minute') {
            result.push(current.format('HH:mm'));
            current.add(1, 'minutes');
        } else if (_interval === 'hour') {
            result.push(current.format('HH:mm'));
            current.add(1, 'hours');
        } else if (_interval === 'day') {
            result.push(current.format('DD-MM-YYYY'));
            current.add(1, 'days');
        }
    }

    return result;
}

export default createIntervals