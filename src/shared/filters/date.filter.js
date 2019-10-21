import moment from 'moment';
import Constants from '../constants';

export default date => {
    return moment(date).format(Constants.DateFormat);
};