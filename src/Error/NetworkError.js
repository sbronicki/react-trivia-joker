import React from 'react'

import classes from './Error.module.css'
import Button from '../Button/Button'

const dataError = () => (
    <div className={classes.Error}>
        <h1>Network error!</h1>
        <h2>Please try again</h2>
        <a href="/"><Button>Reload</Button></a>
    </div>
) 

export default dataError