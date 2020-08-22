import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import styled from 'styled-components'
import Web3 from 'web3';

const MenuWrapper = styled.div`
  border-bottom: 1px solid #e6e4e4;
`
const Logo = styled.p`
  font-size:20px;
  color: black;
  text-decoration: none;
`

class Header extends Component {
  login() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        window.ethereum.enable()
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
        window.ethereum.selectedAddress
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
              <a href="/">
                <Logo>MobyDick</Logo>
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
