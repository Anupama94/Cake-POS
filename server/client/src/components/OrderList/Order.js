import React, { Component } from 'react';


class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentWillReceiveProps(parentProps) {
        if (parentProps.orders !== this.props.orders) {
            this.getUpdatedOrders(parentProps);
        }

    }

    getUpdatedOrders(parentProps){
        this.setState({orders: parentProps});
    }

    render() {
        console.log("hmmm",this.state.orders);
        const orderItems = this.state.orders.map((order) => {
            return (<tr key={order.id}>
                <th scope="row">
                    {order.id}</th>
                <td>{order.creator}</td>
                <td>{order.totalPrice}</td>
                <td>{order.status}</td>
            </tr>);

            });
        return (

            <tbody>
                {orderItems}
                <p>rendered already</p>
            </tbody>

        );
    }
}





export default Order;