import React from 'react'

import classes from './AnswerEvaluation.module.css'

const answerEvaluation = (props) => (
    props.Correct ? 
    <div className={[classes.AnswerEvaluation, 'Correct'].join(' ')}>
    <strong>Correct!</strong>
    </div> : 
    <div className={[classes.AnswerEvaluation, 'Incorrect'].join(' ')}>
    <strong>Incorrect!</strong>
    </div> 
)

export default answerEvaluation