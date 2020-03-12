import React from 'react';
import cn from 'classnames';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import styles from './PageModuleRenderer.module.scss';
import Dropdown from '../../../../../../../components/common/Dropdown';
import {PageModule} from '../../../../../../types';
import {EDIT_MODE} from '../../../../../index';

type PageModuleRendererProps = {
    pageModules: Array<PageModule>,
    changePageModules: (pageModules: Array<PageModule>) => void,
    changePageModuleIndex: (index: number)=> void,
    changeMode: (mode: EDIT_MODE) => void
}

export default ({pageModules, changePageModules, changeMode, changePageModuleIndex}: PageModuleRendererProps) => {
    const onDragEnd = (result: DropResult) => {
        const {destination, source } = result;
        if (!destination || destination.index === source.index) {
            return;
        }
        const modules = Array.from(pageModules);
        modules.splice(source.index, 1);
        modules.splice(destination.index, 0, pageModules[source.index]);
        changePageModules(modules);
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="pageModules">
                {(provided) => {
                    return (
                        <div ref={provided.innerRef}
                             className={styles.PageModuleDashboard}>
                            {pageModules.map((module, i) => (
                                <Draggable draggableId={i.toString()} index={i} key={i}>
                                    {(provided) => {
                                        return (
                                            <div ref={provided.innerRef}
                                                 className={styles.PageModuleItem}
                                                 {...provided.draggableProps}>
                                                <div className={styles.PageModuleItem__dragIcon}
                                                     {...provided.dragHandleProps}>
                                                    <i className="fas fa-grip-vertical"/>
                                                </div>
                                                <div className={styles.PageModuleItem__title}>
                                                    {module.title}
                                                </div>
                                                <div className={styles.PageModuleItem__toolbar}>
                                                    <Dropdown
                                                        dropdownItems={[
                                                            {
                                                                title: 'Удалить',
                                                                onClick: () => changePageModules(
                                                                    pageModules.filter((val: any, index: number) => i !== index)
                                                                )
                                                            },
                                                            {
                                                                title: 'Редактировать',
                                                                onClick: () => {
                                                                    changeMode(EDIT_MODE.MODULE_EDITOR);
                                                                    changePageModuleIndex(i)
                                                                }
                                                            }
                                                        ]}
                                                    >
                                                        <i className={cn('fas', 'fa-cog', styles.DropDownIcon)}/>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        );
                                    }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
}
