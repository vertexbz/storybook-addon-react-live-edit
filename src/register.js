// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import LiveEditor from './component/LiveEditor';
import { getOptions } from './options';

type RenderProps = {
    active?: boolean
};

addons.register('storybook/react-live-edit', (api: *): * => {
    addons.addPanel('storybook/react-live-edit/panel', {
        title: 'Live Edit',
        render({ active }: RenderProps = { active: true }): ?React.Element<typeof LiveEditor> {
            return active ? <LiveEditor channel={addons.getChannel()} api={api} theme={getOptions().theme} /> : null;
        }
    });
});
