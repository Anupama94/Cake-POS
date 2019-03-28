import React from 'react';
import {
    Col, Row, Container
} from 'reactstrap';


import './OrderDetails.css';
import Header from '../Shared/Header';
import OrderBill from './OrderBill';
import Menu from './Menu';


class OrderDetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: props.match.params.id,
            objectReceived: {},
            itemCounter: 0
        }
        this.subscribeToMenuItem = this.subscribeToMenuItem.bind(this);
    }

    subscribeToMenuItem = function (itemObject) {
        let tmp = this.state.itemCounter + 1;
        this.setState({ itemCounter: tmp, objectReceived: itemObject });
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Container fluid>

                    <Row>
                        <Col xs="6" sm="4" >

                            <OrderBill orderId={this.state.selectedOrder} receiveSelectedFoodItem={this.state.objectReceived} clickCounter={this.state.itemCounter} />
                        </Col>
                        <Col xs="6" sm="8" >

                            <Menu sendMenuItem={this.subscribeToMenuItem} />
                        </Col>

                    </Row>


                </Container>
            </div >

        );
    }

}

export default OrderDetailsView;

