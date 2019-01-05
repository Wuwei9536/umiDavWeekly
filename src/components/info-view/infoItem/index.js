import React from "react";
import PropTypes from 'prop-types';
import { Tag, Card } from 'antd';
import style from './infoItem.less';

export default class infoItem extends React.Component {
    static defaultProps = {
        details: null
    }

    static propTypes = {
        summary: PropTypes.string.isRequired,
        odetail: PropTypes.string.isRequired,
        krDetail: PropTypes.string.isRequired,
        details: PropTypes.string
    }

    render() {
        const { summary, odetail, krDetail, details } = this.props;
        return (
            <Card className={style.cardBorderRadius}>
                <div><h3>{summary}</h3></div>
                <Tag className={style.okrTag}>
                    <div className={style.tagO}><span className={style.tagTextO}>OKR</span></div>
                    {/* eslint-disable-next-line */}
                    <div className={style.tagTextKr}>{odetail}/{krDetail}</div>
                </Tag>
                {/* eslint-disable-next-line */}
                <div className={style.textDetails} dangerouslySetInnerHTML={{ __html: details }} />
            </Card>);
    }
}
