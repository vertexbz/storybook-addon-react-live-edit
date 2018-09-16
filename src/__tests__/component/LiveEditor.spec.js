import * as React from 'react';
import { mount } from 'enzyme';
import { Editor } from 'react-live';
import EventEmitter from 'events';
import { event } from '../../constants';
import LiveEditor from '../../component/LiveEditor';

describe('LiveEditor', () => {
    it('should work properly', () => {
        const channelSpies = {
            emit: jest.spyOn(EventEmitter.prototype, 'emit'),
            on: jest.spyOn(EventEmitter.prototype, 'on'),
            removeListener: jest.spyOn(EventEmitter.prototype, 'removeListener')
        };

        const channel = new EventEmitter();

        const wrapper = mount(<LiveEditor api={null} channel={channel} />);

        expect(wrapper.text()).toBe('Editor unavailable');

        expect(channelSpies.on).toBeCalledTimes(1);
        expect(channelSpies.on).toBeCalledWith(event.LoadSource, expect.any(Function));


        const code = 'source code';

        channel.emit(event.LoadSource, code);
        channelSpies.emit.mockClear();
        wrapper.update();


        expect(wrapper.find(Editor).exists()).toBeTruthy();
        expect(wrapper.find(Editor).prop('code')).toBe(code);


        wrapper.find(Editor).prop('onChange')('other source');

        expect(channelSpies.emit).toBeCalledTimes(1);
        expect(channelSpies.emit).toBeCalledWith(event.UpdateSource, 'other source');


        wrapper.unmount();
        expect(channelSpies.removeListener).toBeCalledTimes(1);
        expect(channelSpies.removeListener).toBeCalledWith(event.LoadSource, expect.any(Function));
    });
});
