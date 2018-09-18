// @flow
import * as React from 'react';
import {storiesOf, setAddon} from '@storybook/react';
import LiveEdit, { withLiveEditScope } from '../dist';

setAddon(LiveEdit);

storiesOf('Example', module)
    .addDecorator(withLiveEditScope({ React, scopeTest: 'Passed!' }))
    .addLiveSource('Demo', `return <div style={{ padding: '10px', border: '1px solid red', margin: 10 }}>demo</div>;`)
    .addLiveSource('Demo 2', `return <div style={{ padding: '10px', border: '3px solid blue', margin: 10 }}>{scopeTest}</div>`, {
        localScopeTest: 'Passed as well!',
        Test: ({ text }) => <b style={{ fontSize: 'xx-large', color: 'orange'}}>{text}</b>
    })
    .add('Static source', () => <div />);
