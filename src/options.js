// @flow
import addons from '@storybook/addons';
import { event } from './constants';

const options = {
    theme: null,
    presets: undefined,
    plugins: undefined
};

export const setOptions = (customOptions: $Shape<typeof options>) => {
    addons.getChannel().emit(event.SyncOptions, Object.assign(options, customOptions));
};

export const getOptions = (): typeof options => options;
