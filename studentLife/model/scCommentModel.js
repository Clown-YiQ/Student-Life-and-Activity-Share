import {Request} from '../utils/request';

class ScCommentModel extends Request{
   getScCommentById(sc_id){
     return this.getData({
       url:`/getScCommentById?sc_id=${sc_id}`
     })
  }
  queryScAnswerByParId(sc_id){
    return this.getData({
      url:`/queryScAnswerByParId?sc_id=${sc_id}`
    })
  }
}
export {ScCommentModel}