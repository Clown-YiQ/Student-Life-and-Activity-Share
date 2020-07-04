import { Request } from '../utils/request';

class JoinModel extends Request {
  getJoinInfo(uid) {
      return this.getData({
        url: `/getJoinInfo?uid=${uid}`
      })
  }
  getJoinInfoById(id) {
    return this.getData({
      url:`/queryJoinInfoById?id=${id}`
    })
  }
}
export { JoinModel }