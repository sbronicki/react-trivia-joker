import React from 'react' 

import classes from './QuestionDisplay.module.css'

const QuestionDisplay = (props) => (
            <div className={classes.QuestionDisplay}><p>{props.children}</p></div>
        )

export default QuestionDisplay