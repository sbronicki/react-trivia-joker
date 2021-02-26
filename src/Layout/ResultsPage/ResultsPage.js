import React from 'react'

import classes from './ResultsPage.module.css'
import Button from '../../Button/Button'

const resultsPage = (props) => (
    <div className={classes.ResultsPage}>
        <h1>Quiz Complete!</h1>
        <p>Your score: <strong>{props.FinalScore}/10</strong></p>
        <p>Your rating: <strong>{props.Rating}</strong></p>
        <Button disabled clicked={console.log('clicked')}>How bout another?</Button>
    </div>
)

export default resultsPage