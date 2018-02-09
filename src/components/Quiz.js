import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import NextButton from '../components/NextButton';
import PropTypes from 'prop-types'


function Quiz(props) {

  function renderAnswerOptions(key,index) {
    return (
      <AnswerOption
        key={key}
        answerContent={key}
        answerType={index}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    
      <div className="questionOptions" key={props.questionId}>
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
        <Question content={props.question} />
        <div className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </div>
        <div>
        <br/>
        <NextButton answer={props.answer} 
         onAnswerSubmitted={props.onAnswerSubmitted}
        />
        </div>
      </div>
    
  );
}

Quiz.propTypes = {
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;