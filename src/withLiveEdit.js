// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import LivePreview from './component/LivePreview';
import { symbol } from './constants';

export default (source: string, scope?: $Subtype<{}>): * =>
    // eslint-disable-next-line react/display-name
    (context: any): React.Element<typeof LivePreview> => {
        return (
            <LivePreview channel={addons.getChannel()} code={source} scope={{ ...context[symbol.Scope], ...scope }}/>
        );
    };
