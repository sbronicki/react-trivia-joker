import React, {Component} from 'react'
import axios from 'axios'
import unescape from 'lodash/unescape'
import shuffle from 'lodash/shuffle'
// import Skeleton from 'react-loading-skeleton' 

import classes from './Display.module.css'
import Button from '../../Button/Button'
import QuestionDisplay from '../QuestionDisplay/QuestionDisplay'
import AnswersDisplay from '../AnswersDisplay/AnswersDisplay'
import AnswerEvaluation from '../AnswerEvaluation/AnswerEvaluation'
import AnswersULWrapper from '../../hoc/AnswersULWrapper'
import ResultsPage from '../ResultsPage/ResultsPage'
import DataErrorMessage from '../../Error/DataError'
import NetworkErrorMessage from '../../Error/NetworkError'

    // STILL NEED TO DO:
    // multiple choice answers 2x2
    // unescape &#39; and &shy;
    // use skeleton as ui loader
    // general restructure => delegate code to different functions / apps & combine reused css to utility files

class Display extends Component {
    state = {
        categoryOptions: [],
        homeDisplayActive: true,
        answersActive: false,
        answerEvaluation: null,
        evaluationActive: false,
        requestedQuestions: [],
        requestedData: [],
        requestedAnswerArrays: [],
        currentQuestionIndex: 0,
        currentCorrectAnswer: '',
        currentScore: 0,
        resultsPageActive: false,
        error: false,
        dataError: false,
        networkError: false
    }

    categories = []
    categoryIndex = {}
    currentScore = 0
    firstCorrectAnswer =''
    requestedQuestions = []
    requestedAnswers = []

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
                this.requestedQuestions.push(unescape(response.data.results[response.data.results.indexOf(entry)].question))

                let incorrectAnswersArray = response.data.results[response.data.results.indexOf(entry)].incorrect_answers
                let correctAnswer = unescape(response.data.results[response.data.results.indexOf(entry)].correct_answer)
                let allAnswersArray = shuffle([...incorrectAnswersArray, correctAnswer])

                if(allAnswersArray[0] !== 'True') {
                    console.log(allAnswersArray[0])
                    let falseVal = allAnswersArray[0]
                    let trueVal = allAnswersArray[1]
                    allAnswersArray[0] = trueVal
                    allAnswersArray[1] = falseVal
                }

                this.requestedAnswers.push(allAnswersArray)
            }
            let firstCorrectAnswer = response.data.results[0].correct_answer
            this.setState({requestedData:response.data.results, homeDisplayActive: false, answersActive: true, requestedQuestions: this.requestedQuestions, requestedAnswerArrays: this.requestedAnswers, currentCorrectAnswer: firstCorrectAnswer})
        }).catch(error => {
            this.setState({error: true, dataError: true})
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
        let answerEvaluation
        let currentScore = this.state.currentScore

        if(this.state.currentQuestionIndex > 8){
            if (e.target.innerText === this.state.currentCorrectAnswer) {
                answerEvaluation = true
                currentScore += 1 
                this.currentScore = currentScore
            } else{
                answerEvaluation = false
            }
            this.setState({answersActive: false, evaluationActive: true, answerEvaluation: answerEvaluation, currentScore: this.currentScore})
            setTimeout(() => {
                this.setState({resultsPageActive: true, currentScore: this.currentScore})
            }, 2000);
            return 
        } else {
            let questionIndexPlusOne = this.state.currentQuestionIndex + 1
            let nextCorrectAnswer = this.state.requestedData[this.state.currentQuestionIndex + 1].correct_answer

            if (e.target.innerText === this.state.currentCorrectAnswer) {
                answerEvaluation = true
                currentScore += 1 
                this.currentScore = currentScore
            } else{
                answerEvaluation = false
            }
            this.setState({answersActive: false, evaluationActive: true, answerEvaluation: answerEvaluation})
            setTimeout(() => {
                this.setState({currentQuestionIndex: questionIndexPlusOne, currentScore: currentScore, answersActive: true, evaluationActive: false, currentCorrectAnswer: nextCorrectAnswer})
            }, 2000)}
    }
    ratingHandler = (score) => {
        let rating = ''
        switch(score){
        case 0: 
        case 1:
        case 2:
            rating = 'Village Idiot'
            break
        case 3:
        case 4:
        case 5:
            rating = 'Jester'
            break
        case 6:
        case 7:
            rating = 'Squire'
            break
        case 8:
        case 9:
            rating = 'Knight'
            break
        case 10:
            rating = 'Well read scholar'
            break
        default: 
            rating = 'Something went wrong...'

        }
        return rating
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
        }).catch(error => {
            this.setState({error: true, networkError: true})
        })
    }
    render(){
        return(
            this.state.error ?  (this.state.networkError ? <NetworkErrorMessage /> : <DataErrorMessage />) :
        this.state.homeDisplayActive ? 
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
                    {!this.state.resultsPageActive ? 
                    <div>
                    <QuestionDisplay>
                        {this.state.currentQuestionIndex + 1}: {this.state.requestedQuestions[this.state.currentQuestionIndex]}
                    </QuestionDisplay>
                        <strong><p style={{margin: '5px'}}>Current Score: {this.currentScore}</p></strong>
                    <AnswersDisplay>
                    {this.state.evaluationActive ?
                        <section>
                            {this.state.answerEvaluation ? <AnswerEvaluation Correct /> : <AnswerEvaluation />}
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
                    </div> : <ResultsPage FinalScore={this.state.currentScore} Rating={this.ratingHandler(this.state.currentScore)}/>
                    }
                </div>
          )}
}
export default Display