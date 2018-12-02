import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { event } from '../../constants';
import LivePreview from '../../component/LivePreview';
import ErrorDisplay from '../../component/ErrorDisplay';

import addonsMock from '@storybook/addons';
import { setOptions } from '../../options';

describe('LiveSource', () => {
    it('should display error', () => {
        const channel = addonsMock.getChannel();
        const code = 'source code';
        const scope = {};

        const wrapper = shallow(
            <LivePreview channel={channel} code={code} scope={scope} />
        );


        expect(addonsMock.__channel.on).toBeCalledTimes(1);
        expect(addonsMock.__channel.on).toBeCalledWith(event.UpdateSource, expect.any(Function));

        expect(addonsMock.__channel.emit).toBeCalledTimes(1);
        expect(addonsMock.__channel.emit).toBeCalledWith(event.LoadSource, code);


        expect(wrapper.find(ErrorDisplay).exists()).toBeTruthy();


        wrapper.unmount();
        expect(addonsMock.__channel.removeListener).toBeCalledTimes(1);
        expect(addonsMock.__channel.removeListener).toBeCalledWith(event.UpdateSource, expect.any(Function));

        expect(addonsMock.__channel.emit).toBeCalledTimes(2);
        expect(addonsMock.__channel.emit).toBeCalledWith(event.LoadSource, null);
    });

    it('should work properly', () => {
        const channel = addonsMock.getChannel();
        const code = 'return <div id="test-subject" />';
        const scope = { React };

        setOptions({ presets: ['react'] });

        addonsMock.__channel.emit.mockClear();
        addonsMock.__channel.on.mockClear();
        addonsMock.__channel.removeListener.mockClear();

        const wrapper = mount(
            <LivePreview channel={channel} code={code} scope={scope} />
        );


        expect(addonsMock.__channel.on).toBeCalledTimes(1);
        expect(addonsMock.__channel.on).toBeCalledWith(event.UpdateSource, expect.any(Function));

        expect(addonsMock.__channel.emit).toBeCalledTimes(1);
        expect(addonsMock.__channel.emit).toBeCalledWith(event.LoadSource, code);


        expect(wrapper.find('#test-subject').exists()).toBeTruthy();


        wrapper.unmount();
        expect(addonsMock.__channel.removeListener).toBeCalledTimes(1);
        expect(addonsMock.__channel.removeListener).toBeCalledWith(event.UpdateSource, expect.any(Function));

        expect(addonsMock.__channel.emit).toBeCalledTimes(2);
        expect(addonsMock.__channel.emit).toBeCalledWith(event.LoadSource, null);
    });
});
