import React from 'react';
import { Form } from 'antd';
import styles from '../less/common.less';

class BaseForm extends React.Component {

  render() {
    return (
      <Form horizontal className={styles.baseForm}>
        {this.props.items}
      </Form>
    );
  };
};

export default BaseForm;
