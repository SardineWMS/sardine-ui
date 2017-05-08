import React, { PropTypes } from 'react'
import {Form,Calendar,Modal} from 'antd';
import moment from 'moment';

const DateModal=({
	visible,
	orderBills=[],
	onOk,
	onCancel
})=>{
	var bookedDate=null;
	const modalOpts = {
		title: '选择日期',
		visible,
		onOk: handleOk,
		onCancel,
		wrapClassName: 'vertical-center-modal',
  	}

  	function dateOnSelect(value){
		bookedDate=value.format('YYYY-MM-DD HH:mm:ss');
  	}

  	function handleOk(){
  		orderBills.map(function(orderbill){
  			orderbill.bookedDate=bookedDate;
  		});
  		onOk(orderBills);
  	}

  return(
  	<Modal {...modalOpts}>
        <div style={{ width: 345, border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <Calendar  fullscreen={false} onSelect={dateOnSelect}/>
        </div>    
    </Modal>
  )
}

export default Form.create()(DateModal);
