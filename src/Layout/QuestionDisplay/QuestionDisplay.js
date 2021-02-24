import React, { Component } from 'react' 

import classes from './QuestionDisplay.module.css'


class QuestionDisplay extends Component{
  

    render(){
        return (
            <div className={classes.QuestionDisplay}>
                <p>This is the question display</p>
            </div>
        )
    }
   
  

}

export default QuestionDisplay