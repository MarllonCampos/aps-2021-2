import React from 'react'
import styles from '../../styles/Card.module.css'

interface IProps {
  title: string
  value: string | number
}
export function Card(props: IProps){
  return (

    <div className={styles.container}>
      <p className={styles.title}>{props.title}:</p>

      <span className={styles.value}>{props.value}</span>
    </div> 

  )
}