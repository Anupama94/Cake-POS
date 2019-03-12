const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');

chai.should();
let sandbox;

describe('user model schema test suite', () => {
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        global.config = {
            mongodb: {
                connectionString: ''
            }
        };
    });

    afterEach(() => {
        sandbox.restore();
        global.config = {};
    });

    it('should return all required fields in the user schema', (done) => {
        mongoose.models = {};
        mongoose.modelSchemas = {};
        const Item = proxyquire('../../api/models/user', {
            '../../api/db/connect': {}
        });

        const user = new Item({
            id: 'test-id',
            userame: 'test-username',
            email: 'test-email',
            password: 'test-password'
        });
        user.should.be.instanceof(mongoose.Model);
        done();
    });
});
