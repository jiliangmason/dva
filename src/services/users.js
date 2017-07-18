/**
 * Created by Administrator on 2017/7/17 0017.
 */
import request from '../utils/request';
import {PAGE_SIZE} from '../contants/contants';

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
