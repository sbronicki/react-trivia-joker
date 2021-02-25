import React, {Component} from 'react'
import axios from 'axios'
// import Skeleton from 'react-loading-skeleton' 

import classes from './Display.module.css'
import Button from '../../Button/Button'
import QuestionDisplay from '../QuestionDisplay/QuestionDisplay'
import AnswersDisplay from '../AnswersDisplay/AnswersDisplay'
import AnswerEvaluation from '../AnswerEvaluation/AnswerEvaluation'
import AnswersULWrapper from '../../hoc/AnswersULWrapper'

class Display extends Component {
    state = {
        categoryOptions: [],
        displayActive: true,
        answersActive: false,
        answerEvaluation: null,
        evaluationActive: false,
        requestedQuestions: [],
        requestedData: [],
        requestedAnswerArrays: [],
        currentQuestionIndex: 0,
        currentCorrectAnswer: '',
        currentScore: 0
    }

    categories = []
    categoryIndex = {}
    currentScore = 0
    firstCorrectAnswer =''
    requestedQuestions = []
    requestedAnswers = []
    // use skeleton as ui loader
    // use llodash for unescaping
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
                let correctAnswer = response.data.results[response.data.results.indexOf(entry)].correct_answer
                let allAnswersArray = [...incorrectAnswersArray, correctAnswer]

                this.requestedAnswers.push(allAnswersArray)
            }
            let firstCorrectAnswer = response.data.results[0].correct_answer
            this.setState({requestedData:response.data.results, displayActive: false, answersActive: true, requestedQuestions: this.requestedQuestions, requestedAnswerArrays: this.requestedAnswers, currentCorrectAnswer: firstCorrectAnswer})
        })
    }
    choiceSelectedHandler = (e) => {
        let key = e.target.name
        if(e.target.name === 'category') {
            let val = e.target.value
            let index = this.categoryIndex[val]
            this.selectedValues[key] = index
        } else {
            this.selectedValues[key] = e.target.value
        }
    }

    answerSelectedHandler = (e) => {
        let questionIndexPlusOne = this.state.currentQuestionIndex + 1
        let nextCorrectAnswer = this.state.requestedData[this.state.currentQuestionIndex + 1].correct_answer
        let currentScore = this.state.currentScore
        let answerEvaluation

        if (e.target.innerText === this.state.currentCorrectAnswer) {
            console.log('correct') 
            answerEvaluation = true
            currentScore += 1 
            this.currentScore = currentScore
        } else{
            console.log('incorrect')
            answerEvaluation = false
        }
        this.setState({answersActive: false, evaluationActive: true, AnswerEvaluation: answerEvaluation})
        setTimeout(() => {
            this.setState({currentQuestionIndex: questionIndexPlusOne, currentScore: currentScore, answersActive: true, evaluationActive: false, currentCorrectAnswer: nextCorrectAnswer})
        }, 2000)
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
            this.state.displayActive ? 
            <div className={classes.Display}>
            <h2>Test your knowledge!</h2>
            <p>Choose trivia settings</p>
                <ul>
                    <li>
                        <p>Category:</p>
                        <select name="category" onChange={this.choiceSelectedHandler}>
                            {this.state.categoryOptions}
                        </select>
                    </li>
                    <li>
                        <p>Difficulty:</p>                     
                        <select name="difficulty" onChange={this.choiceSelectedHandler}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </li>
                    <li>
                        <p>Type:</p>
                        <select name="type" onChange={this.choiceSelectedHandler}>
                            <option value="boolean">True/False</option>
                            <option value="multiple">Multiple Choice</option>
                        </select>
                    </li>
                </ul>
                <Button 
                btnType="Submit"
                clicked={this.requstURLHandler}>Submit</Button>
            </div> : 
                <div>
                    <QuestionDisplay>
                        {this.state.currentQuestionIndex + 1}: {this.state.requestedQuestions[this.state.currentQuestionIndex]}
                    </QuestionDisplay>
                        <strong><p style={{margin: '5px'}}>Current Score: {this.currentScore}</p></strong>
                    <AnswersDisplay>
                    {this.state.evaluationActive ?
                        <section>
                            {this.state.AnswerEvaluation ? <AnswerEvaluation Correct /> : <AnswerEvaluation />}
                        </section> : null }
                        <AnswersULWrapper>
                            {this.state.answersActive ? 
                            <ul>
                                <li><Button clicked={this.answerSelectedHandler} btnType="Answer">{this.state.requestedAnswerArrays[this.state.currentQuestionIndex][0]}</Button></li>
                                <li><Button clicked={this.answerSelectedHandler} btnType="Answer">{this.state.requestedAnswerArrays[this.state.currentQuestionIndex][1]}</Button></li>
                                <li><Button clicked={this.answerSelectedHandler} btnType={this.state.requestedAnswerArrays[this.state.currentQuestionIndex][2] ? 'Answer' : 'Hidden'}>{this.state.requestedAnswerArrays[this.state.currentQuestionIndex][2]}</Button></li>
                                <li><Button clicked={this.answerSelectedHandler} btnType={this.state.requestedAnswerArrays[this.state.currentQuestionIndex][3] ? 'Answer' : 'Hidden'}>{this.state.requestedAnswerArrays[this.state.currentQuestionIndex][3]}</Button></li>
                            </ul> : null}
                        </AnswersULWrapper>
                    </AnswersDisplay>
                </div> 
          )}
}
export default Display