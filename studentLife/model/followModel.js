import {Request} from '../utils/request';

class FollowModel extends Request{
   getFollowUser(id){
     return this.getData({
       url:`/queryFollowUser?id=${id}`
     })
   }
   getFansById(id){
     return this.getData({
       url:`/queryFansById?id=${id}`
     })
   }
   getFansUser(id){
    return this.getData({
      url:`/queryFansUser?id=${id}`
    })
  }
  searchFollowUser(name, id) {
    return this.getData({
      url:`/searchFollowUser?name=${name}&id=${id}`
    })
  }
  searchFans(id, name) {
    return this.getData({
      url:`/searchFans?id=${id}&name=${name}`
    })
  }
}
export {FollowModel}