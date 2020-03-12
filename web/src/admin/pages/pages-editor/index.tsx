import React from 'react';
import PageEditor from '../../modules/page-editor';
import WidgetLayout from '../../components/common/WidgetLayout';

export default () => {
    return (
        <WidgetLayout title="Редактор страницы" contentWithoutPadding={true}>
            <PageEditor/>
        </WidgetLayout>
    );
}
