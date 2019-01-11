import React from "react";
import PropTypes from 'prop-types';
import { Input, Button, Timeline, Form } from 'antd';
import style from './index.less'

class LineTime extends React.Component {
    constructor() {
        super();
        this.state = {
            timeline: [{}],
        }
    }

    componentDidMount() {
        const { onTarget } = this.props;
        onTarget(this);
    }

    addTimeline = () => {
        const { form: { validateFields, getFieldsValue } } = this.props;
        validateFields((errors, values) => {
            if (!errors) {
                this.setState((prevState) => ({
                    timeline: prevState.timeline.concat([{}])
                }));
            }
        });
        const values = getFieldsValue()
        console.log('%cvalues: ', 'font-size:15px;background-color: rgb(135, 208, 104);', values);
    }

    render() {
        const { timeline } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Timeline>
                    {timeline.map((item, index) => {
                        return (
                            <Timeline.Item key={index.toString()}>
                                <Form.Item>
                                    {getFieldDecorator('target' + index, {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your target',
                                        }],
                                    })(
                                        <Input prefix={<span>{index + 1 + '.'}</span>} />
                                    )}
                                </Form.Item>
                            </Timeline.Item>
                        )
                    })}
                </Timeline>
                <Button type="dashed" className={style.resultButton} onClick={this.addTimeline}>添加关键结果</Button>
            </>
        )
    }
}
const LineTimeForm = Form.create()(LineTime);
export default LineTimeForm;