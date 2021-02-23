import React, {Component} from 'react'
import axios from 'axios'

import classes from './Display.module.css'
import Button from './Button/Button'
import Footer from './Footer/Footer'

class Display extends Component {
    state = {
        categoryOptions: []
    }

    categories = []

    componentDidMount() {
        axios
        .get('https://opentdb.com/api_category.php')
        .then(response => {
            for(let category of response.data.trivia_categories){
               this.categories.push(category.name)
            //    this.ids.push(category.id)
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
            <div className={classes.Display}>
            <h2>Test your knowledge!</h2>
            <p>Choose trivia settings</p>
                <ul>
                    <li>
                        <p>Category:</p>
                        <select name="subject">
                            {this.state.categoryOptions}
                        </select>
                    </li>
                    <li>
                        <p>Difficulty:</p>                     
                        <select name="difficuly">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </li>
                    <li>
                        <p>Type:</p>
                        <select name="type">
                            <option value="trueOrFalse">True/False</option>
                            <option value="multipleChoice">Multiple Choice</option>
                        </select>
                    </li>
                </ul>
                <Button btnType={'Submit'} >Submit</Button>
                <Footer />
            </div>
          )}
}
export default Display