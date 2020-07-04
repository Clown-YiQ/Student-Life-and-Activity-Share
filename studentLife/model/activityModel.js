import {Request} from '../utils/request';

class ActivityModel extends Request{
   getActivities(){
     return this.getData({
       url:'/getActivity'
     })
   }
   getActivitiesByUid(uid){
     return this.getData({
       url:`/getActivityByUid?act_cid=${uid}`
     })
   }
   getActivitiesById(id){
     return this.getData({
       url:`/getActivityById?id=${id}`
     })
   }
   getActivityBySchool(school){
     return this.getData({
       url:`/getActivityBySchool?school=${school}`
     })
   }
   getActivityByDesc(){
    return this.getData({
      url:'/getActivityByDesc'
    })
  }
  getActivityLimit(act_cid) {
    return this.getData({
      url:`/getActivityLimit?act_cid=${act_cid}`
    })
  }
  getActivityTouchBottom(id) {
    return this.getData({
      url:`/getActivityTouchBottom?id=${id}`
    })
  }
  searchActivity(title) {
    return this.getData({
      url:`/searchActivity?title=${title}`
    })
  }
  searchActivitySort(sort) {
    return this.getData({
      url:`/searchActivitySort?sort=${sort}`
    })
  }
  searchActivityBySchool(title,school) {
    return this.getData({
      url:`/searchActivityBySchool?title=${title}&school=${school}`
    })
  }
  searchActivitySortBySchool(sort,school) {
    return this.getData({
      url:`/searchActivitySortBySchool?sort=${sort}&school=${school}`
    })
  }
  getAiSuggest(uid) {
    return this.getData({
      url:`/getAiSuggest?uid=${uid}`
    })
  }
  getActivityBySort(sort) {
    return this.getData({
      url:`/getActivityBySort?sort=${sort}`
    })
  }
}
export {ActivityModel}