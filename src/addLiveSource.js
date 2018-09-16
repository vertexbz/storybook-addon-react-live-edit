// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import LiveSource from './component/LiveSource';
import { symbol } from './constants';

export default {
    addLiveSource(kind: string, source: string, scope?: $Subtype<{}>): * {
        return this.add(kind, (context: any): React.Element<typeof LiveSource> => (
            <LiveSource channel={addons.getChannel()} code={source} scope={{ ...context[symbol.Scope], ...scope }} />
        ));
    }
};
