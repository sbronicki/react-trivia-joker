import React from 'react'
import { FaGithub, FaLinkedin, FaPortrait } from 'react-icons/fa'

import classes from './Footer.module.css'

const footer = () => (
    <footer className={classes.Footer}>
        <ul>
            <li>
                <a 
                href={'https://github.com/sbronicki'}
                target="_blank"
                rel="noopener noreferrer">
                    <FaGithub size="2em" color="#fff" />
                </a>
            </li>
            <li>
                <a 
                href={'https://www.linkedin.com/in/stanley-bronicki/'}
                target="_blank"
                rel="noopener noreferrer">
                    <FaLinkedin size="2em" color="#fff" />
                </a>
            </li>
            <li>
                <a 
                href={'https://www.sbronicki.com/'}
                target="_blank"
                rel="noopener noreferrer">
                    <FaPortrait size="2em" color="#fff" />
                </a>
            </li>
        </ul>
    </footer>
)

export default footer