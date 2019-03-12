const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');

chai.should();
let sandbox;

describe('item model schema test suite', () => {
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

    it('should return all required fields in the item schema', (done) => {
        mongoose.models = {};
        mongoose.modelSchemas = {};
        const Item = proxyquire('../../api/models/item', {
            '../../api/db/connect': {}
        });

        const item = new Item({
            id: mongoose.Types.ObjectId,
            name: 'test-item',
            price: 100,
            category: 'food'
        });
        item.should.be.instanceof(mongoose.Model);
        done();
    });
});
