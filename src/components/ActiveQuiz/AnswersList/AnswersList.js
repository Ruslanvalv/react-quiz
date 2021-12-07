import React from 'react';
import styles from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';
const AnswersList = (props) => (
  <ul className={styles.AnswersList}>
    {props.answer.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          state={props.state ? props.state[answer.id] : null}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
        />
      );
    })}
  </ul>
);

export default AnswersList;
