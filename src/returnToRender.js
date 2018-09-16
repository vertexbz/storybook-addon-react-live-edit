// @flow
import { className } from './constants';

export default (code: string): string => `const thunk = (render) => {
${code}
};
    
    let renderWasCalled = false;
    
    const renderWithCheck = (element) => {
        renderWasCalled = true;
        render(element);
    };
    
    const result = thunk(renderWithCheck);
    
    if (!renderWasCalled) {
        if (React.isValidElement(result)) {
            render(result);
        } else {
            render(<div className="${className.error}">Code should return a valid react element or call 'render(element)'!</div>);
        }
    }
`;

const safeSubtractFromString = (a: string, b: number): string => String(Math.max(Number(a) - b, 0));

export const cleanupError = (error: string, linesToRemove?: number = 1): string => {
    const [dirtyHeader, ...dirtyLines] = error.split('\n');

    const subtractLineNumber = (match: string, line: string): string => match.replace(line, safeSubtractFromString(line, linesToRemove));

    const header = dirtyHeader.replace(/\(([0-9]+):[0-9]+\)$/, subtractLineNumber);

    const lines = dirtyLines
        .map((line: string): string => line.replace(/^([0-9]+)\s*:/, subtractLineNumber))
        .filter((line: string): boolean => !line.match(/^\s*0+\s*:/));

    return [header, ...lines].join('\n');
};
