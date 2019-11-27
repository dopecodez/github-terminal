const chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('..src/cli');

// Configure chai
chai.use(chaiHttp);
let expect = chai.expect;
