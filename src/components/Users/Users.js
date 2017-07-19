import React from 'react';
import styles from './Users.css';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm} from 'antd';
import * as UserContants from '../../contants/contants';

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
        render: (text, {id})=>(
          <span className={styles.operation}>
        <a href="">Edit</a>
        <Popconfirm title="confirm to delete?" onConfirm={this.deleteHandler.bind(this, id)}>
          <a href="">Delete</a>
        </Popconfirm>
      </span>
        )
      },
    ];
  }

  deleteHandler(id) {
    console.warn(`TODO: ${id}`)
  }

  pageChangerHandler(page) {
    console.log('now page', page);
    const {dispatch} = this.props;
    dispatch(routerRedux.push({
      pathname: '/users',
      query: {page, ng: 1} //query: {page: page} ng是随便写的一个属性，用来测试url最终的模样
    }))
  }

  render() {
    const {list: dataSource, total, page: current, loading} = this.props;
    return (
      <div className="normal">
        <div>
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
