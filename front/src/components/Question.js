import imageArrow from '../images/arrow-down.svg';
import React from "react";
function Question(props) {
    const [isAnswerOpen, setIsAnswerOpen] = React.useState(false);
    function onClickQuestion() {
        setIsAnswerOpen(!isAnswerOpen);
    }

    return (
        <div className='question'>
        <div className="question-block">
          <p className="question-text">{props.questionText}</p>
          <button className="button-dropdown" onClick={onClickQuestion}>
                <img 
                    alt='Иконка кнопки'
                    src={imageArrow}
                    className="button-image"
                />
            </button>
        </div>
        <p className={`${isAnswerOpen ? 'answer' : 'answer_hidden'}`}>{props.answer}</p>
      </div>
    )
} 
 export default Question;