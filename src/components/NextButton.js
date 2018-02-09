import React from 'react';

function NextButton(props) {

  return (
    <div>
      <input
        type="button"
        name="Next"
        id='nextButton'
        value='Next'
        disabled={props.answer === -1}
        onClick={props.onAnswerSubmitted}
      />
    </div>
  );

}



export default NextButton;