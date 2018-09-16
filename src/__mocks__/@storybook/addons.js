const __channel = {
    on: jest.fn(),
    emit: jest.fn(),
    removeListener: jest.fn()
};

export default {
    register: jest.fn(),
    addPanel: jest.fn(),
    getChannel: jest.fn().mockReturnValue(__channel),
    __channel
};
