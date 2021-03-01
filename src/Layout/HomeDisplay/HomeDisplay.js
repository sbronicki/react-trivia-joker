import React from 'react'

import classes from './HomeDisplay.module.css'
import Button from '../../Button/Button'

const homeDisplay = (props) => (
    <div className={classes.HomeDisplay}>
    <h2>Test your knowledge!</h2>
    <p>Choose trivia settings</p>
        <ul>
            <li>
                <p>Category:</p>
                <select name="category" onChange={props.choiceSelected}>
                    {props.categoryOptions}
                </select>
            </li>
            <li>
                <p>Difficulty:</p>                     
                <select name="difficulty" onChange={props.choiceSelected}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </li>
            <li>
                <p>Type:</p>
                <select name="type" onChange={props.choiceSelected}>
                    <option value="boolean">True/False</option>
                    <option value="multiple">Multiple Choice</option>
                </select>
            </li>
        </ul>
        <Button 
        btnType="Submit"
        clicked={props.requestURL}>Submit</Button>
    </div>
)

export default homeDisplay