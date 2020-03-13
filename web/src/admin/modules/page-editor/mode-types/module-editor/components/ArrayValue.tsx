import _ from 'lodash';
import cn from 'classnames';
import React from 'react';

import {ArrayDescription} from '../../../../types';
import {Draggable, DraggableProvided, Droppable, DragDropContext, DropResult} from 'react-beautiful-dnd';
import Button from '../../../../../components/common/Button';
import {regenerateState} from '../helpers/regenerateState';


import styles from './ArrayValue.module.scss';
import Dropdown from '../../../../../components/common/Dropdown';
import {BuildAdminEditElementProps} from '../helpers/buildAdminEditElement';

interface ArrayValueComponentProps extends BuildAdminEditElementProps {
    description: ArrayDescription
}

const ArrayValue = ({
                        path,
                        description,
                        state,
                        changeState,
                        changeModulePath
                    }: ArrayValueComponentProps) => {

    const arrayValues = _.get(state, path, []);
    const titleTemplate = _.template(description.title);

    const renderArrayValue = (index: number, provided: DraggableProvided) => {
        const regeneratedValue = regenerateState({
            path: '',
            description: description.item,
            state: _.get(state, `${path}.${index}`)
        });
        const title = titleTemplate(regeneratedValue);
        return (
            <React.Fragment>
                <div{...provided.dragHandleProps}
                    className={styles.ValueItem__dragIcon}>
                    <i className="fas fa-grip-vertical"/>
                </div>
                <div className={styles.ValueItem__title}>
                    {title}
                </div>
                <div className={styles.ValueItem__toolbar}>
                    <Dropdown
                        dropdownItems={[
                            {
                                title: 'Удалить',
                                onClick: () => {
                                    changeState(`${path}.${index}`, null, true);
                                }
                            },
                            {
                                title: 'Редактировать',
                                onClick: () => {
                                    changeModulePath(`${path}.${index}`);
                                }
                            }
                        ]}
                    >
                        <i className={cn('fas', 'fa-cog', styles.DropDownIcon)}/>
                    </Dropdown>
                </div>
            </React.Fragment>);
    };

    // TODO
    const onDragEnd = (result: DropResult) => {
        const {destination, source } = result;
        if (!destination || destination.index === source.index) {
            return;
        }
        const values = Array.from(arrayValues);
        values.splice(source.index, 1);
        values.splice(destination.index, 0, arrayValues[source.index]);
        changeState(path, values);
    };

    return (
        <div className={styles.ArrayValue}>
            <div className={styles.ArrayValue__title}>Элементы списка</div>
            <div className={styles.ArrayValue__toolbar}>
                <Button onClick={() => {
                    const nextIndex = arrayValues.length;
                    changeState(`${path}.${nextIndex}`, undefined);
                }}>
                    Добавить элемент
                </Button>
            </div>
            <div className={styles.ArrayValue__dashboard}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={path} type={path}>
                        {(provided) => {
                            return (
                                <div
                                    ref={provided.innerRef}>
                                    {arrayValues.map((item: any, i: number) => {
                                        return (
                                            <Draggable key={i} draggableId={`${path}.${i}`} index={i}>
                                                {(provided) => {
                                                    return (
                                                        <div className={styles.ValueItem}
                                                             key={i}
                                                             ref={provided.innerRef}
                                                             {...provided.draggableProps}>
                                                            {renderArrayValue(i, provided)}
                                                        </div>
                                                    );
                                                }}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            );
                        }}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default ArrayValue;
