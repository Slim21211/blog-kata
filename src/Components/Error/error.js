import React from 'react';
import { Alert, Space } from 'antd';
const Error = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert
      message="Something has gone wrong. Try again later"
      type="error"
      showIcon
      style={{ margin: '0 auto', width: 350, marginTop: 50 }}
    />
  </Space>
);
export default Error;
