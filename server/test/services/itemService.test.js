const proxyquire = require('proxyquire');
const mongoose = require('mongoose');
const Item = require('')
const sinon = require('sinon');
const should = require('should');

require('sinon-mongoose');

let sandbox;

describe('services test suite', () => {
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        global.config = {
            mongodb: {
                connectionString: ''
            }
        };
        var Item = mongoose.model('Item');
        var ItemMock = sinon.mock(Item);
    });

    afterEach(() => {
        sandbox.restore();
        global.config = {};
    });

    // it('should return the item from database for the provided item id', (done) => {
    //     const itemModelMock = {
    //         findById: function() {
    //             return this;
    //         },
    //         exec: function(){
    //             return Promise.resolve([
    //                 {
    //                     name: 'Water Bottle',
    //                     price: 80,
    //                     id: '5c63a27345a37036e8c92cf9',
    //                     category: 'beverage'
    //                 }
    //             ]);
    //         }
    //
    //     };
    //
    //     const itemService = proxyquire('../../api/services/itemService', {
    //         '../models/item': itemModelMock
    //     });
    //
    //     itemService
    //         .getItemById('123')
    //         .then((result) => {
    //             should.exist(result);
    //             result.data.name.should.be.equal('Water Bottle');
    //             done();
    //         })
    //         .catch((err) => {
    //             should.not.exist(err);
    //             done();
    //         });
    //
    // });


    it('should return the item from database for the provided item id', (done) => {
        ItemMock
            .expects('findById').withArgs('123')
            .chain('exec')
            .resolves(
                {
                    name: 'Water Bottle',
                    price: 80,
                    id: '5c63a27345a37036e8c92cf9',
                    category: 'beverage'
                }
            );

        const itemService = proxyquire('../../api/services/itemService', {
            '../models/item': ItemMock
        });

        itemService
            .getItemById('123')
            .then((result) => {
                should.exist(result);
                result.data.name.should.be.equal('Water Bottle');
                done();
            })
            .catch((err) => {
                should.not.exist(err);
                done();
            });

    });
});
