import {Request} from '../utils/request';

class CommentModel extends Request{
   getCommentById(act_id){
     return this.getData({
       url:`/getCommentById?act_id=${act_id}`
     })
  }
  queryAnswerByParId(act_id){
    return this.getData({
      url:`/queryAnswerByParId?act_id=${act_id}`
    })
  }
}
export {CommentModel}