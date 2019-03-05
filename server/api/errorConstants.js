module.exports = {
    // Error codes for the 'items'
    ITEM_UNAVAILABLE        : {
        MESSAGE: "No valid entry found for provided id.",
        CODE: 2001
    },

    ITEMS_NOT_FOUND         : {
        MESSAGE: "No items found",
        CODE: 2002
    },


    //Error codes for the users
    USER_NOT_FOUND          : {
        MESSAGE: "No valid user under the provided id",
        CODE: 3001
    },

    AUTH_FAILED              : {
        MESSAGE: "Incorrect username or password",
        CODE: 3002
    },


     // Error codes for the 'orders'
     ORDER_UNAVAILABLE        : {
        MESSAGE: "No valid order found for provided id.",
        CODE: 4001
    },

    ORDERS_NOT_FOUND         : {
        MESSAGE: "No orders found",
        CODE: 4002
    },


    SERVER_ERROR            :  {
        MESSAGE : "The execution of the service failed in some way.",
        CODE: 1001
    },

    
    DATABASE_ERROR          :  {
        MESSAGE : "Error initiated within the database.",
        CODE: 1002
    },

    DATA_UNAVAILABLE       :  {
        MESSAGE : "Data not found for the given parameters",
        CODE: 1003
    }, 
    SUCCESS                 :  {
        MESSAGE : "Successfully retrieved data",
        CODE: 1004
    },

    DATABASE_UPDATED        :  {
        MESSAGE : "Object of the given id successfully updated",
        CODE: 1005
    }
}