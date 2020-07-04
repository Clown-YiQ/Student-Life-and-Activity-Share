import { Request } from '../utils/request';

class ShareModel extends Request {
  getShare() {
    return this.getData({
      url: '/getShare'
    })
  }
  getShareBySchool(school) {
    return this.getData({
      url: `/getShareBySchool?school=${school}`
    })
  }
  getShareByUid(id) {
    return this.getData({
      url: `/getShareByUid?id=${id}`
    })
  }
  getShareLimit(id) {
    return this.getData({
      url: `/getShareLimit?id=${id}`
    })
  }
  getShareById(id) {
    return this.getData({
      url: `/getShareById?id=${id}`
    })
  }
  searchShare(con) {
    return this.getData({
      url: `/searchShare?con=${con}`
    })
  }
  searchShareBySchool(con, school) {
    return this.getData({
      url: `/searchShareBySchool?con=${con}&school=${school}`
    })
  }
  getShareTouchBottom(id) {
    return this.getData({
      url: `/getShareTouchBottom?id=${id}`
    })
  }
  getShareBySchoolTouchBottom(id,school) {
    return this.getData({
      url: `/getShareBySchoolTouchBottom?id=${id}&school=${school}`
    })
  }
}
export { ShareModel }