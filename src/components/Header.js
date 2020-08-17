import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import styled from 'styled-components'

const MenuWrapper = styled.div`
  border-bottom: 1px solid #e6e4e4;
`
const Logo = styled.p`
  font-size:20px;
  color: black;
  text-decoration: none;
`

class Header extends Component {
    doNothing() {
        console.log("Do nothing")
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
              <Menu.Item >
                <Button primary inverted onClick={this.doNothing}>Btn</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </MenuWrapper>
      </div>
    )
  }
}

export default Header;
