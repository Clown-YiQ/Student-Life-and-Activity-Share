import axios from '@/axios.js'

var api = {
  //登录
  login(params) {
    return axios.post('/login', params);
  },
  //活动
  queryActivityByPage(page, pageSize) {
    return axios.get(`/queryActivityByPage?page=${page - 1}&pageSize=${pageSize}`);
  },
  getActivityTotal() {
    return axios.get('/getActivityTotal');
  },
  getJoinInfoById(id) {
    return axios.get(`/queryJoinInfoById?id=${id}`)
  },
  deleteActivityById(params) {
    return axios.post('/deleteActivityById', params)
  },
  editActivity(params) {
    return axios.post('/editActivity', params)
  },
  searchActivityByTitle(title) {
    return axios.get(`/searchActivityByTitle?title=${title}`);
  },
  searchActivityBySort(sort) {
    return axios.get(`/searchActivityBySort?sort=${sort}`)
  },
  searchActivityByUser(User) {
    return axios.get(`/searchActivityByUser?user=${User}`)
  },
  searchActivityByUschool(school) {
    return axios.get(`/searchActivityByUschool?school=${school}`)
  },
  queryActivityByPageCid(cid, page, pageSize) {
    return axios.get(`/queryActivityByPageCid?cid=${cid}&page=${page - 1}&pageSize=${pageSize}`)
  },
  queryActivityCidTotal(cid) {
    return axios.get(`/queryActivityCidTotal?cid=${cid}`)
  },
  searchActivityCidByTitle(cid, title) {
    return axios.get(`/searchActivityCidByTitle?cid=${cid}&title=${title}`);
  },
  searchActivityCidBySort(cid, sort) {
    return axios.get(`/searchActivityCidBySort?cid=${cid}&sort=${sort}`)
  },
  //二手商品
  querySecondByPage(page, pageSize) {
    return axios.get(`/querySecondByPage?page=${page - 1}&pageSize=${pageSize}`)
  },
  getSecondTotal() {
    return axios.get('/getSecondTotal');
  },
  deleteSecondById(params) {
    return axios.post('/deleteSecondById', params)
  },
  editSecond(params) {
    return axios.post('/editSecond', params)
  },
  searchSecondByTitle(title) {
    return axios.get(`/searchSecondByTitle?title=${title}`)
  },
  searchSecondByPrice(price) {
    return axios.get(`/searchSecondByPrice?price=${price}`)
  },
  searchSecondByCon(con) {
    return axios.get(`/searchSecondByCon?con=${con}`)
  },
  searchSecondByUser(user) {
    return axios.get(`/searchSecondByUser?user=${user}`)
  },
  querySecondCidByPage(cid, page, pageSize) {
    return axios.get(`/querySecondCidByPage?cid=${cid}&page=${page - 1}&pageSize=${pageSize}`)
  },
  querySecondCidTotal(cid) {
    return axios.get(`/querySecondCidTotal?cid=${cid}`)
  },
  searchSecondCidByTitle(cid, title) {
    return axios.get(`/searchSecondCidByTitle?cid=${cid}&title=${title}`)
  },
  searchSecondCidByPrice(cid, price) {
    return axios.get(`/searchSecondCidByPrice?cid=${cid}&price=${price}`)
  },
  searchSecondCidByCon(cid, con) {
    return axios.get(`/searchSecondCidByCon?cid=${cid}&con=${con}`)
  },
  //生活圈
  queryShareByPage(page, pageSize) {
    return axios.get(`/queryShareByPage?page=${page - 1}&pageSize=${pageSize}`)
  },
  getShareTotal() {
    return axios.get('/getShareTotal');
  },
  deleteShareById(params) {
    return axios.post('/deleteShareById', params)
  },
  searchShareByCon(con) {
    return axios.get(`/searchShareByCon?con=${con}`)
  },
  searchShareByUser(user) {
    return axios.get(`/searchShareByUser?user=${user}`)
  },
  searchShareByUschool(school) {
    return axios.get(`/searchShareByUschool?school=${school}`)
  },
  queryShareCidByPage(cid, page, pageSize) {
    return axios.get(`/queryShareCidByPage?cid=${cid}&page=${page - 1}&pageSize=${pageSize}`)
  },
  queryShareCidTotal(cid) {
    return axios.get(`/queryShareCidTotal?cid=${cid}`)
  },
  searchShareCidByCon(cid,con) {
    return axios.get(`/searchShareCidByCon?cid=${cid}&con=${con}`)
  },
  //用户
  getUserByType(page, pageSize) {
    return axios.get(`/getUserByType?page=${page - 1}&pageSize=${pageSize}`)
  },
  getUserTotal() {
    return axios.get('/getUserByTypeTotal');
  },
  deleteUserById(params) {
    return axios.post('/deleteUserById', params)
  },
  searchUser(name) {
    return axios.get(`/searchUser?name=${name}`);
  },
  queryAdminUser(page,pageSize) {
    return axios.get(`/queryAdminUser?page=${page - 1}&pageSize=${pageSize}`);
  },
  queryAdminUserTotal() {
    return axios.get(`queryAdminUserTotal`);
  },
  searchAdminUser(name) {
    return axios.get(`/searchAdminUser?name=${name}`)
  },
  insertAdminUser(params) {
    return axios.post('/insertAdminUser',params)
  }
}

export default api

