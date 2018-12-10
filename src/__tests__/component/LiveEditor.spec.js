import * as React from 'react';
import { mount } from 'enzyme';
import EventEmitter from 'events';
import { event } from '../../constants';
import LiveEditor from '../../component/LiveEditor';

jest.useFakeTimers();

describe('LiveEditor', () => {
    it('should work properly', () => { //eslint-disable-line max-statements
        document.body.createTextRange = jest.fn().mockReturnValue({
            getBoundingClientRect: jest.fn().mockReturnValue({ length: 0 }),
            getClientRects: jest.fn().mockReturnValue({ length: 0 })
        });

        const channelSpies = {
            emit: jest.spyOn(EventEmitter.prototype, 'emit'),
            on: jest.spyOn(EventEmitter.prototype, 'on'),
            removeListener: jest.spyOn(EventEmitter.prototype, 'removeListener')
        };

        const channel = new EventEmitter();

        const wrapper = mount(<LiveEditor api={null} channel={channel} active />);

        expect(wrapper.instance().codeMirror).toBeFalsy();
        expect(wrapper.text()).toBe('Editor unavailable');

        expect(channelSpies.on).toBeCalledTimes(2);
        expect(channelSpies.on).toBeCalledWith(event.LoadSource, expect.any(Function));
        expect(channelSpies.on).toBeCalledWith(event.SyncOptions, expect.any(Function));


        const code = 'source code';

        channel.emit(event.LoadSource, code);
        channelSpies.emit.mockClear();
        wrapper.update();


        expect(wrapper.find('div div').exists()).toBeTruthy();
        expect(wrapper.instance().codeMirror).toBeTruthy();


        const codeMirrorOnChangeHandler = wrapper.instance().codeMirror._handlers.change[0];

        codeMirrorOnChangeHandler({ getValue: jest.fn().mockReturnValue('other source') }, { origin: 'not setValue' });

        expect(channelSpies.emit).toBeCalledTimes(1);
        expect(channelSpies.emit).toBeCalledWith(event.UpdateSource, 'other source');


        wrapper.unmount();
        expect(channelSpies.removeListener).toBeCalledTimes(2);
        expect(channelSpies.removeListener).toBeCalledWith(event.LoadSource, expect.any(Function));
        expect(channelSpies.removeListener).toBeCalledWith(event.SyncOptions, expect.any(Function));
    });
});
