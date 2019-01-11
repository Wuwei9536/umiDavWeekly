import React from "react";
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class SelectItem extends React.Component {
    static defaultProps = {
        onChange: () => { },
        defaultValue: null
    }

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any).isRequired, // option数据
        onChange: PropTypes.func,
        defaultValue: PropTypes.number,
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { data, defaultValue } = this.props;
        return (
            <FormItem>
                {getFieldDecorator('select', {
                   initialValue:defaultValue // rules: [{ required: true, message: 'Username is required!' }],
                })(
                    <Select style={{ width: 190 }}>
                        {data.map((item, index) => {
                            return (
                                <Option
                                    value={item.deptId}
                                    key={index.toString()}
                                >
                                    {item.deptName}
                                </Option>
                            );
                        })}
                    </Select>
                )}
            </FormItem>
        );
    }
}

const SelectItemForm = Form.create({
    onFieldsChange(props, changedFields, allValues) {
        props.onChange(changedFields, allValues);
    }
})(SelectItem);
export default SelectItemForm