/**
 * Created by Administrator on 2017/7/19 0019.
 */
import React from 'react';
import styles from './MainLayout.css';
import Header from './Header';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {location, children} = this.props;
    return (<div className={styles.normal}>
            <Header location={location} />
            <div className={styles.content}>
              <div className={styles.main}>
                {children}
              </div>
            </div>
          </div>)
  }

}
