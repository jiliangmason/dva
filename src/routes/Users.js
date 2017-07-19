import React from 'react';
import {connect} from 'dva';
import UsersComponent from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Users.css';

class Users extends React.Component {

  render() {
    const {location} = this.props;
    return (
      <MainLayout location={location}>
        <div className={styles.normal}>
          <UsersComponent />
        </div>
      </MainLayout>
    );
  }

}

export default connect()(Users);
