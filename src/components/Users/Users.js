import React from 'react';
import styles from './Users.css';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button} from 'antd';
import * as UserContants from '../../contants/contants';
import UserEditModal from '../Modal/UserModal';

class UsersComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="">{text}</a>
      },
      {
        title: 'EmailGG',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website'
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record)=>(
          <span className={styles.operation}>
            <UserEditModal record={record} onOk={this.editHandler.bind(this, record.id)}>
              <a href=":;">Edit</a>
            </UserEditModal>
            <Popconfirm title="confirm to delete?" onConfirm={this.deleteHandler.bind(this, record.id)}>
              <a href="">Delete</a>
            </Popconfirm>
          </span>
        )
      },
    ];
  }  //render函数的参数：当前行的值，当前行的数据，当前行索引

  /*
   * users/remove: users是models的namespace，而remove是effect的名字，表示调用*remove() {...}
   * */
  deleteHandler(id) {
    const {dispatch} = this.props;
    console.warn(`TODO: ${id}`);
    dispatch({
      type: 'users/remove',
      payload: id
    });
  }

  pageChangerHandler(page) {
    const {dispatch} = this.props;
    dispatch(routerRedux.push({
      pathname: '/users',
      query: {page} //query: {page: page} ng是随便写的一个属性，用来测试url最终的模样:/users?ng=1&page=3
    }))
  }

  /*
  * id来自本组件，values来自子组件，混合赋值
  * */
  editHandler(id, values) {
    const {dispatch} = this.props;
    console.log(id, values);
    dispatch({
      type: 'users/patch',
      payload: {
        id,
        values
      }
    })
  }

  createHandler(values) {
    const {dispatch} = this.props;
    dispatch({
      type: 'users/create',
      payload: values  //用户表单提交过来的数据
    })
  }

  render() {
    const {list: dataSource, total, page: current, loading} = this.props;
    return (
      <div className="normal">
        <div>
          <div className={styles.create}>
            <UserEditModal record={{}} onOk={this.createHandler.bind(this)}>
              <Button type="primary">Create User</Button>
            </UserEditModal>
          </div>
          <Table columns={this.columns} dataSource={dataSource} pagination={false}
                 rowKey={record=>record.id} loading={loading}/>
          <Pagination className="ant-table-pagination" total={total} current={current}
                      pageSize={UserContants.PAGE_SIZE} onChange={this.pageChangerHandler.bind(this)}/>
        </div>
      </div>
    );
  }

}


function mapStateToProps(state) {
  const {list, total, page} = state.users;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users
  };
}

export default connect(mapStateToProps)(UsersComponent);
