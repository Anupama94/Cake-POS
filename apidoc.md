# Orders 

The orders name-space contains resource collections for creating, closing, updating and viewing of currently open orders.



#### Get Order Details of a given id

```
GET	/v1/orders/{order_id}
```

View details of a currently-open order.

- ##### Path Parameters

  **order_id** (required)		The order id of the order which needs to be retrieved

- ##### Example Request

  GET 			http://localhost:3001/orders/5c6f7e3bc65ba5267af2d27e

  A successful request returns the HTTP `200 OK` status code and a JSON response body that lists order details with the requested id. If there is no order found for the given order_id, a HTTP `404 NOT FOUND` is returned. 

- **Example Response**

  {
      "_id": "5c6f7e3bc65ba5267af2d27e",
      "items": [
          {
              "quantity": 4,
              "_id": "5c6f7e3bc65ba5267af2d27e",
              "product": {
                  "_id": "5c665955bf14ec2090e7cf33",
                  "name": "Strawberry Milk Shake",
                  "price": 200,
                  "category": "beverage"
              }
          },
          {
              "quantity": 2,
              "_id": "5c739c593225ce3b4ab9f5e2",
              "product": {
                  "_id": "5c63a2c845a37036e8c92cfc",
                  "name": "Vege Burger",
                  "price": 400,
                  "category": "food"
              }
          }

  ],
      "status": "open",
      "customer": "Table 6",
      "totalPrice": 3750,
      "creator": "5c6f7e3bc65ba5267af2d27f",
      "time": "2019-02-22T04:44:43.455Z",
      "__v": 0

  }



#### Get all Orders of a given user

```
GET	/v1/orders/all/{user_id}
```

View details of a currently-open order.

- ##### Path Parameters

  **user_id** (required)		The user id of the user whose orders need to be checked.

- ##### Example Request

  GET 			http://localhost:3001/orders/all/5c6f7e3bc65ba5267af2d27e

  A successful request returns the HTTP `200 OK` status code and a JSON response body that lists order details with the requested id.  If there are no orders found for the given user_id, a HTTP `404 NOT FOUND` is returned. 

- **Example Response**

  {
      "_id": "5c6f7e3bc65ba5267af2d27e",
      "items": [
          {
              "quantity": 4,
              "_id": "5c6f7e3bc65ba5267af2d27e",
              "product": {
                  "_id": "5c665955bf14ec2090e7cf33",
                  "name": "Strawberry Milk Shake",
                  "price": 200,
                  "category": "beverage"
              }
          },
          {
              "quantity": 2,
              "_id": "5c739c593225ce3b4ab9f5e2",
              "product": {
                  "_id": "5c63a2c845a37036e8c92cfc",
                  "name": "Vege Burger",
                  "price": 400,
                  "category": "food"
              }
          }

  ],
      "status": "open",
      "customer": "Table 6",
      "totalPrice": 3750,
      "creator": "5c6f7e3bc65ba5267af2d27f",
      "time": "2019-02-22T04:44:43.455Z",
      "__v": 0

  }



#### Modify order-items

```
PUT	/v1/orders/{id}
```

Add oder-items to an already open order

- ##### Path Parameters

  **id** (required)		The order id of the order which needs to be updated

- ##### Example Request

  GET 			http://localhost:3001/orders/5c6f7e3bc65ba5267af2d27e

  A successful request returns the HTTP `200 OK` status code and a JSON response body that lists the updated order details with the requested id.

- ##### Request Body

  update_parameters = {
          "items": [
          {
              "quantity": 4,
              "_id": "5c6f7e3bc65ba5267af2d27e",
              "product": {
                  "_id": "5c665955bf14ec2090e7cf33",
                  "name": "Strawberry Milk Shake",
                  "price": 200,
                  "category": "beverage"
              }
          },
          {
              "quantity": 2,
              "_id": "5c739c593225ce3b4ab9f5e2",
              "product": {
                  "_id": "5c63a2c845a37036e8c92cfc",
                  "name": "Vege Burger",
                  "price": 400,
                  "category": "food"
              }
          }

  ],
      "status": "open",
      "customer": "Table 6",
      "totalPrice": 3750,
      "creator": "5c6f7e3bc65ba5267af2d27f",
      "time": "2019-02-22T04:44:43.455Z",
      "__v": 0

  }

- ##### Response Body

  A successful request returns the HTTP `200 OK` status code and a JSON response body that shows payment details.



# Items 

The orders name-space contains resource collections for creating, closing, updating and viewing of currently open orders.



#### Get Item Details of a given id

```
GET	/v1/items/{item_id}
```

View details of a currently-open order.

- ##### Path Parameters

  **id** (required)		The order id of the order which needs to be checked

- ##### Example Request

  GET 			http://localhost:3001/items/5c6f7e3bc65ba5267af2d27e

  A successful request returns the HTTP `200 OK` status code and a JSON response body that lists order details with the requested id.

- **Example Response**

  {
      "_id": "5c63a27345a37036e8c92cf9",
      "name": "Water Bottle",
      "price": 80,
      "category": "beverage",
      "__v": 0
  }



#### Get all items 

```
GET	/v1/items
```

View all the items tat could be ordered.

- ##### Example Request

  GET 			http://localhost:3001/items

  A successful request returns the HTTP `200 OK` status code and a JSON response body that lists order details with the requested id.

- **Example Response**

  {
      "count": 3,
      "items": [
          {
              "name": "Water Bottle",
              "price": 80,
              "_id": "5c63a27345a37036e8c92cf9",
              "category": "beverage"
          },
          {
              "name": "French-Fries",
              "price": 150,
              "_id": "5c63a29f45a37036e8c92cfa",
              "category": "food"
          },
          {
              "name": "Chicken Burger",
              "price": 450,
              "_id": "5c63a2be45a37036e8c92cfb",
              "category": "food"
          }
      ]
  }



# Users 

The orders name-space contains resource collections for creating, closing, updating and viewing of currently open orders.



#### User Login

```
POST	/v1/orders/{order_id}
```

- ##### Example Request

  POST 			http://localhost:3001/users/login

  {

  ​	"email": "abcd@123.com",

  ​	"password": *********************

  }

  Returns user object for a given username and password together with a authentication token (JWT). If no user is found for the given username, password HTTP 401 Unauthorized response is sent.  

- **Example Response**

  {
     	 "message": "Auth successful",
     	 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2RA"

  }