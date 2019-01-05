import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Icon, Input } from 'antd';
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';
import style from './weekly-write-item.less';

const { Option, OptGroup } = Select;
const FromItem = Form.Item;

Quill.register('modules/imageDrop', ImageDrop);

class WriteItem extends React.Component {
    static defaultProps = {
        title: null,
        okr: null,
        detail: null
    }

    static propTypes = {
        title: PropTypes.string,
        okr: PropTypes.string,
        detail: PropTypes.string,
        okrs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        index: PropTypes.number.isRequired,
        placeholderTitle: PropTypes.string.isRequired,
        holder: PropTypes.shape({}).isRequired,
        takeValidateFields: PropTypes.func.isRequired,
        weeklyType: PropTypes.number.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { takeValidateFields } = this.props;
        takeValidateFields(this);
    }

    render() {
        // eslint-disable-next-line
        const { title, okr, detail, okrs, index, placeholderTitle, holder, form, weeklyType, onDelete } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        let indexDot = index + 1 + '.';
        let selectRules = {};
        let bool = (weeklyType === 3) && true; // 最后取反
        if (okr && weeklyType !== 3) {
            selectRules = {
                rules: [{ required: true, message: 'Please select your okr!' }],
                initialValue: okr
            };
        } else if (weeklyType !== 3) {
            selectRules = {
                rules: [{ required: true, message: 'Please select your okr!' }]
            };
        } else if (okr) {
            selectRules = {
                rules: [{ required: false, message: 'Please select your okr!' }],
                initialValue: okr
            };
        } else {
            selectRules = {
                rules: [{ required: false, message: 'Please select your okr!' }]
            };
        }
        return (
            <>
                <FromItem className={style.marginBottom10}>
                    {
                        getFieldDecorator('summary', {
                            rules: [{ required: !bool, message: 'Please input  summary!' }],
                            initialValue: title
                        })(
                            <Input
                                placeholder={placeholderTitle}
                                suffix={
                                    (index !== 0)
                                        ? (
                                            <Icon
                                                type="close"
                                                onClick={(e) => { onDelete(e, index, weeklyType, getFieldValue('summary')); }}
                                            />) : null
                                }
                                prefix={<span>{indexDot}</span>}
                            />
                        )
                    }
                </FromItem>
                <FromItem className={style.marginBottom10 + " " + style.marginLeft20}>
                    {
                        getFieldDecorator('krId', selectRules)(
                            <Select
                                placeholder={holder.okr}
                            >
                                {okrs.map((item, index) => {
                                    return (
                                        <OptGroup
                                            label={item.odetail}
                                            key={index.toString()}
                                        >
                                            {item.krs.map((kr) => {
                                                return (
                                                    <Option value={kr.krId} key={index.toString()}>{kr.krDetail}</Option>
                                                );
                                            })}
                                        </OptGroup>
                                    );
                                })}
                            </Select>
                        )
                    }
                </FromItem>
                {/* <FromItem className={style.marginBottom10}> */}
                {
                    getFieldDecorator('details', {
                        rules: [{ required: false }],
                        initialValue: detail
                    })(
                        <ReactQuill
                            theme="snow"
                            className={style.textarea}
                            modules={this.modules}
                            formats={this.formats}
                            onChange={this.onQuillChange}
                            placeholder={holder.content}
                        />
                    )
                }
                {/* </FromItem> */}
            </>
        );
    }
}

export default Form.create({
    onFieldsChange(props, changedFields, allValues) {
        const { weeklyType, index } = props;
        props.onChangeField(weeklyType, index, changedFields, allValues);
    }
})(WriteItem);
