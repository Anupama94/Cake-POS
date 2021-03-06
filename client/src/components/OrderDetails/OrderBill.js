import React from 'react';
import {
    Card, CardText, Button, Col, Row,
    CardHeader, CardBody, Table, CardFooter,
    ButtonGroup, Alert
} from 'reactstrap';
import { FaWindowClose, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './OrderDetails.css';
import PropTypes from 'prop-types';
import { getOrderItems, updateOrder } from "../../apiCalls/callApi";
import 'react-perfect-scrollbar/dist/css/styles.css';


class OrderBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrderId: props.orderId,
            selectedOrder: [],
            totalPayable: 0,
            status: "",
            errorAlert: {
                visible: false,
                message: ''
            }
        };
    }

    componentDidMount() {
        this.getOrderItemsAndSetState();

    }

    getOrderItemsAndSetState() {
        getOrderItems(localStorage.getItem('selectedOrder'))
            .then((result) => {
                this.setState({ selectedOrder: result.data.items, totalPayable: result.data.totalPrice, status: result.data.status });
            })
            .catch((err) => {
                this.setState({ errorAlert: { visible: true, message: err.message } });
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clickCounter !== this.props.clickCounter) {
            let newItemToBeAdded = { quantity: 1, product: nextProps.receiveSelectedFoodItem._id };

            let index = this.state.selectedOrder.findIndex((order) => {
                return order.product._id === newItemToBeAdded.product;
            });
            if (index !== -1) {
                this.incrementQuantity(this.state.selectedOrder[index]._id);

            }
            else {
                this.addItemToOrder(newItemToBeAdded, nextProps.receiveSelectedFoodItem.price).then((updatedItems) => {
                    this.updateDB(updatedItems).then((res) => {
                        this.getOrderItemsAndSetState();
                    })
                });
            }
        }

    }

    addItemToOrder(newItemToBeAdded, newItemPrice) {
        return new Promise((resolve, reject) => {
            let caltotalPrice = newItemPrice;
            let newItemsArray = this.state.selectedOrder.map(function (item) {
                caltotalPrice = caltotalPrice + (item.quantity * item.product.price);
                return {
                    product: item.product._id,
                    quantity: item.quantity
                };
            });
            newItemsArray.push(newItemToBeAdded);
            resolve({ items: newItemsArray, totalPrice: caltotalPrice });
        });
    }


    static contextTypes = {
        router: PropTypes.object
    }

    incrementQuantity(id) {
        this.logicToIncrement(id).then((updatedOrder) => {
            this.updateDB(updatedOrder);
        });
    }

    getIndexOfSelectedItemFromItems(id) {
        let index = this.state.selectedOrder.findIndex((order) => {
            return order._id === id;
        });
        return index;
    }

    logicToIncrement = (id) => {
        return new Promise((resolve, reject) => {

            let index = this.getIndexOfSelectedItemFromItems(id);
            let order = Object.assign({}, this.state.selectedOrder[index]);
            order.quantity = order.quantity + 1;

            let selected = Object.assign([], this.state.selectedOrder);
            selected[index] = order;

            let total = this.state.totalPayable + order.product.price;
            this.setState({ selectedOrder: selected, totalPayable: total });
            resolve({ items: selected, totalPrice: total });

        });
    }


    updateDB(updatedOrder) {
        return new Promise((resolve, reject) => {
            updateOrder(this.state.selectedOrderId, updatedOrder)
                .then(res => {
                    resolve(res);
                });
        });

    }


    decrementQuantity = (id, e) => {
        this.logicToDecrement(id).then((updatedOrder) => {
            this.updateDB(updatedOrder);
        });

    }

    logicToDecrement(id) {
        return new Promise((resolve, reject) => {

            let index = this.getIndexOfSelectedItemFromItems(id);
            let order = Object.assign({}, this.state.selectedOrder[index]);
            if (order.quantity !== 0) {
                order.quantity = order.quantity - 1;
                let total = this.state.totalPayable - order.product.price;
                let selected = Object.assign([], this.state.selectedOrder);
                selected[index] = order;


                this.setState({ selectedOrder: selected, totalPayable: total });
                resolve({ items: selected, totalPrice: total });
            }
        });
    }

    updateStateBeforeDelete = (index) => {
        return new Promise((resolve, reject) => {
            let selected = Object.assign([], this.state.selectedOrder);
            selected.splice(index, 1);
            //total price is also affected
            let newTotal = this.state.totalPayable - (this.state.selectedOrder[index].product.price * this.state.selectedOrder[index].quantity);
            this.setState({ selectedOrder: selected, totalPayable: newTotal });
            resolve({ items: selected, totalPrice: newTotal });

        });
    };


    deleteItem = (id, e) => {

        let index = this.getIndexOfSelectedItemFromItems(id);

        this.updateStateBeforeDelete(index).then(updatedOrder => {
            this.updateDB(updatedOrder);
        });
    }

    updateOrderStatus = () => {
        return new Promise((resolve, reject) => {
            this.setState({ status: "closed" });
            resolve({ status: "closed" });
        });
    }

    closeOrder = () => {
        this.updateOrderStatus().then((updatedOrder) => {
            this.updateDB(updatedOrder).then((res) => {
                this.context.router.history.push("/OrderList");
            })
        });


    }


    loadOrderBill = () => {
        return (
            <Table  >
                <thead style={{ backgroundColor: "orange" }}>
                    <tr>
                        <th>X</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.selectedOrder.map((item) => {
                        return (<tr key={this.state.selectedOrder.id}>
                            <th scope="row"><FaWindowClose style={{ color: "red" }} onClick={this.deleteItem.bind(this, item._id)} />

                            </th>
                            <th value={item.product.name}>{item.product.name}</th>
                            <td value={item.quantity}>{item.quantity}
                                <ButtonGroup className="btn-space" size="sm" >
                                    <Button outline color="warning" onClick={this.incrementQuantity.bind(this, item._id)}><FaChevronUp /></Button>
                                    <Button outline onClick={this.decrementQuantity.bind(this, item._id)}><FaChevronDown /></Button>
                                </ButtonGroup></td>
                            <td value={item.product.price * item.quantity}>{item.product.price * item.quantity}</td>
                        </tr>);
                    })}
                </tbody>
            </Table>
        )
    }



    render() {
        return (
            <div>

                <Card outline color="secondary" >
                    <CardHeader tag="h3" style={{ backgroundColor: "grey" }}>
                        <Row>
                            <Col md="6">Order Details</Col>
                            <Col md="6" >  <Button className="float-right" outline color="danger" style={{ color: "orange" }} onClick={this.closeOrder.bind(this)}>CLOSE ORDER</Button>
                            </Col>
                        </Row>
                    </CardHeader>

                    <CardBody >
                        <CardText>
                            <div id="scrollableContainer">
                                {this.loadOrderBill()}
                            </div>
                            <Alert color="danger" isOpen={this.state.errorAlert.visible}>
                                {this.state.errorAlert.message}
                            </Alert>
                        </CardText>
                    </CardBody>

                    <CardFooter style={{ backgroundColor: "grey" }}>
                        <Row>
                            <Col md="6">

                            </Col>
                            <Col md="6">
                                <h5>Total Payable: Rs. <strong style={{ color: "orange" }}>{this.state.totalPayable}</strong></h5>

                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </div >

        );
    }

}

export default OrderBill;

