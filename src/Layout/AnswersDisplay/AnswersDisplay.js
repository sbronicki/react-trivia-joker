import React from 'react'

import classes from './AnswersDisplay.module.css'

const answersDisplay = (props) => (
            <div className={classes.AnswersDisplay}>{props.children}</div>
        )
export default answersDisplay