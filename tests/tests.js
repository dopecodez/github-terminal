const expect = require('chai').expect,
    cli = require('./cliTester.js'),
    app = require('../src/cli.js'),
    bddStdin = require('bdd-stdin'),
    constants = require('../commons/constants.js'),
    { EOL } = require('os');

describe('ght e2e tests', () => {
    it('user search e2e test', async function () {
        let response = await cli.execute(
            'bin/main.js',
            ['-u', '-k', 'dopecodez', '-f']
        );
        response = response.trim().split(EOL);
        response = response[0];
        expect(response).to.match(/(?=.*id)(?=.*node_id).*/);
    });

    it('repo search e2e test', async function () {
        let response = await cli.execute(
            'bin/main.js',
            ['-s', '-k', 'python-pygame-snake', '-f']
        );
        response = response.trim().split(EOL);
        response = response[0];
        expect(response).to.match(/(?=.*id)(?=.*node_id).*/);
    });

    it('repo search failure', async function () {
        let response = await cli.execute(
            'bin/main.js',
            ['-s', '-k', '-f']
        );
        expect(response.trim()).to.equal(
            'Option requires argument: -k (alias for --keyword)'
        );
    });

    it('repo options failure', async function () {
        let response = await cli.execute(
            'bin/main.js',
            ['-s', '-k', 'efr23ewr3ewgregregree', '-f']
        );
        expect(response.trim()).to.equal(
            constants.MESSAGES.ERRORS.NO_SEARCH_RESULT
        );
    });
});

describe('ght unit tests', () => {
    it('keyword input test fn:getKeyWord', async function () {
        bddStdin('answer', '\n');
        let response = await app.getKeyWord('type keyword');
        expect(response).to.equal(
            'answer'
        );
    });

    it('action choice test fn:getAction', async function () {
        bddStdin(bddStdin.keys.down, '\n');
        let response = await app.getAction('type keyword');
        expect(response).to.equal(
            constants.MESSAGES.ACTIONS[1]
        );
    });

    it('choose between options test fn:chooseBetweenOptions', async function () {
        bddStdin(bddStdin.keys.down, bddStdin.keys.down, '\n');
        let choices = [
            'one',
            'two',
            'three'
        ];
        let response = await app.chooseBetweenOptions(choices);
        expect(response).to.equal(
            choices[2]
        );

    });

    it('parse arguments into options test fn:parseArgumentsIntoOptions', async function () {
        let args = [
            '-k',
            'keyword',
            '-u',
            '-f'
        ];
        let response = await app.parseArgumentsIntoOptions(args);
        expect(response).to.deep.equal(
            {
                search: null,
                user: true,
                keyword: null,
                number: constants.NO_OF_RESULTS,
                first: true
            }
        );
    });
});
