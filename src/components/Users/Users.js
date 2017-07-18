import React from 'react';
//import styles from './Users.css';
import './Users.css';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm} from 'antd';
import * as UserContants from '../../contants/contants';

class UsersComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static deleteHandler(id) {
    console.warn(`TODO: ${id}`)
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="">{text}</a>
      },
      {
        title: 'Email',
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
          <span className="operation">
        <a href="">Edit</a>
        <Popconfirm title="confirm to delete?" onConfirm={this.deleteHandler.bind(this, id)}>
          <a href="">Delete</a>
        </Popconfirm>
      </span>
        )
      },
    ];

    const {list: dataSource, total, page: current} = this.props;
    return (
      <div className="normal">
        <div>
          <Table columns={columns} dataSource={dataSource} pagination={false} rowKey={record=>record.id}/>
          <Pagination className="ant-table-pagination" total={total} current={current} pageSize={UserContants.PAGE_SIZE}/>
        </div>
      </div>
    );
  }

}


function mapStateToProps(state) {
  const {list, total, page} = state;
  return {
    list,
    total,
    page
  };
}

export default connect(mapStateToProps)(UsersComponent);
