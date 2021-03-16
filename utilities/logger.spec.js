
const MockLogger = require('simple-node-logger').mocks.MockLogger;

describe('Logger Test', () => {

    test('Validate Test', () => {
        const log = MockLogger.createLogger('MyCategory');
        log.info('this is a log statement');
        expect(log.getLogEntries().length).toBeDefined();
    })
})