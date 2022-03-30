import http from '../../../../http.common'
import { IMessage } from '../../interfaces'
import IRequest from './IRequest'
class EchoBotMessageService {
  getAll(senderId: string) {
    return http.get<Array<IMessage>>(`/message/${senderId}`)
  }

  get(messageUuid: string) {
    return http.get<IMessage>(`message/${messageUuid}`)
  }

  create(data: IRequest) {
    return http.post<any>('message', {
      message: {
        content: data.content.content,
        sender_type: data.sender_type,
        user: data.user
      }
    })
  }
}
export default new EchoBotMessageService()
