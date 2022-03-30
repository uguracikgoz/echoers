import { ActionTypes } from '../enums/ActionsTypes'
import { initialState } from '../store/reducers'
import reducer from '../store/reducers'
import { SendMessageActionType } from '../types'
import { MessageSenders, MessageTypes } from '../enums/'
import { v4 as uuid } from 'uuid'

describe('user sends a message', () => {
  it(`sends a message, if ${ActionTypes.START_SEND_MESSAGE} action is provided`, () => {
    const expectedState = {
      value: 1,
    }

    const action: SendMessageActionType = {
      type: ActionTypes.START_SEND_MESSAGE,
      payload: {
        uuid: uuid(),
        sender_type: MessageSenders.BOT,
        user: null,
        created_at: new Date().getTime().toString(),
        updated_at: new Date().getTime().toString(),
        content: {
          type: MessageTypes.TEXT,
          content: `Hi, I'm echobot 🤖 Send me any message & I'll reply it back to you.`,
        },
      },
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
