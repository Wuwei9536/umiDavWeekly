import React from "react";
import PropTypes from 'prop-types';
import InfoItem from './infoItem';


export default class infoView extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }

    render() {
        const { data } = this.props;
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <InfoItem
                            key={index.toString()}
                            summary={item.summary}
                            odetail={item.odetail}
                            krDetail={item.krDetail}
                            details={item.details}
                        />);
                })}
            </>
        );
    }
}
