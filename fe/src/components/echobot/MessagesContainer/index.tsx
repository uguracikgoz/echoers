import './styles.css'
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../../features/echobot'
import MessageBaloon from './MessageBaloon'
import { IMessage } from '../../../features/echobot/interfaces'

const MessagesContainer: React.FC = () => {
  const state = useSelector(selectors.messageHistory)

  const renderMessageBaloons = () => {
    return state.messageHistory.map((message: IMessage, index: string) => {
      return (
        <Fragment key={index}>
          <MessageBaloon
            uuid={message.uuid}
            sender_type={message.sender_type}
            user={message.user}
            created_at={message.created_at}
            updated_at={message.updated_at}
            content={message.content}
          />
        </Fragment>
      )
    })
  }
  const messagesContainerRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current?.scrollHeight,
      behavior: 'smooth',
    })
  }, [state.messageHistory])

  return (
    <div ref={messagesContainerRef} className="messagesContainer">
      {renderMessageBaloons()}
    </div>
  )
}

export default MessagesContainer
