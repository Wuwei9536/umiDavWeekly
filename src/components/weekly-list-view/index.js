import React from "react";
import PropTypes from 'prop-types';
import ListItem from './weekly-list-item';


export default class ListView extends React.Component {
    static defaultProps = {
        qweeks: []
    }

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        qweeks: PropTypes.arrayOf(PropTypes.any),
        onButtonClick: PropTypes.func.isRequired,
        onDetailsClick: PropTypes.func.isRequired
    }

    render() {
        const { data, qweeks, onButtonClick, onDetailsClick } = this.props;
        return (
            <>
                {data.map((item, index) => {
                    let bool = false;
                    let box = {};
                    for (let i in qweeks) {
                        if (qweeks[i].weeklyVo.month === item.month && qweeks[i].weeklyVo.week === item.week) {
                            bool = true;
                            box = {
                                details1: qweeks[i].details1,
                                details2: qweeks[i].details2,
                                id: qweeks[i].weeklyVo.weeklyId,
                                commentCount: qweeks[i].commentCount,
                                weeklyType1:qweeks[i].weeklyType1,
                                weeklyType2:qweeks[i].weeklyType2
                            };
                        }
                    }
                    return (
                        <ListItem
                            key={index.toString()}
                            data={item}
                            bool={bool}
                            box={box}
                            index={index}
                            onButtonClick={onButtonClick}
                            onDetailsClick={onDetailsClick}
                        />
                    );
                })}
            </>
        );
    }
}
