import './styles.css'
import { v4 as uuid } from 'uuid'

import React from 'react'
import { ThunkDispatch } from 'redux-thunk'

import MessageSendButton from './MessageSendButton'
import { MessageSenders, MessageTypes } from '../../../features/echobot/enums'
import { IMessage } from '../../../features/echobot/interfaces'
import ISendMessageAction from '../../../features/echobot/interfaces/ISendMessageAction'
import { bindActionCreators } from 'redux'
import { startSendMessage, startCreateUser, startGetUser } from '../../../features/echobot/store/actions'
import { connect } from 'react-redux'

interface IProps {
  userUuid: string,
  content: string
  isSendButtonDisabled: boolean
}

interface IState {
  userUuid: string
  content: string
  isSendButtonDisabled: boolean
}

interface ILinkDispatchProp {
  startSendMessage: (message: IMessage) => void
  startCreateUser: () => void
  startGetUser: () => void
}
class SendMessageContainer extends React.Component<IProps & ILinkDispatchProp> {

  state = {
    userUuid: '',
    content: '',
    isSendButtonDisabled: false
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.length < 1024)
      this.setState({ [e.target.name]: e.target.value })
  }

  handleNewMessage = (e: any): void => {
    if (this.state.content.length === 0)
      return
    e.preventDefault();
    setTimeout(() => {
      this.setState(() => {
        this.props.startSendMessage({
          uuid: uuid(),
          sender_type: MessageSenders.USER,
          created_at: new Date().getTime().toString(),
          updated_at: new Date().getTime().toString(),
          user: {
            uuid: this.state.userUuid
          },
          content: {
            type: MessageTypes.TEXT,
            content: this.state.content,
          },
        })
        this.setState({
          content: '',
        })
      })
    }, 5); // for better ux we put a small delay to make that feel answer is coming from peer
  }

  render() {
    return (
      <div className="echoBotInputBar">
        <div className="messageSendButtonContainer">
          <MessageSendButton
            isDisabled={this.state.isSendButtonDisabled}
            onClick={(event: any) => { this.handleNewMessage(event) }}
          ></MessageSendButton>
        </div>
        <input
          className="echoBotMessageInput"
          type="text"
          name="content"
          value={this.state.content}
          placeholder="Write reply..."
          onChange={(event) => { this.handleInput(event) }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.handleNewMessage(event)
            }
          }}
        ></input>
      </div>
    )
  }

  componentWillMount(): void {
    let userUuid = localStorage.getItem("userUuid");
    if (userUuid == null) {
      userUuid = uuid();
      localStorage.setItem('userUuid', userUuid);
      this.setState({
        userUuid: userUuid
      })
      this.setState(() => {
        this.props.startCreateUser()
      })
    } else {
      this.setState({
        userUuid: localStorage.getItem('userUuid')
      })
      this.setState(() => {
        this.props.startGetUser()
      })
    }
  }
}

// Define reducer state prop types
const mapStateToProps = (state: IState): IProps => ({
  userUuid: state.userUuid,
  content: state.content,
  isSendButtonDisabled: state.isSendButtonDisabled,
})

// Define dispatcher prop types
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ISendMessageAction>
): ILinkDispatchProp => ({
  startSendMessage: bindActionCreators(startSendMessage, dispatch),
  startCreateUser: bindActionCreators(startCreateUser, dispatch),
  startGetUser: bindActionCreators(startGetUser, dispatch)

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMessageContainer)
