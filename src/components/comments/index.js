import React from "react";
import PropTypes from 'prop-types';
import { Comment } from 'antd';
import style from './comment.less';

export default class WeeklyComments extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }

    render() {
        // eslint-disable-next-line
        const { data } = this.props;
        if (data.length) {
            return (
                <>
                    {data.map((item, index) => {
                        let time = new Date(item.commentTime).toLocaleString();
                        return (
                            <Comment
                                key={index.toString()}
                                author={<h3>{item.userName}</h3>}
                                content={(
                                    // eslint-disable-next-line
                                    <div className={style.comment} dangerouslySetInnerHTML={{ __html: item.comment }} />
                                )}
                                datetime={(
                                    <div>{time}</div>
                                )}
                            />
                        );
                    })}
                </>
            );
        } else {
            return (
                <p className={style.noComment}>暂无评论</p>
            );
        }
    }
}
