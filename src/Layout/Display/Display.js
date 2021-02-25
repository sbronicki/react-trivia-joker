import React, {Component} from 'react'
import axios from 'axios'
// import Skeleton from 'react-loading-skeleton' 

import classes from './Display.module.css'
import Button from '../../Button/Button'
import QuestionDisplay from '../QuestionDisplay/QuestionDisplay'
import AnswersDisplay from '../AnswersDisplay/AnswersDisplay'
import AuxWrapper from '../../hoc/AuxWrapper'

class Display extends Component {
    state = {
        categoryOptions: [],
        isActive: true,
        requestedQuestions: [],
        requestedAnswerArrays: []
    }

    categories = []
    categoryIndex = {}
   
    currentQuestionIndex = 0
    requestedQuestions = []
    requestedAnswers = []
    
    // NEXT - set function for answer button clicked prop
    // this will add one to currentQuestionIndex and rerender with the next question 
    // also restyle QuestionDisplay so longer questions dont spill over
    
    selectedValues = {
        category: '9',
        difficulty: 'easy',
        type: 'boolean'
    }
    requstURLHandler = () => {
        axios
        .get(`https://opentdb.com/api.php?amount=10&category=${this.selectedValues.category}&difficulty=${this.selectedValues.difficulty}&type=${this.selectedValues.type}`)
        .then(response => {
            for(let entry of response.data.results) {
                this.requestedQuestions.push(response.data.results[response.data.results.indexOf(entry)].question)

                let incorrectAnswersArray = response.data.results[response.data.results.indexOf(entry)].incorrect_answers
                let allAnswersArray = [...incorrectAnswersArray, response.data.results[response.data.results.indexOf(entry)].correct_answer]

                this.requestedAnswers.push(allAnswersArray)
            }
            this.setState({isActive: false, requestedQuestions: this.requestedQuestions, requestedAnswerArrays: this.requestedAnswers})
        })
    }
    choiceSelected = (e) => {
        let key = e.target.name
        if(e.target.name === 'category') {
            let val = e.target.value
            let index = this.categoryIndex[val]
            this.selectedValues[key] = index
        } else {
            this.selectedValues[key] = e.target.value
        }
    }
    componentDidMount() {
        axios
        .get('https://opentdb.com/api_category.php')
        .then(response => {
            for(let category of response.data.trivia_categories){
               this.categories.push(category.name)
               this.categoryIndex[category.name] = category.id
            }
            this.setState({
                categoryOptions: this.categories.map((category, index) => {
                    return <option key={index}>{category}</option>}
                )
            })
        })
    }
    render(){
        return(
            this.state.isActive ? 
            <div className={classes.Display}>
            <h2>Test your knowledge!</h2>
            <p>Choose trivia settings</p>
                <ul>
                    <li>
                        <p>Category:</p>
                        <select name="category" onChange={this.choiceSelected}>
                            {this.state.categoryOptions}
                        </select>
                    </li>
                    <li>
                        <p>Difficulty:</p>                     
                        <select name="difficulty" onChange={this.choiceSelected}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </li>
                    <li>
                        <p>Type:</p>
                        <select name="type" onChange={this.choiceSelected}>
                            <option value="boolean">True/False</option>
                            <option value="multiple">Multiple Choice</option>
                        </select>
                    </li>
                </ul>
                <Button 
                btnType="Submit"
                clicked={this.requstURLHandler}>Submit</Button>
            </div> : 
                <AuxWrapper>
                    <QuestionDisplay>
                        {this.state.requestedQuestions[this.currentQuestionIndex]}
                    </QuestionDisplay>
                    <AnswersDisplay>
                        <ul>
                            <li><Button btnType="Answer">{this.state.requestedAnswerArrays[this.currentQuestionIndex][0]}</Button></li>
                            <li><Button btnType="Answer">{this.state.requestedAnswerArrays[this.currentQuestionIndex][1]}</Button></li>
                            <li><Button btnType={this.state.requestedAnswerArrays[this.currentQuestionIndex][2] ? 'Answer' : 'Hidden'}>{this.state.requestedAnswerArrays[this.currentQuestionIndex][2]}</Button></li>
                            <li><Button btnType={this.state.requestedAnswerArrays[this.currentQuestionIndex][3] ? 'Answer' : 'Hidden'}>{this.state.requestedAnswerArrays[this.currentQuestionIndex][3]}</Button></li>
                        </ul>
                    </AnswersDisplay>
                </AuxWrapper> 
          )}
}
export default Display