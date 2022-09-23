import React from "react";
import styles from './NotFound.module.scss'

console.log(styles)

const NotFound = () => {

    return (
        
        <h1 className={styles.root}>
            <span>Упс =(</span>
            <br/>
            Інформацію не знайдено
        </h1>
       
    )
}

export default NotFound