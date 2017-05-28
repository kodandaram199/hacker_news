/**
 * Created by kodanda_rama on 5/26/17.
 */
import moment from 'moment';

export const getHours = (seconds) => moment(seconds * 1000).fromNow();

export const getFormattedName = (name) => {
  return name.charAt(0).toUpperCase()+name.slice(1);
};