const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const CheckAuth = require('../../api/middleware/checkAuth');

chai.should();

describe("Testing API calls for the resource 'item'", () => {
    let sandbox;
    let globalConfigMock;
    let checkAuthStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        checkAuthStub = sinon.stub(CheckAuth, 'authenticate')
            .callsFake((req, res, next) => {
                next();
            });

        globalConfigMock = Object.assign({}, global.config);
        global.config = { mongodb: { connectionString: '' } };
    });

    afterEach(() => {
        sandbox.restore();
        checkAuthStub.restore();
        global.config = globalConfigMock;
    });

    it('should return true when name, price and category have valid values', (done) => {
        const req = {
            body: {
                name: 'Vege Noodles',
                price: 50.00,
                category: 'food'
            }
        };

        const validate = proxyquire('../../api/validation/validateItem', {});

        const result = validate.validateItemCreation(req);
        result.should.be.equal(true);
        done();
    });

    it('should return false when name is empty', (done) => {
        const req = {
            body: {
                name: '',
                price: 50.00,
                category: 'food'
            }
        };

        const validate = proxyquire('../../api/validation/validateItem', {});

        const result = validate.validateItemCreation(req);
        result.should.be.equal(false);
        done();
    });

    it('should return false when price is empty', (done) => {
        const req = {
            body: {
                name: 'Vege Noodels',
                price: '',
                category: 'food'
            }
        };

        const validate = proxyquire('../../api/validation/validateItem', {});

        const result = validate.validateItemCreation(req);
        result.should.be.equal(false);
        done();
    });

    it('should return false when price is an invalid entry', (done) => {
        const req = {
            body: {
                name: 'Vege Noodels',
                price: 'Fifty Rupees',
                category: 'food'
            }
        };

        const validate = proxyquire('../../api/validation/validateItem', {});

        const result = validate.validateItemCreation(req);
        result.should.be.equal(false);
        done();
    });

    it('should return false when category is a empty', (done) => {
        const req = {
            body: {
                name: 'Vege Noodels',
                price: 'Fifty Rupees',
                category: ''
            }
        };

        const validate = proxyquire('../../api/validation/validateItem', {});

        const result = validate.validateItemCreation(req);
        result.should.be.equal(false);
        done();
    });
});
