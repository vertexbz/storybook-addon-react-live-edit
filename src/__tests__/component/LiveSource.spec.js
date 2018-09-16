import * as React from 'react';
import { shallow } from 'enzyme';
import { LivePreview, LiveProvider } from 'react-live';
import { event } from '../../constants';
import LiveSource from '../../component/LiveSource';
import PreviewStyle from '../../component/PreviewStyle';
import LiveError from '../../component/LiveError';

import addonsMock from '@storybook/addons';

describe('LiveSource', () => {
    it('should work properly', () => {
        const channel = addonsMock.getChannel();
        const code = 'source code';
        const scope = {};

        const wrapper = shallow(
            <LiveSource channel={channel} code={code} scope={scope} />
        );


        expect(addonsMock.__channel.on).toBeCalledTimes(1);
        expect(addonsMock.__channel.on).toBeCalledWith(event.UpdateSource, expect.any(Function));

        expect(addonsMock.__channel.emit).toBeCalledTimes(1);
        expect(addonsMock.__channel.emit).toBeCalledWith(event.LoadSource, code);


        expect(wrapper.find(LiveProvider).prop('code')).toBe(code);
        expect(wrapper.find(LiveProvider).prop('scope')).toBe(scope);

        expect(wrapper.find(LiveProvider).find(LivePreview).exists()).toBeTruthy();
        expect(wrapper.find(LiveProvider).find(PreviewStyle).exists()).toBeTruthy();
        expect(wrapper.find(LiveProvider).find(LiveError).exists()).toBeTruthy();


        wrapper.unmount();
        expect(addonsMock.__channel.removeListener).toBeCalledTimes(1);
        expect(addonsMock.__channel.removeListener).toBeCalledWith(event.UpdateSource, expect.any(Function));

        expect(addonsMock.__channel.emit).toBeCalledTimes(2);
        expect(addonsMock.__channel.emit).toBeCalledWith(event.LoadSource, null);
    });
});
