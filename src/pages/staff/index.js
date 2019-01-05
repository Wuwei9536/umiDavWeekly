import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "dva";
import { Form, Card, Spin, Select } from 'antd';

const Option = Select.Option;
class StaffList extends React.Component {

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    render() {
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        return (
            <>
                <Card>
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Tags Mode"
                        onChange={this.handleChange}
                    >
                        {children}
                    </Select>
                </Card>
            </>
        )
    }
}

export default StaffList;