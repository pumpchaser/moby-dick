import React, { Component, Fragment } from 'react';

import { Modal, Header, Button, Form  } from 'semantic-ui-react'

function AddTokenModal() {
  const [open, setOpen] = React.useState(false)
  const tokenNameRef = React.useRef(null)
  const contractAddressRef = React.useRef(null)
  const blockCreationRef = React.useRef(null)
  const lastBlockRef = React.useRef(null)
  const uniswapAddressRef = React.useRef(null)
  const eventsRef = React.useRef(null)

  function submit() {
    // API Call to submit token here
    const tokenName = tokenNameRef.current.value
    const contractAddress = contractAddressRef.current.value
    const blockCreation = blockCreationRef.current.value
    const lastBlock = lastBlockRef.current.value
    const uniswapAddress = uniswapAddressRef.current.value
    const events = eventsRef.current.value

    console.log('Submit Add Token Form:')
    console.log(tokenName)
    console.log(contractAddress)
    console.log(blockCreation)
    console.log(lastBlock)
    console.log(uniswapAddress)
    console.log(events)
    
    setOpen(false)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Add Token</Button>}
    >
      <Modal.Header>Add Token</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field >
            <label>Token Name</label>
            <input placeholder='Token Name' ref={tokenNameRef}/>
          </Form.Field>
             <Form.Field>
              <label>Contract Address</label>
              <input placeholder='Contract Address' ref={contractAddressRef}/>
            </Form.Field>
            <Form.Field>
              <label>Block Creation</label>
              <input placeholder='Block Creation' ref={blockCreationRef}/>
            </Form.Field>
            <Form.Field>
              <label>Last Block</label>
              <input placeholder='Last Block' ref={lastBlockRef} />
            </Form.Field>
            <Form.Field>
              <label>Uniswap Address</label>
              <input placeholder='Uniswap Address' ref={uniswapAddressRef}/>
            </Form.Field>
            <Form.Field>
              <label>Events</label>
              <input placeholder='Events' ref={eventsRef}/>
            </Form.Field>   
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition='right'
          icon='checkmark'
          onClick={() => submit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddTokenModal;