import React, { Component } from 'react';
import axios from '../../axios/axios-quiz';
import styles from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswer: 2,
        id: 1,
        answers: [
          { text: 'Черный', id: 1 },
          { text: 'Красный', id: 2 },
          { text: 'Синий', id: 3 },
          { text: 'Зеленый', id: 4 },
        ],
      },
      {
        question: 'В каком году основали Санкт-Петербург?',
        rightAnswer: 3,
        id: 2,
        answers: [
          { text: '1700', id: 1 },
          { text: '1702', id: 2 },
          { text: '1703', id: 3 },
          { text: '1812', id: 4 },
        ],
      },
    ],

    loading: true,
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswer === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      this.setState({
        answerState: { [answerId]: 'success', results },
      });

      const timeOut = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            answerState: null,
            activeQuestion: this.state.activeQuestion + 1,
          });
        }

        window.clearTimeout(timeOut);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({ results, answerState: { [answerId]: 'error' } });
    }
  };

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

  async componentDidMount() {
    try {
      const id = window.location.pathname.replace('/quiz/', '');

      const response = await axios.get(`/quizes/${id}.json`);

      const quiz = response.data;

      this.setState({
        quiz,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div className={styles.quiz}>
        <div className={styles.quizWrapper}>
          <h1> Ответить на все вопросы</h1>
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Quiz;
