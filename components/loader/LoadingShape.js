import React from 'react'
import styles from "./style.module.scss";
import { DotLoader } from 'react-spinners';

const LoadingShape = ({loading}) => {
  return (
    <div className={styles.loader}>
      <DotLoader color='#2f82ff' loading={loading} />
    </div>
  )
}

export default LoadingShape