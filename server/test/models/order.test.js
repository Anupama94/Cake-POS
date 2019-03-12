const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');

chai.should();
let sandbox;

describe('order model schema test suite', () => {
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

    it('should return all required fields in the order schema', (done) => {
        mongoose.models = {};
        mongoose.modelSchemas = {};
        const Item = proxyquire('../../api/models/order', {
            '../../api/db/connect': {}
        });

        const order = new Item({
            _id: mongoose.Types.ObjectId,
            items: [{ product: 'test-product1', quantity: 1 }, { product: 'test-product2', quantity: 2 }],
            customer: 'Table-number',
            status: 'open',
            creator: 'waiter-id',
            time: new Date(),
            totalPrice: 300
        });
        order.should.be.instanceof(mongoose.Model);
        done();
    });
});
