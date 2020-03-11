import React from 'react';
import PageEditor from '../../modules/page-editor';
import WidgetLayout from '../../components/common/WidgetLayout';

export default () => {
    return (
        <div>
            <WidgetLayout title="Редактор страницы">
                <PageEditor/>
            </WidgetLayout>
        </div>
    )
}
