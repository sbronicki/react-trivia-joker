import React from 'react'
import { FaGithub, FaLinkedin, FaPortrait } from 'react-icons/fa'

import classes from './Footer.module.css'

const footer = () => (
    <footer className={classes.Footer}>
        <FaGithub size="2em" color="#fff" />
        <FaLinkedin size="2em" color="#fff" />
        <FaPortrait size="2em" color="#fff" />
    </footer>
)

export default footer