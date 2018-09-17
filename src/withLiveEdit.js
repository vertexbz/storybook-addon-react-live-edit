// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import LiveSource from './component/LiveSource';
import { symbol } from './constants';

export default (source: string, scope?: $Subtype<{}>): * =>
    // eslint-disable-next-line react/display-name
    (context: any): React.Element<typeof LiveSource> => (
        <LiveSource channel={addons.getChannel()} code={source} scope={{ ...context[symbol.Scope], ...scope }} />
    );
