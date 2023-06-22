import React from 'react';
import styles from './ename.css';

export default function ({ match }: { match: any }) {
  //    isExact: true
  //    params:
  //        ename: "123"
  //    path: "/herodetail/:ename"
  //    url: "/herodetail/123"
  console.log(match);
  return (
    <div className={styles.normal}>
      <h1>{`herodetail Page ${match.params.ename}`}</h1>
    </div>
  );
}
