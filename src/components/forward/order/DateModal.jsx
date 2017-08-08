import React, { PropTypes } from 'react'
import { Form, DatePicker, Modal } from 'antd';
import moment from 'moment';

const DateModal = ({
	visible,
	orderBills = [],
	onOk,
	onCancel
}) => {
	var bookedDate = null;
	const modalOpts = {
		title: '选择日期',
		visible,
		onOk: handleOk,
		onCancel,
		width:400,
		wrapClassName: 'vertical-center-modal'
	};

	const datePickerLayout = {
	  labelCol: { span: 8 },
	  wrapperCol: { span: 12 }
	};

	function dateOnSelect(value) {
		bookedDate = value;
	};

	function handleOk() {
		orderBills.map(function (orderbill) {
			orderbill.bookedDate = bookedDate;
		});
		onOk(orderBills);
	};

	return (
		<Modal {...modalOpts}>
			<div>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<DatePicker onChange={dateOnSelect} format='YYYY-MM-DD' style={{ width: 200 }} {...datePickerLayout}/>
			</div>
		</Modal>
	);
};

export default Form.create()(DateModal);
