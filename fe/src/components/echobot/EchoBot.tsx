import './styles.css'
import React, { Fragment } from 'react'
import TitleBar from './TitleBar'
import MessagesContainer from './MessagesContainer'
import MessageInput from './SendMessageContainer'

const EchoBot: React.FC = () => {
  return (
    <Fragment>
      <div className="echoBotContainer">
        <TitleBar title="EchoBot"></TitleBar>
        <MessagesContainer></MessagesContainer>
        <MessageInput></MessageInput>
      </div>
    </Fragment>
  )
}

export default EchoBot
