import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizById, quizAnswerClick } from '../../store/actions/quiz';
class Quiz extends Component {
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  componentDidMount() {
    const id = window.location.pathname.replace('/quiz/', '');

    this.props.fetchQuizById(id);
  }
  render() {
    return (
      <div className={styles.quiz}>
        <div className={styles.quizWrapper}>
          <h1> Ответить на все вопросы</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,

    loading: state.quiz.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerid) => dispatch(quizAnswerClick(answerid)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
