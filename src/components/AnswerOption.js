import React from 'react';
import PropTypes from 'prop-types'
function AnswerOption(props) {

  return (
    <div className="radio">
    <label>
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        id={props.answerType}
        value={props.answerType}
        onChange={props.onAnswerSelected}
      />
      </label>
      <label className="radioCustomLabel" htmlFor={props.answerType}>
        {props.answerContent}
      </label>
    </div>
  );

}

AnswerOption.propTypes = {
  answerType: PropTypes.number.isRequired,
  answerContent: PropTypes.string.isRequired
};

export default AnswerOption;