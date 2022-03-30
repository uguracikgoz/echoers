import './styles.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faPaperPlane, faCircle)

interface IButtonProps {
  children?: React.ReactNode
  props?: any
  onClick?: any
  isDisabled: boolean
}

const MessageSendButton: React.FC<IButtonProps> = ({
  onClick,
  isDisabled,
  children,
  ...props
}) => {
  return (
    <div>
      <button
        {...props}
        onClick={onClick}
        className="messageSendButton"
        disabled={isDisabled}
      >
        <FontAwesomeIcon icon="paper-plane" />
      </button>
    </div>
  )
}

export default MessageSendButton
