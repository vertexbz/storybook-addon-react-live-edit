import {configure} from '@storybook/react';
import {setOptions} from '../../dist';

setOptions({ theme: 'darcula', presets: ['react'] });

configure(() => require('../index.js'), module);
