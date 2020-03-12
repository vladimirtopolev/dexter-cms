import React from 'react';
import {NodeContentRendererProps} from '../customizeNodeContentRenderer';

export default ({node}: NodeContentRendererProps) => {
    return <span>{node.title}</span>
}
