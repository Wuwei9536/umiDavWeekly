import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
// import style from './select-view.less';

const FormItem = Form.Item;
const Option = Select.Option;
export default class SelectView extends React.Component {
    static defaultProps = {
        onChange: () => { },
        quarter: 0
    }

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any).isRequired, // option数据
        onChange: PropTypes.func,
        defaultValue: PropTypes.string.isRequired,
        quarter: PropTypes.number
    }

    render() {
        const { data, onChange, defaultValue, quarter } = this.props;
        let judgeWay;
        return (
            <FormItem>
                <Select defaultValue={defaultValue} style={{ width: 190 }} onChange={(e) => { onChange(e); }}>
                    {data.map((item, index) => {
                        if (quarter) {
                            judgeWay = (index >= quarter) && true;
                        } else {
                            judgeWay = (index > 1) && true;
                        }
                        return (
                            <Option
                                value={item}
                                key={index.toString()}
                                disabled={judgeWay}
                            >
                                {item}
                            </Option>
                        );
                    })}
                </Select>
            </FormItem>
        );
    }
}
