import React, { Component } from 'react'

import AuxWrapper from '../hoc/AuxWrapper'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Display from './Display/Display'

class Layout extends Component {
    generateRequstHandler = (ID, difficulty, type) => {
        if(type === 'True/False') type = 'boolean'
        else if(type === 'Multiple Choice') type = 'multiple'
        return `https://opentdb.com/api.php?amount=10category=${ID}&difficulty=${difficulty}&type=${type}`
      }
    render() {
        return (
            <AuxWrapper>
                <Header />
                <Display generateRequstURL={this.generateRequstHandler} />
                <Footer />
            </AuxWrapper>    
        )
    }
}

export default Layout