import {Request} from '../utils/request';

class ShareCommentModel extends Request{
   getShareCommentById(share_id){
     return this.getData({
       url:`/getShareCommentById?id=${share_id}`
     })
  }
  queryShareAnswerByParId(share_id){
    return this.getData({
      url:`/queryShareAnswerByParId?id=${share_id}`
    })
  }
}
export {ShareCommentModel}