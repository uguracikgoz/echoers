import { v4 as uuid } from 'uuid'
import http from '../../../../http.common'
class EchoBotUserSvc {
    public createUser = () => {
      let userUuid = localStorage.getItem("userUuid");
      if(userUuid == null) {
        userUuid = uuid();
        localStorage.setItem('userUuid', userUuid);
      }

      return http.post<any>('user', {
        user: {
          uuid: userUuid
        }
      })
    };
    public getUser = () => {
      let userUuid = localStorage.getItem("userUuid");
      return http.get<any>(`user`, { params: { userUuid: userUuid}});
    }
}
export default new EchoBotUserSvc()
