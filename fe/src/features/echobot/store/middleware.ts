/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import { AxiosResponse } from 'axios'
import { ActionTypes, MessageTypes } from '../enums'

const echoBotMiddleware: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


    ({ dispatch, getState }: MiddlewareAPI) =>
    (next: Dispatch) =>
    async (action: AnyAction) => {
      switch (action.type) {
        case ActionTypes.SEND_MESSAGE:
          const [
            START_SEND_MESSAGE,
            SUCCESS_SEND_MESSAGE,
            FAILED_SEND_MESSAGE,
          ] = action.subtypes
          next({ ...action, type: START_SEND_MESSAGE })
          try {
            const response: AxiosResponse = await action.promise;
            if (response.status === 201) {
              return next({ ...action, type: SUCCESS_SEND_MESSAGE })
            }
          } catch (error) {
            return next({ ...action, type: FAILED_SEND_MESSAGE })
          }
        break;
        case ActionTypes.CREATE_USER:
          const [
            START_CREATE_USER,
            SUCCESS_CREATE_USER,
            FAILED_CREATE_USER,
          ] = action.subtypes
          next({ ...action, type: START_CREATE_USER })
          try {
            const response: AxiosResponse = await action.promise;
            if (response.status === 204 || response.status === 303) {
              return next({ ...action, type: SUCCESS_CREATE_USER })
            }
          } catch (error) {
              return next({ ...action, type: FAILED_CREATE_USER })
          }
        break;
        case ActionTypes.GET_USER:
          const [
            START_GET_USER,
            SUCCESS_GET_USER,
            FAILED_GET_USER,
          ] = action.subtypes
          next({ ...action, type: START_GET_USER })
          try {
              const response: AxiosResponse = await action.promise;
             
              if (response.status === 200) {
                action.payload = {};
                action.payload.messages = [];
                for(let i=0;i<response.data.data.messages.length;i++)
                {
                  action.payload.messages.push({
                    uuid: response.data.data.messages[i].uuid,
                    sender_type: response.data.data.messages[i].sender_type,
                    user: response.data.data.messages[i].user,
                    content: {
                      type: MessageTypes.TEXT,
                      content: response.data.data.messages[i].content
                    },
                    created_at: response.data.data.messages[i].created_at,
                    updated_at: response.data.data.messages[i].updated_at
                  })
                }

                return next({ ...action, type: SUCCESS_GET_USER })
              }
          } catch (error) {
              return next({ ...action, type: FAILED_GET_USER })
          }
        break;
      }
    }

export default echoBotMiddleware
