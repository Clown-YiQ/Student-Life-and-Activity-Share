import { Request } from '../utils/request';

class CollecModel extends Request {
  getCollecInfoByUid(uid) {
      return this.getData({
        url: `/getCollecInfoByUid?uid=${uid}`
      })
    }
  getCollecInfoById(id) {
    return this.getData({
      url:`/getCollecInfoById?id=${id}`
    })
  }
}
export { CollecModel }