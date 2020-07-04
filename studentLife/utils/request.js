
class Request{
    baseUrl = 'http://xxx'
    // baseUrl = 'http://xxx'

    getData({url,method='GET',data={}}){
      return new Promise((resolve,reject)=>{
        wx.request({
          url:this.baseUrl + url,
          method:method,
          data:data,
          header: {
            'content-type': 'application/json'
         },
          success(res){
            if(res.statusCode == 200){
              resolve(res.data.data);
            }else{
              wx.showToast({
                title:'请求错误',
                icon:'none'
              })
            }
            
          },
          fail(err){
            // reject()
            wx.showToast({
              title:'请求错误',
              icon:'none'
            })
          }
        })
      })
    }
}

export {Request}