import React from 'react';
import PageTree from '../../modules/page-tree';
import WidgetLayout from '../../components/common/WidgetLayout';

export default () => {
    return (
        <WidgetLayout title="Иерархия страниц">
            <PageTree/>
        </WidgetLayout>
    );
}
