import React from 'react';
import PropTypes from 'prop-types';
import WriteItem from './weely-write-item/index';

export default class WriteView extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        okrs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        holder: PropTypes.shape({}).isRequired,
        title: PropTypes.string.isRequired,
        onChangeField: PropTypes.func.isRequired,
        weeklyType: PropTypes.number.isRequired,
        takeValidateFields: PropTypes.func.isRequired,
        onDelete:PropTypes.func.isRequired
    }

    render() {
        const { data, okrs, title, holder, onChangeField, weeklyType, takeValidateFields, onDelete } = this.props;
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <WriteItem
                            key={index.toString()}
                            title={item.summary}
                            okr={item.krId}
                            detail={item.details}
                            okrs={okrs}
                            index={index}
                            placeholderTitle={title}
                            holder={holder}
                            onChangeField={onChangeField}
                            weeklyType={weeklyType}
                            takeValidateFields={takeValidateFields}
                            onDelete={onDelete}
                        />
                    );
                })}
            </>
        );
    }
}
