import moment from 'moment';

export const formattedDate = (date, format = 'DD-MMM-yyyy') => {
    return moment(date).format(format);
  };