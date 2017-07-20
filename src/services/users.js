/**
 * Created by Administrator on 2017/7/17 0017.
 */
import request from '../utils/request';
import {PAGE_SIZE} from '../contants/contants';
//request中的命名并没有规定

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
  return request(`/api/users/${id}`, {method: 'DELETE'});
}

export function patch(value, id) {
  return request(`/api/users/${id}`, {method: 'PATCH', body: JSON.stringify(value)});
}

export function create(values) {
  return request(`/api/users`, {method: 'POST', body: JSON.stringify(values)});
}
