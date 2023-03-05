import '../CSS/Header.css'
import logo from '../Images/logo.svg'
import logoLinkedin from '../Images/linkedin.svg'
import logoGithub from '../Images/github.svg'

import React, { Component } from 'react'

class Header extends Component {
    render(){
        return (
            
            <div className="headerWrapper">
                <div class="header">
                    <img src={logo} className="appLogo" alt="logo" />
                    
                        <div class="social">
                            <a href="https://www.linkedin.com/in/bispo-daniel" target="_blank"><img src={logoLinkedin} className="linkedinLogo" alt="linkedin" /></a>
                            <a href="https://www.github.com/bispo-daniel" target="_blank"><img src={logoGithub} className="githubLogo" alt="git hub" /></a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Header