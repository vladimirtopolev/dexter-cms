import _ from 'lodash';
import cn from 'classnames';
import React from 'react';


import styles from './ArrayValue.module.scss';
import buildAdminEditElement, {BuildAdminEditElementProps} from '../helpers/buildAdminEditElement';
import {ArrayDescription} from '../../../../types';
import {Draggable, DraggableProvided, Droppable} from 'react-beautiful-dnd';

interface ArrayValueComponentProps extends BuildAdminEditElementProps {
    description: ArrayDescription
}

const ArrayValue = ({
                        path,
                        description,
                        changeState,
                        state,
                        changeMeta,
                        meta,
                        ...rest
                    }: ArrayValueComponentProps) => {

    const isEmptyList = () => _.get(state, path, []).length === 0;

    const renderItemToolbar = (i: number, provided: DraggableProvided) => {
        return (
            <div className={cn(styles.Item__toolbar, styles.Toolbar)}>
                <div className={styles.Toolbar__left}>
                    <div{...provided.dragHandleProps}
                        className={styles.Toolbar__dragArea}>
                        <i className="fas fa-grip-vertical"/>
                    </div>
                    <div className={styles.Toolbar__title}>#{i + 1} элемент</div>
                    <div className={styles.Toolbar__buttons}>
                        <button className={styles.Button}>
                            <i className="fas fa-pencil-alt"/>
                        </button>
                        <button className={styles.Button}
                                onClick={() => changeState(`${path}.${i}`, undefined, true)}
                        >
                            <i className="fas fa-trash-alt"/>
                        </button>
                    </div>
                </div>
                {/*
                <div className={styles.Toolbar__right}>
                    <Checkbox path={`${path}.${i}`}
                              changeMeta={changeMeta}
                              meta={meta}/>
                </div>*/}

            </div>
        );
    };

    return (
        <div className={styles.ArrayValue}>
            <div className={cn(styles.ArrayValue__title, 'Title')}>
                Элементы списка
            </div>
            <button
                className={cn(styles.ArrayValue__addItemBtn, 'Button')}
                onClick={() => {
                    const nextIndex = _.get(state, path, []).length;
                    changeState(`${path}.${nextIndex}`, undefined);
                }}>
                + Добавить элемент
            </button>
            <Droppable droppableId={path} type={path}>
                {(provided, snapshot) => {
                    return (
                        <div className={cn(styles.ArrayValue__value)}
                             ref={provided.innerRef}>
                            {isEmptyList() && <div className={styles.ArrayValue__emptyList}>Пустой список</div>}
                            {!isEmptyList() && _.get(state, path, [])
                                .map((item: any, i: number) => {
                                    return (
                                        <Draggable key={i} draggableId={`${path}.${i}`} index={i}>
                                            {(provided, shapsot) => {
                                                return (
                                                    <div ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         className={styles.Item}
                                                    >
                                                        {renderItemToolbar(i, provided)}
                                                        <div className={styles.Item__content}>
                                                            {
                                                                buildAdminEditElement({
                                                                    path: `${path}.${i}`,
                                                                    description: description.item,
                                                                    changeState,
                                                                    state,
                                                                    meta,
                                                                    changeMeta,
                                                                    ...rest
                                                                })
                                                            }
                                                        </div>
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
        </div>
    );
};

export default ArrayValue;
