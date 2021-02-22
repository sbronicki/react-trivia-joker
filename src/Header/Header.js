import React from 'react'

import classes from './Header.module.css'
import HeaderItemImageHappy from './HeaderItem/HeaderItemImage/HeaderItemImageHappy'
import HeaderItemImageSad from './HeaderItem/HeaderItemImage/HeaderItemImageSad'
import HeaderItemText from './HeaderItem/HeaderItemText/HeaderItemText'

const Header = (props) => (
    <div className={classes.Header}>
        <ul>
            <HeaderItemImageHappy />
            <HeaderItemText />
            <HeaderItemImageSad />

        </ul>
    </div>
)

export default Header