import React, { PropTypes } from 'react'
import { Form, Input, Col, InputNumber, Select, Modal } from 'antd'
import BaseFormItem from '../../Widget/BaseFormItem';
const InputGroup = Input.Group;

const CreateBinModal = ({
  visible,
  onOk,
  onCancel,
  binTypes,
  treeData,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue()
      }
      var shelfArray = new Array();
      for(let i=0;i<treeData.length;i++){
        let wrh = treeData[i];
        for(let j=0;j<wrh.children.length;j++){
          let zone = wrh.children[j];
          for(let k=0;k<zone.children.length;k++){
            let path = zone.children[k];
            for(let q=0;q<path.children.length;q++){
              let shelf = path.children[q];
              if(shelf.key <= data.endShelf && shelf.key >= data.startShelf){
                shelfArray.push(shelf.key);
              }
            }
          }
        }
      }
      let binArray = new Array();
      let shelfCount = data.endShelf - data.startShelf + 1;
      let columnCount = data.endColumn - data.startColumn + 1;
      let levelCount = data.endLevel - data.startLevel + 1;
      for(let i=0;i<shelfArray.length;i++){
        let currentShelfForInt = parseInt(data.startShelf) + i;
        let currentShelfForString = "" + currentShelfForInt;
        let leftCount = 6 - currentShelfForString.length;
        for(let ii = 0;ii<leftCount;ii++){
          currentShelfForString = "0" + currentShelfForString;
        }
        for(let j=0;j<columnCount;j++){
          for(let k=0;k<levelCount;k++){
            binArray[i*columnCount*levelCount + j*levelCount + k] = new Object();
            binArray[i*columnCount*levelCount + j*levelCount + k].code = shelfArray[i] + (j+1) + (k+1);
            binArray[i*columnCount*levelCount + j*levelCount + k].binTypeUuid = data.binType;
            binArray[i*columnCount*levelCount + j*levelCount + k].usage = data.usage;
          }
        }
      }
      onOk(binArray);
    })
  }

  const modalOpts = {
    title: '货位新建',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  const binTypeOptions = [];
  if (binTypes) {
  for (let i = 0; i < binTypes.length; i++) {
    let binType = binTypes[i];
    binTypeOptions.push(
      <Select.Option key={binType.uuid}> {"[" + binType.code + "]" + binType.name} </ Select.Option>
    );
  }
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <BaseFormItem label="起始~截止货架：">
            {getFieldDecorator('shelf' ,{
            rules: [{ required: true, message: '起始截止货架不能为空' },],
         })(
        <InputGroup size="large">
           <Col span="6">
              {getFieldDecorator('startShelf', {
            rules: [
              {
                required: true,
                message: '起始货架未填写',
              },
            ],
          })(<Input />)}
           </Col>
           <Col span="6">
              {getFieldDecorator('endShelf', {
            rules: [
              {
                required: true,
                message: '截止货架未填写',
              },
            ],
          })(<Input />)}
          </Col>
        </InputGroup>
         )}
        </BaseFormItem>
        <BaseFormItem label="起始~截止列码：">
          {getFieldDecorator('count', {
            rules: [
              {
                required: true,
                message: '起始截止列码未填写',
              },
            ],
          })(<InputGroup size="large">
           <Col span="6">
              {getFieldDecorator('startColumn', {
            rules: [
              {
                required: true,
                message: '起始列未填写',
              },
            ],
          })(<Input />)}
           </Col>
           <Col span="6">
              {getFieldDecorator('endColumn', {
            rules: [
              {
                required: true,
                message: '截止列未填写',
              },
            ],
          })(<Input />)}
          </Col>
        </InputGroup>)}
        </BaseFormItem>
        <BaseFormItem label="起始~截止层码：">
          {getFieldDecorator('count', {
            rules: [
              {
                required: true,
                message: '起始截止层码未填写',
              },
            ],
          })(<InputGroup size="large">
           <Col span="6">
              {getFieldDecorator('startLevel', {
            rules: [
              {
                required: true,
                message: '起始层未填写',
              },
            ],
          })(<Input />)}
           </Col>
           <Col span="6">
              {getFieldDecorator('endLevel', {
            rules: [
              {
                required: true,
                message: '起始层未填写',
              },
            ],
          })(<Input />)}
          </Col>
        </InputGroup>)}
        </BaseFormItem>
        <BaseFormItem label="货位用途：">
            {getFieldDecorator('usage' ,{
            rules: [{ required: true, message: '货位用途不能为空' },],
        })(
        <Select>
                    <Select.Option value="StorageBin">存储位</Select.Option>
                    <Select.Option value="PickUpStorageBin">拣货存储位</Select.Option>
                    <Select.Option value="PickUpBin">拣货位</Select.Option>
                    <Select.Option value="UnifyReceiveStorageBin">收货暂存位</Select.Option>
                    <Select.Option value="CollectBin">集货位</Select.Option>
                    <Select.Option value="QueryRtnWrhBin">退货退仓位</Select.Option>
        </Select>
        )}
        </BaseFormItem>
        <BaseFormItem label="货位类型：">
            {getFieldDecorator('binType' ,{
            rules: [{ required: true, message: '货位类型不能为空' },],
        })(
        <Select>
                    {binTypeOptions}
        </Select>
        )}
        </BaseFormItem>
      </Form>
    </Modal>
  )
}

CreateBinModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  binTypes: PropTypes.array,
  treeData: PropTypes.array,
}

export default Form.create()(CreateBinModal);
