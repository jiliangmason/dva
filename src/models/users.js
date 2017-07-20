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
  },  //一个action：{type: 'save'}会被reducers接受

  effects: {
    *fetch({payload: {page=1}}, {put, call}) {
      const {data, headers} = yield call(userService.fetch, {page}); //page默认1，还可以是2，3,4...total
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10), //总页数
          page: parseInt(page, 10) //当前页
        }
      })
    },

    *remove({payload: id}, {call, put, select}) {
      yield call(userService.remove, id);
      yield put({
        type: 'reload'
      })
    },

    *patch({payload: {values, id}}, {call, put, select}) {
      yield call(userService.patch, values, id);  //注意这里传参的先后顺序
      yield put({
        type: 'reload'
      })
    }, //编辑数据，其他文件中dispatch(type: 'users/patch', payload)就会调用这里的patch

    *create({payload: {values}}, {call, put}) {
      yield call(userService.create, values);
      yield put({
        type: 'reload'
      })
    },

    *reload(action, {put, select}) {
       const page = yield select(state=>state.users.page);
       yield put({
         type: 'fetch',
         payload: {
           page
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
