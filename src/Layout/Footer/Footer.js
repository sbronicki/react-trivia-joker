import React from 'react'
import { FaGithub, FaLinkedin, FaPortrait } from 'react-icons/fa'

import classes from './Footer.module.css'

const footer = () => (
    <footer className={classes.Footer}>
        <ul>
            <li><FaGithub size="2em" color="#fff" /></li>
            <li><FaLinkedin size="2em" color="#fff" /></li>
            <li><FaPortrait size="2em" color="#fff" /></li>
        </ul>
    </footer>
)

export default footer