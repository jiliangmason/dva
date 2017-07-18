import * as userService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null
  },

  reducers: {
    save(state, {payload: {data: list, total}}) {
      return {...state, list, total};
    },
  },

  effects: {
    *fetch({payload: {page}}, {put, call}) {
      const {data, headers} = yield call(userService.fetch, {page});
      yield put({type: 'save', payload: {data, total: headers['x-total-count']}})
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query})=>{
          if (pathname == '/users') {
            console.log('query', query);
            dispatch({type: 'fetch', payload: query})
          }
      })
    }
  }, //(location)=>{pathname, query}=location
};
