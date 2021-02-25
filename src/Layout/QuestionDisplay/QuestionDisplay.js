import React from 'react' 

import classes from './QuestionDisplay.module.css'

const QuestionDisplay = (props) => (
            <div className={classes.QuestionDisplay}>{props.children}</div>
        )

export default QuestionDisplay