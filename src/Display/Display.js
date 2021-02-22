import React from 'react'
import classes from './Display.module.css'
import Select from './Select/Select'
import Footer from './Footer/Footer'


// only displays initially until subject / difficulty is chosen
const Display = (props) => (
    <div className={classes.Display}>
       <h2>Choose trivia settings</h2>
        <ul>
            <li>
                <p>Subject:</p>
                <Select />
            </li>
            <li>
                <p>Difficulty:</p>
                <Select />
            </li>
            <li>
                <p>Type:</p>
                <Select />
            </li>
        </ul>
        <Footer />
    </div>
)

export default Display