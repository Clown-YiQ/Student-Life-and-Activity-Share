import {Request} from '../utils/request';

class UserModel extends Request{
   getUserInfo(){
     return this.getData({
       url:'/getUserInfo'
     })
   }
   getSchoolById(id){
     return this.getData({
       url:`/getSchoolById?id=${id}`
     })
   }
   getUserById(id){
     return this.getData({
       url:`/getUserById?id=${id}`
     })
   }
   getActivityBySchool(school){
     return this.getData({
       url:`/getActivityBySchool?school=${school}`
     })
   }
}
export {UserModel}