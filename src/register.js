// @flow
import * as React from 'react';
import addons from '@storybook/addons';
import LiveEditor from './component/LiveEditor';
import { getOptions } from './options';

type RenderProps = {
    active: boolean,
    key?: string | number
};

addons.register('storybook/react-live-edit', (api: *): * => {
    addons.addPanel('storybook/react-live-edit/panel', {
        title: 'Live Edit',
        render({ active, key }: RenderProps = { active: true }): ?React.Element<typeof LiveEditor> {
            return <LiveEditor key={key} channel={addons.getChannel()} api={api} theme={getOptions().theme} active={active} />;
        }
    });
});
