import React, { Component } from 'react';
import { Menu, Button, Image } from 'semantic-ui-react';
import styled from 'styled-components'
import Web3 from 'web3';


const MenuWrapper = styled.div`
  border-bottom: 1px solid #e6e4e4;
`
const Logo = styled.p`
  font-size: 20px;
  color: black;
  text-decoration: none;
  margin-left: 5px
`

class Header extends Component {
  // login() {
    
  // }
  async login() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  } 


  renderCurrentSession(){
    if(window.ethereum.selectedAddress){
      return(
        null
      )
    }
    return(
      <Menu.Item >
        <Button primary inverted onClick={this.login}>Login</Button>
      </Menu.Item>
    )
  }
  render() {
    return(
      <div>
        <MenuWrapper>
          <Menu secondary size="large">
            <Menu.Item>
              <Image size='mini' src='spear.png' />
              <a href="/">
                <Logo>Spear</Logo>
              </a>
            </Menu.Item>
            <Menu.Menu position='right'>
              {this.renderCurrentSession()}

            </Menu.Menu>
          </Menu>
        </MenuWrapper>
      </div>
    )
  }
}

export default Header;
