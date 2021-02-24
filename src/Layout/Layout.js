import React, { Component } from 'react'

import AuxWrapper from '../hoc/AuxWrapper'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Display from './Display/Display'
// import QuestionDisplay from './QuestionDisplay/QuestionDisplay'

class Layout extends Component {
    render() {
        return (
            <AuxWrapper>
                <Header />
                <Display />
                {/* <QuestionDisplay /> */}
                <Footer />
            </AuxWrapper>    
        )
    }
}

export default Layout