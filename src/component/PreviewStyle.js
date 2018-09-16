// @flow
import * as React from 'react';
import { className } from '../constants';

const previewCss = `
.${className.error} {
    min-width: 100%;
    box-sizing: border-box;
    padding: 5px;
    color: rgb(208, 0, 0);
    border: 1px dashed rgb(208, 0, 0);
    font-family: "Lucida Console", Monaco, monospace;
    white-space: pre;
    display: inline-block;
    font-size: 14px;
}
`;

const PreviewStyle = (): React.Element<'style'> => <style dangerouslySetInnerHTML={{ __html: previewCss }} />;

export default PreviewStyle;
