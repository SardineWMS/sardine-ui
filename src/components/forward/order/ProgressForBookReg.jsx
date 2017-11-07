import React, { PropTypes } from 'react';
import { Progress, Modal } from 'antd';
import { parse, stringify } from 'qs';
import reqwest from 'reqwest';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class ProgressForBookReg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgressModal: false,
            showConfirmModal: false,
            percent: 0,
            records: [],
            processing: false,
            recordIndex: 0,
            actionText: this.props.actionText,
            entityCaption: this.props.entityCaption,
            report: {
                total: 0,
                success: 0,
                failure: 0,
                skipped: 0
            },
            executeResult: this.props.executeResult,
            canSkipState: "",
            url: this.props.url
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.start = this.start.bind(this);
        this.abort = this.abort.bind(this);
        this.execute = this.execute.bind(this);
    };

    componentWillReceiveProps(newProps) {
        if (newProps.showProgressModal)
            this.setState({
                ...newProps,
                report: {
                    total: 0,
                    success: 0,
                    failure: 0,
                    skipped: 0
                },
                url: ""
            }); else {
            this.setState({
                ...newProps,
                report: {
                    total: 0,
                    success: 0,
                    failure: 0,
                    skipped: 0
                },
            })
        }
    };

    handleOk() {
        this.setState({
            showConfirmModal: false,
            showProgressModal: true
        }, function () {
            this.start();
        });
    };

    handleCancel() {
        this.setState({
            showConfirmModal: false,
            showProgressModal: false,
            processing: false,
            percent: 0,
            records: [],
            recordIndex: 0
        }, function () {
            this.props.hideConfirmModal();
            this.props.refreshGrid();
        });
    };

    start() {
        if (this.state.records == null || this.state.records.length == 0)
            return;

        let currPercent = this.state.percent;
        let percent = (this.state.recordIndex + 1) * Math.ceil(100 / this.props.records.length);
        let processing = this.state.processing;

        if (this.state.recordIndex + 1 > this.props.records.length) {
            return;
        };

        if (percent >= 100) {
            percent = 100;
            processing = false;
        };
        this.execute(processing, percent);
    };

    execute(processing, percent) {
        var index = this.state.recordIndex;
        let object = new Object();
        object.uuid = this.state.records[index].uuid;
        object.version = this.state.records[index].version;
        object.token = "token";
        object.bookedDate = moment(this.state.records[index].bookedDate).format("YYYY-MM-DD");
        if (this.state.records[index].state == this.state.canSkipState) {
            this.setState({
                processing: processing,
                percent,
                recordIndex: this.state.recordIndex + 1,
                report: { ...this.state.report, skipped: this.state.report.skipped + 1 }
            }, function () {
                this.start()
            })
        } else
            reqwest({
                url: this.state.url + `?${stringify(object)}`,
                method: 'PUT',
                type: 'json',
            }).then((data) => {
                if (data.status == "200") {
                    this.setState({
                        processing: processing,
                        percent,
                        recordIndex: this.state.recordIndex + 1,
                        report: { ...this.state.report, success: this.state.report.success + 1 }
                    }, function () {
                        this.start()
                    })
                } else {
                    this.setState({
                        processing: processing,
                        percent,
                        recordIndex: this.state.recordIndex + 1,
                        report: { ...this.state.report, failure: this.state.report.failure + 1 }
                    }, function () {
                        this.start()
                    })
                }
            })
    };

    abort() {
        if (this.state.processing == false) {
            return;
        };

        this.setState({
            processing: false
        });
    };

    render() {
        return (
            <div>
                <Modal title="批量处理框" visible={this.state.showConfirmModal}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    okText="确定" cancelText="取消"
                >
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {`是否批量${this.state.actionText} ${this.state.records.length} 个${this.state.entityCaption} ? `}</p>
                </Modal>
                <Modal title="可怕的进度条君" visible={this.state.showProgressModal}
                    onCancel={this.handleCancel} footer={[]} >
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <Progress percent={this.state.percent} />
                    {this.state.processing ?
                        <Button onClick={this.abort}>中断</Button> : <div><p>{this.state.recordIndex < this.state.records.length ? `正在处理第${this.state.recordIndex}个` : `批量处理完成。 `}</p>
                            <p>
                                {`总共${this.state.actionText} ${this.state.recordIndex} 个${this.state.entityCaption}。`}{`成功 ${this.state.report.success} 个。`}{`失败 ${this.state.report.failure} 个。`} {`跳过 ${this.state.report.skipped} 个。`} </p></div>
                    }
                </Modal>
            </div>
        );
    };
}

export default ProgressForBookReg;