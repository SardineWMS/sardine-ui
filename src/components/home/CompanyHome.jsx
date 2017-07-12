import React, { PropTypes } from 'react';
import { Card, Upload, Button, Icon, Form, Select } from 'antd';
import BaseForm from '../Widget/BaseForm';
import SInput from '../Widget/SInput';
import STextArea from '../Widget/STextArea';
import styles from '../less/common.less';
import homeStyles from '../less/Home.less';

class CompanyHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    const notifyTitle = <p><Icon type="notification" />&nbsp;<b>下发通知</b></p>;
    const messageTitle = <p><Icon type="message" />&nbsp;<b>消息</b></p>;
    const FormItem = Form.Item;
    const baseFormItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 }
    };
    const baseClassName = styles.normalInput;
    let {fileList, form} = this.state;
    let getFieldDecorator = form.getFieldDecorator;
    if (!fileList)
      fileList = [];
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [...fileList],
    };
    const items = [];
    items.push(<SInput key="theme" label="主题" fieldName="theme" getFieldDecorator={getFieldDecorator} isTop rules="[{
              required: true, message: '请输入通知主题！',
            }, { max: 30, message: '仓库名称最大长度是30！' }]" />);
    items.push(<Form.Item label="下发对象" {...baseFormItemLayout} className={baseClassName} key="who">
                 {getFieldDecorator("who", {
                  rules: [{ required: true, message: '下发对象必须输入！' }]
                 })(
                  <Select>
                      <Select.Option key="1号仓">
                        1号仓
                      </Select.Option>
                      <Select.Option key="2号仓">
                        2号仓
                      </Select.Option>
                  </Select> 
                 )}
               </Form.Item>);
    items.push(<Form.Item label="只管理员可见" {...baseFormItemLayout} className={baseClassName} key="adminCan">
                 {getFieldDecorator("adminCan", {
                  rules: [{ required: true, message: '下发对象必须输入！' }],initialValue: '1'
                 })(
                  <Select>
                      <Select.Option key="1">
                        是
                      </Select.Option>
                      <Select.Option key="0">
                        否
                      </Select.Option>
                  </Select> 
                 )}
               </Form.Item>);
    items.push(<STextArea key="content" label="通知内容" fieldName="content" getFieldDecorator={getFieldDecorator} rules="[{
              required: true, message: '请输入通知内容！',
            }, { max: 1000, message: '通知内容最大长度是1000！' }]" />);  
    items.push(<Form.Item label="图片" {...baseFormItemLayout} className={baseClassName} key="upload">
                 {getFieldDecorator("picture")(
                  <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传图片
                      </Button>
                  </Upload> 
                 )}
               </Form.Item>);
    return (
      <div style={{'padding-top': '5px', 'padding-left': '5px', height: '100%'}}>
      <div style={{'float': 'left', width: '49%'}}>
         <Card title={notifyTitle} bordered={true} noHovering={true} >
           <BaseForm items={items} />
         </Card>
         <div style={{height: '5px'}}>&nbsp;</div>
      </div>
      <div style={{'float': 'left'}}>&nbsp;</div>
      <div style={{'float': 'left', width: '50%'}}>
         <Card title={messageTitle} bordered={true} noHovering={true} >
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月18号系统升级，请各位知悉！鬼地方个地方郭德纲鬼地方个地方郭德纲发发鬼地方个梵蒂冈地方和发个梵蒂冈地方官</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月19号系统升级，请各位知悉！</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月20号系统升级，请各位知悉！</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月21号系统升级，请各位知悉！</b></a></li></p>
         </Card>
         <div style={{height: '5px'}}>&nbsp;</div>
         <Card title={<b>已下发的通知</b>} bordered={true} noHovering={true} >
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月18号系统升级，请各位知悉！鬼地方个地方郭德纲鬼地方个地方郭德纲发发鬼地方个梵蒂冈地方和发个梵蒂冈地方官</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月19号系统升级，请各位知悉！</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月20号系统升级，请各位知悉！</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月21号系统升级，请各位知悉！</b></a></li></p>
         </Card>
         <div style={{height: '5px'}}>&nbsp;</div>
         <Card title={<b>反馈的意见</b>} bordered={true} noHovering={true} >
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月18号系统升级，请各位知悉！鬼地方个地方郭德纲鬼地方个地方郭德纲发发鬼地方个梵蒂冈地方和发个梵蒂冈地方官</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月19号系统升级，请各位知悉！</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月20号系统升级，请各位知悉！</b></a></li></p>
           <p style={{'line-height': '25px', 'padding-left': '10px'}}><li><a><b>2017-7-11 系统管理员：7月21号系统升级，请各位知悉！</b></a></li></p>
         </Card>
      </div>
      </div>
    );
  }
}

export default Form.create()(CompanyHome);