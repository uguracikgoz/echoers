import './styles.css'
import React from 'react'
import { IMessage } from '../../../../features/echobot/interfaces'
import {
  MessageTypes,
  MessageSenders,
} from '../../../../features/echobot/enums'

const getBaloonClassName = (
  messageType: MessageTypes,
  messageSender: MessageSenders
): string => {
  let baloonClassName: string = 'messageBaloon'
  switch (messageType) {
    case MessageTypes.TEXT:
      baloonClassName += ''
      break
    case MessageTypes.PENDING_BOT_MESSAGE:
      baloonClassName += ' waiting-dots'
      break
  }
  switch (messageSender) {
    case MessageSenders.BOT:
      baloonClassName += ' botMessageBaloon'
      break
    case MessageSenders.USER:
      baloonClassName += ' userMessageBaloon'
      break
  }
  return baloonClassName
}

const MessageBaloon: React.FC<IMessage> = (props) => {
  return (
    <div
      key={props.uuid}
      className={getBaloonClassName(props.content.type, props.sender_type)}
    >
      <span>{props.content.content}</span>
    </div>
  )
}
export default MessageBaloon
