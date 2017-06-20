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
		wrapClassName: 'vertical-center-modal'
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
			<div style={{ width: 200 }}>
				<DatePicker onChange={dateOnSelect} format='YYYY-MM-DD' />
			</div>
		</Modal>
	);
};

export default Form.create()(DateModal);
