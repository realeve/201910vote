import { axios } from './axios';

/**
*   @database: { 微信开发 }
*   @desc:     { 用户登录信息查询 } 
    const { card_no, user_name } = params;
*/
export const getViewCbpcUserList = params =>
  axios({
    url: '/41/bdcb547de9.json',
    params,
  });
