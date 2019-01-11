import React from "react";
import PropTypes from 'prop-types';
import { Form, Card, Input, Button, Timeline } from 'antd';
import style from './index.less';
import LineTime from './timeline'

const sequence = ['一', '二', '三', '四', '五', '六', '七', '八', '九']

class EditOkrList extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [{}],
        }
        this.child = null;
        this.childData = null;
    }

    static propTypes = {
        takeChild: PropTypes.func.isRequired,
        takeGrandChildData: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { takeChild } = this.props;
        takeChild(this, this.child);
    }

    addTarget = () => {
        const { form: { validateFields }, takeGrandChildData, takeChild } = this.props;
        validateFields((errors, values) => {
            if (!errors) {
                this.child.props.form.validateFields((error, value) => {
                    if (!error)
                        this.setState((prevState) => ({
                            data: prevState.data.concat([{}])
                        }), () => {
                            takeChild(this, this.child);
                        });
                    this.childData =Object.values(this.child.props.form.getFieldsValue());
                    takeGrandChildData(this.childData);
                })
            }
        });
    }

    //拿子组件
    receiveTarget = (target) => {
        this.child = target;
    }

    render() {
        const { data } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <Card className={style.cardList} key={index.toString()}>
                            <Form>
                                <Form.Item>
                                    {getFieldDecorator('okr' + index, {
                                        rules: [{
                                            required: true,
                                            message: 'Please input your okr',
                                        }],
                                    })(
                                        <Input size='large' prefix={<span>{sequence[index] + '.'}</span>} />
                                    )}
                                </Form.Item>
                                <LineTime onTarget={this.receiveTarget} />
                            </Form>
                        </Card>
                    )
                })}
                <Button type="dashed" className={style.planButton} onClick={this.addTarget}>添加目标</Button>
            </>
        )
    }
}
const EditOkrListForm = Form.create()(EditOkrList);
export default EditOkrListForm;