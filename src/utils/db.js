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

/**
*   @database: { 微信开发 }
*   @desc:     { 记录调查地址 } 
    const { uid, q_0, q_1, q_2, q_3, q_4, q_5, q_6, q_7, q_8, q_9, q_10, q_11, q_12, q_13, q_14, q_15, q_16, q_17, q_18, q_19, q_20, q_21, q_22, q_23, q_24, q_25, q_26, q_27, q_28, q_29, q_30, q_31, q_32, q_33, q_34, q_35, q_36, q_37, q_38, rec_time } = params;
*/
export const addCbpcVote201910 = params =>
  axios({
    url: '/212/40cbfdf2a7.json',
    params,
  });
