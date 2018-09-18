const themeNameToVarName = (theme) => (theme || '')
    .replace(/-([a-z])/gi, (match, letter) => letter.toUpperCase())
    .replace(/\..*/, '')
    .replace(/^[0-9]/, (match) => `n${match}`);

module.exports = {
    themeNameToVarName
};
