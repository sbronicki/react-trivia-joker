import React, { Component } from 'react'

import AuxWrapper from '../hoc/AuxWrapper'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Display from './Display/Display'

class Layout extends Component {
    generateRequstURLHandler = (id, difficulty, type) => {
        // return `https://opentdb.com/api.php?amount=10category=${id}&difficulty=${difficulty}&type=${type}`

        console.log(`https://opentdb.com/api.php?amount=10category=${id}&difficulty=${difficulty}&type=${type}`)
      }
    render() {
        return (
            <AuxWrapper>
                <Header />
                <Display generateRequstURL={this.generateRequstURLHandler} />
                <Footer />
            </AuxWrapper>    
        )
    }
}

export default Layout