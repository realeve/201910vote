import React, { useState, useEffect } from 'react';
import { Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import FormComponent from '@/components/FormComponent';
import router from 'umi/router';
import * as userLib from '@/utils/user';
import * as db from '@/utils/db.js';

function NewPage({ paper: initData, dispatch }: any) {
  const [state, setState] = useState<string[]>([]);

  const updateState = logInfo => {
    dispatch({
      type: 'common/setStore',
      payload: {
        logInfo,
      },
    });
  };
  useEffect(() => {
    let res = userLib.loadLoginfo();
    if (res.uid) {
      // 跳转至题目页面
      router.push('/paper');
      updateState(res);
    }
  }, []);

  const onChange = (v: string[]) => {
    userLib.setPaperData(v);
    dispatch({
      type: 'common/setStore',
      payload: {
        pay: v,
      },
    });
    setState(v);
  };

  const [loading, setLoading] = useState(false);
  const [showErr, setShowErr] = useState(initData.length === 0 ? {} : { msg: '' });

  const onSubmmit = async () => {
    if (loading) {
      // 不重复提交
      return;
    }
    setLoading(true);

    db.getViewCbpcUserList({ card_no: state[1], user_name: state[0] }).then(res => {
      setLoading(false);
      if (res.rows === 0) {
        Toast.fail('登录失败');
        return;
      }
      userLib.saveLoginfo(res.data[0]);
      updateState(res.data[0]);
      router.push('/paper');
    });
  };

  return (
    <div>
      <div className={styles.content}>
        <WingBlank>
          <h3>员工归属感调查问卷</h3>
          <p>1、本调查旨在了解您对公司工作环境的需求，诊断公司存在的管理问题并进行针对性的改善。</p>
          <p>
            2、调研采用不记名方式，您的回答对我们改善组织的管理水平和领导质量有很大的帮助，请真实地表达您的意见和想法。感谢您的参与～
          </p>
          <p>（活动时间：2019年10月10日至12日）</p>
        </WingBlank>
        <div style={{ paddingLeft: 20, marginTop: 30 }}>登录</div>

        <WhiteSpace size="lg" />

        <FormComponent
          showKey={false}
          data={[
            {
              type: 'input',
              title: '姓名',
              data: '',
            },
            {
              type: 'input',
              title: '卡号',
              data: '',
            },
          ]}
          onChange={onChange}
          state={state}
          showErr={showErr}
        />

        <WhiteSpace size="lg" />
      </div>
      <WingBlank>
        <Button type="primary" onClick={onSubmmit} loading={loading} disabled={loading}>
          登录
        </Button>
      </WingBlank>
    </div>
  );
}

export default connect(({ common }: any) => ({ ...common }))(NewPage);
