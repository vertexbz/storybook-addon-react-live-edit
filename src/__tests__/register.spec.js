import { mount } from 'enzyme';
import LiveEditor from '../component/LiveEditor';

jest.mock('@storybook/addons');
import addonsMock from '@storybook/addons';

describe('register', () => {
    it('registers live edit plugin and panel', () => {
        require('../register');
        expect(addonsMock.register).toBeCalledTimes(1);
        expect(addonsMock.addPanel).not.toBeCalled();

        const registerCallArgs = addonsMock.register.mock.calls[0];
        const registerCallback = registerCallArgs[1];

        expect(typeof registerCallArgs[0]).toBe('string');
        expect(typeof registerCallback).toBe('function');

        registerCallback();
        expect(addonsMock.addPanel).toBeCalledTimes(1);
        expect(addonsMock.addPanel).toBeCalledWith(expect.any(String), expect.any(Object));

        const addPanelPayload = addonsMock.addPanel.mock.calls[0][1];

        expect(addPanelPayload.title).toBe('Live Edit');
        expect(typeof addPanelPayload.render).toBe('function');

        const renderedPanel = mount(addPanelPayload.render());

        expect(addonsMock.getChannel).toBeCalled();
        expect(renderedPanel.type()).toBe(LiveEditor);
        expect(renderedPanel.prop('active')).toBeTruthy();
    });

    it('registers live edit plugin and does not render panel', () => {
        require('../register');

        const registerCallback = addonsMock.register.mock.calls[0][1];

        registerCallback();

        const addPanelPayload = addonsMock.addPanel.mock.calls[0][1];

        const renderedPanel = mount(addPanelPayload.render({ active: false }));

        expect(addonsMock.getChannel).toBeCalled();
        expect(renderedPanel.type()).toBe(LiveEditor);
        expect(renderedPanel.prop('active')).toBeFalsy();
    });
});
