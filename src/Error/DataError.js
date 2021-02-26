import React from 'react'

import classes from './Error.module.css'
import Button from '../Button/Button'

const dataError = () => (
    <div className={classes.Error}>
        <h1>There seems to be no data on that!</h1>
        <h2>Please try a different category</h2>
        <a href="/"><Button>Go back</Button></a>
    </div>
) 

export default dataError