import React, { useState, useEffect } from 'react';
import { Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import styles from './paper.less';
import { paperData } from '@/utils/questions';
import { connect } from 'dva';
import FormComponent from '@/components/FormComponent';
import * as R from 'ramda';
import router from 'umi/router';

import RadioComponent from '@/components/RadioComponent';
import * as userLib from '@/utils/user';
import * as db from '@/utils/db';
import * as lib from '@/utils/lib';

function NewPage({ paper: initData, user, dispatch }: any) {
  const [state, setState]: [TAnswerList, any] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showErr, setShowErr] = useState(initData.length === 0 ? {} : { msg: '' });

  const [paper, setPaper] = useState(paperData);

  const onSubmmit = async () => {
    if (loading) {
      // 不重复提交
      return;
    }
    // setLoading(true);
    Toast.success('模拟数据提交');
    return;

    db.addPwnFavoriteLogs(res)
      .then(res => {
        userLib.gotoSuccess();
      })
      .catch(e => {
        let err = e.response.data['Error Message'];
        dispatch({
          type: 'common/setStore',
          payload: {
            result: {
              title: err.includes('Duplicate')
                ? '请勿重复提交'
                : err.includes('课程已满')
                ? '课程已满，请选择其它课程'
                : '提交失败，请重试',
              status: 'warning',
            },
          },
        });
        userLib.gotoSuccess();
      });
  };
  let course = [];

  return (
    <div>
      <div className={styles.content}>
        <FormComponent data={paper} onChange={setState} state={state} showErr={showErr} />
        {course.length > 0 && (
          <RadioComponent
            title={`5.请选择你的社团课`}
            data={course}
            onChange={setState}
            idx={4}
            state={state}
            showErr={showErr}
            render={data => (
              <div>
                <p>课程: {data.groupname}</p>
                <p>老师: {data.teachername}</p>
                <p>教室: {data.classroom}</p>
                <p>允许人数: {data.users}</p>
                <p>
                  已选人数:&nbsp;
                  {chooseList.length === 0
                    ? 0
                    : (chooseList.find(item => item.name == data.classid) || { value: 0 }).value}
                </p>
              </div>
            )}
          />
        )}
        <WhiteSpace size="lg" />
      </div>
      <WingBlank>
        <Button type="primary" onClick={onSubmmit} loading={loading} disabled={loading}>
          提交
        </Button>
        <Button
          style={{ marginTop: 20 }}
          onClick={() => {
            router.push('/');
          }}
        >
          返回主页
        </Button>
      </WingBlank>
    </div>
  );
}

export default connect(({ common }: any) => ({ ...common }))(NewPage);
