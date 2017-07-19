import * as userService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null
  },

  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {
        ...state,
        list,
        total,
        page};
    },
  },

  effects: {
    *fetch({payload: {page=1}}, {put, call}) {
      const {data, headers} = yield call(userService.fetch, {page}); //page默认1，还可以是2，3,4...total
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10), //以10为基数
          page: parseInt(page, 10)
        }
      })
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query})=>{  //listen(location)
          if (pathname == '/users') {
            console.log('query', query); //打印出来的query是一个对象query: {page, ng}
            dispatch({type: 'fetch', payload: query})
          }
      })
    }
  }, //(location)=>{pathname, query}=location
};
