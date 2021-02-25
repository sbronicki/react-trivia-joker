import React from 'react'

import classes from './AnswerEvaluation.module.css'

const answerEvaluation = (props) => (
    
    props.Correct ? 
    <div className={[classes.AnswerEvaluation, 'Correct'].join(' ')}>
    Correct!
    </div> : 
    <div className={[classes.AnswerEvaluation, 'Incorrect'].join(' ')}>
    Incorrect!
    </div> 
)

export default answerEvaluation