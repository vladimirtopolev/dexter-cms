import React from 'react';
import {LinkValue} from '../../../admin/modules/page-editor/mode-types/module-editor/value-types/link-value/LinkValue';
import {Link} from 'react-router-dom';


type LinkProps = {
    link: LinkValue,
    className?: string
}
export default ({className, link: {value, title}}: LinkProps) => {
    return <Link className={className} to={value}>{title}</Link>;
}
