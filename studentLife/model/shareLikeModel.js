import { Request } from '../utils/request';

class ShareLikeModel extends Request {
  getLikeInfoByUid(uid) {
      return this.getData({
        url: `/getLikeInfoByUid?uid=${uid}`
      })
    }
    getLikeInfoById(id) {
    return this.getData({
      url:`/getLikeInfoById?id=${id}`
    })
  }
}
export { ShareLikeModel }