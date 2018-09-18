// @codegen
const fs = require('fs');
const path = require('path');
const { themeNameToVarName } = require('./utils');

const themePathInModules = 'codemirror/theme';
const modulesPath = path.normalize(path.join(__dirname, '../../..', 'node_modules'));
const themePath = path.join(modulesPath, themePathInModules);

const themes = fs.readdirSync(themePath)
    .map((theme) => ([
        path.join(themePath, theme),
        themeNameToVarName(theme)
    ]));

themes.push([path.join(modulesPath, 'codemirror/lib/codemirror.css'), 'default']);

module.exports = themes.map(([path, name]) => {
    const css = '`' + fs.readFileSync(path) + '`';
    if (name === 'default') {
        return `export default ${css};`;
    }

    return `export const ${name} = ${css};`;
}).join('\n');
