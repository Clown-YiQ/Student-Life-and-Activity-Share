import {Request} from '../utils/request';

class SecondModel extends Request{
   getSeconds(){
     return this.getData({
       url:'/getSecond'
     })
   }
   getSecondsByUid(uid){
    return this.getData({
      url:`/getSecondByUid?id=${uid}`
    })
  }
  getSecondsBylimit(sc_cid){
    return this.getData({
      url:`/getSecondLimit?sc_cid=${sc_cid}`
    })
  }
  getSecondsById(id){
    return this.getData({
      url:`/getSecondById?id=${id}`
    })
  }
  getSecondsBySchool(school){
    return this.getData({
      url:`/getSecondBySchool?school=${school}`
    })
  }
  searchSecond(title) {
    return this.getData({
      url:`/searchSecond?title=${title}`
    })
  }
  searchSecondBySchool(title,school) {
    return this.getData({
      url:`/searchSecondBySchool?title=${title}&school=${school}`
    })
  }
  getSecondTouchBottom(id) {
    return this.getData({
      url:`/getSecondTouchBottom?id=${id}`
    })
  }
  getSecondBySchoolTouchBottom(id,school) {
    return this.getData({
      url:`/getSecondBySchoolTouchBottom?id=${id}&school=${school}`
    })
  }
}
export {SecondModel}