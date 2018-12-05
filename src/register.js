// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import LiveEditor from './component/LiveEditor';
import { getOptions } from './options';

addons.register('storybook/react-live-edit', (api: *): * => {
    addons.addPanel('storybook/react-live-edit/panel', {
        title: 'Live Edit',
        render({ active }): React.Element<typeof LiveEditor> {
            return active ? (
                <LiveEditor channel={addons.getChannel()} api={api} theme={getOptions().theme} />
            ) : null;
        }
    });
});
