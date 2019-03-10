const proxyquire = require('proxyquire');
const sinon = require('sinon');
const should = require('should');
const request = require('supertest');
const HttpStatus = require('http-status-codes');
const ErrorMessages = require('../api/errorConstants');




describe("Testing API calls for the resource 'item'", function () {
    let sandbox;
    let globalConfigMock;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        CheckAuth = require('../api/middleware/checkAuth');
        checkAuthStub = sinon.stub(CheckAuth, 'authenticate')
            .callsFake(function(req, res, next) {
                return next();
            });

        globalConfigMock = Object.assign({}, global.config);
        global.config = { mongodb: {connectionString: ''}};
    });

    afterEach(function () {
        sandbox.restore();
        checkAuthStub.restore();
        global.config = globalConfigMock;
    });




  it("should return an item for given item_id", function (done) {
    let itemServiceMock = {
      getItemById: function () {

      }
    };
    let mockItem = sandbox.stub(itemServiceMock, 'getItemById')

    mockItem.returns(Promise.resolve({
      success: true,
      data: {
          "id": "5c756d337e474030ee917cea",
          "items": [
              {
                  "quantity": 1,
                  "id": "5c756d337e474030ee917cea",
                  "product": {
                      "id": "5c63a29f45a37036e8c92cfa",
                      "name": "French-Fries",
                      "price": 150,
                      "category": "food"
                  }
              }
          ],
          "status": "closed",
          "customer": "Table 5",
          "totalPrice": 2180
      }
    }));

    let item = proxyquire('../api/controllers/itemController',
      { '../services/itemService': itemServiceMock });

    let itemRoutes = proxyquire('../api/routes/itemRoute',
      { '../controllers/itemController': item })

    let app = proxyquire('../app', { './api/routes/itemRoute': itemRoutes });
    request(app).get('/items/5c756d337e474030ee917cea')
      .expect(HttpStatus.OK).end((err, res) => {
        should.not.exist(err);
        res.body.id.should.be.equal("5c756d337e474030ee917cea");
        res.body.items[0].quantity.should.be.equal(1);
        res.body.items[0].product.id.should.be.equal("5c63a29f45a37036e8c92cfa");
        res.body.items[0].product.name.should.be.equal("French-Fries");
        res.body.items[0].product.price.should.be.equal(150);
        res.body.items[0].product.category.should.be.equal("food");
        res.body.status.should.be.equal("closed");
        res.body.customer.should.be.equal("Table 5");
        res.body.totalPrice.should.be.equal(2180);
        done();
      });
  });


  it("should return an item unavailable error when an item is not found for given item id", function (done) {
    let itemServiceMock = {
      getItemById: function () {

      }
    };
    let mockItem = sandbox.stub(itemServiceMock, 'getItemById');

      mockItem.returns(Promise.resolve({
      success: true,
      message: ErrorMessages.ITEM_UNAVAILABLE.MESSAGE
    }));

    let item = proxyquire('../api/controllers/itemController',
      { '../services/itemService': itemServiceMock })
    let itemRoutes = proxyquire('../api/routes/itemRoute',
      { '../controllers/itemController': item })

    let app = proxyquire('../app', { './api/routes/itemRoute': itemRoutes });
    request(app).get('/items/1')
      .expect(HttpStatus.NOT_FOUND).end((err, res) => {
        should.not.exist(err);
        res.body.message.should.be.equal(ErrorMessages.ITEM_UNAVAILABLE.MESSAGE);
        done();
      });
  });


  it("should return all items available in the database", function (done) {
      let itemServiceMock = {
          getAllItems: function () {

          }
      };
      let mockItem = sandbox.stub(itemServiceMock, 'getAllItems');

      mockItem.returns(Promise.resolve({
              success: true,
              data: {
                  "count": 2,
                  "items": [
                      {
                          "name": "Water Bottle",
                          "price": 80,
                          "id": "5c63a27345a37036e8c92cf9",
                          "category": "beverage"
                      },
                      {
                          "name": "French-Fries",
                          "price": 150,
                          "id": "5c63a29f45a37036e8c92cfa",
                          "category": "food"
                      }

                  ]
              }
          })
      );

      let item = proxyquire('../api/controllers/itemController',
          {'../services/itemService': itemServiceMock});
      let itemRoutes = proxyquire('../api/routes/itemRoute',
          {'../controllers/itemController': item});

      let app = proxyquire('../app', {'./api/routes/itemRoute': itemRoutes});
      request(app).get('/items')
          .expect(HttpStatus.OK).end((err, res) => {
          should.not.exist(err);
          res.body.count.should.be.equal(2);
          res.body.items[0].name.should.be.equal("Water Bottle");
          res.body.items[0].price.should.be.equal(80);
          res.body.items[0].id.should.be.equal("5c63a27345a37036e8c92cf9");
          res.body.items[0].category.should.be.equal("beverage");
          res.body.items[1].name.should.be.equal("French-Fries");
          res.body.items[1].price.should.be.equal(150);
          res.body.items[1].id.should.be.equal("5c63a29f45a37036e8c92cfa");
          res.body.items[1].category.should.be.equal("food");


          done();
      });
  });


      it("should return a NOT FOUND error when items are unavailable in the database", function (done) {
          let itemServiceMock3 = {
              getAllItems: function () {

              }
          };
          let mockItem = sandbox.stub(itemServiceMock3, 'getAllItems');

          mockItem.returns(Promise.resolve({
                  success: true,
                  data: null
              })
          );

          let item = proxyquire('../api/controllers/itemController',
              {'../services/itemService': itemServiceMock3});
          let itemRoutes = proxyquire('../api/routes/itemRoute',
              {'../controllers/itemController': item});

          let app = proxyquire('../app', {'./api/routes/itemRoute': itemRoutes});
          request(app).get('/items')
              .expect(HttpStatus.NOT_FOUND).end((err, res) => {
              should.not.exist(err);
              done();
          });
      });


    it("should return all items created by the requested user id in the database", function (done) {
        let itemServiceMock = {
            getAllItems: function () {

            }
        };
        let mockItem = sandbox.stub(itemServiceMock, 'getAllItems');

        mockItem.returns(Promise.resolve({
                success: true,
                data: {
                    "count": 2,
                    "orders": [
                        {
                            "id": "5c6a63a291662738474822d7",
                            "items": [
                                {
                                    "quantity": 5,
                                    "id": "5c756d337e474030ee917cea",
                                    "product": {
                                        "id": "5c63a29f45a37036e8c92cfa",
                                        "name": "French-Fries",
                                        "price": 150,
                                        "category": "food"
                                    }
                                },
                                {
                                    "quantity": 1,
                                    "id": "5c756d337e474030ee917ce9",
                                    "product": {
                                        "id": "5c63a2be45a37036e8c92cfb",
                                        "name": "Chicken Burger",
                                        "price": 450,
                                        "category": "food"
                                    }
                                }
                            ],
                            "status": "open",
                            "customer": "Table 6",
                            "creator": "5c6f7e3bc65ba5267af2d27f",
                            "totalPrice": 5300,
                            "time": "2019-02-22T04:44:43.455Z"
                        },
                        {
                            "id": "5c75f730e306193d96b80c56",
                            "items": [
                                {
                                    "quantity": 9,
                                    "_id": "5c75f9c17e41a0420d296235",
                                    "product": {
                                        "_id": "5c63a2c845a37036e8c92cfc",
                                        "name": "Vege Burger",
                                        "price": 400,
                                        "category": "food",
                                        "__v": 0
                                    }
                                }
                            ],
                            "status": "closed",
                            "customer": "Table 6",
                            "creator": "5c62e636694ff510c4f4ed52",
                            "totalPrice": 5150,
                            "time": "2019-02-27T02:54:07.638Z"
                        }
                    ]
                }
            })
        );

        let item = proxyquire('../api/controllers/itemController',
            {'../services/itemService': itemServiceMock});
        let itemRoutes = proxyquire('../api/routes/itemRoute',
            {'../controllers/itemController': item});

        let app = proxyquire('../app', {'./api/routes/itemRoute': itemRoutes});
        request(app).get('/items')
            .expect(HttpStatus.OK).end((err, res) => {
            should.not.exist(err);
            res.body.count.should.be.equal(2);
            res.body.orders[0].id.should.be.equal("5c6a63a291662738474822d7");
            res.body.orders[0].items[0].quantity.should.be.equal(5);
            res.body.orders[0].items[0].id.should.be.equal("5c756d337e474030ee917cea");
            res.body.orders[0].items[0].product.id.should.be.equal("5c63a29f45a37036e8c92cfa");
            res.body.orders[0].items[0].product.name.should.be.equal("French-Fries");
            res.body.orders[0].items[0].product.price.should.be.equal(150);
            res.body.orders[0].items[0].product.category.should.be.equal("food");
            res.body.orders[0].status.should.be.equal("open");
            res.body.orders[0].customer.should.be.equal("Table 6");
            res.body.orders[0].creator.should.be.equal("5c6f7e3bc65ba5267af2d27f");
            res.body.orders[0].totalPrice.should.be.equal(5300);
            res.body.orders[0].time.should.be.equal("2019-02-22T04:44:43.455Z");
            done();
        });
    });


  
})



