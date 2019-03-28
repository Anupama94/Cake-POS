import React from 'react';
import {
    Card, Col, Row, CardHeader, ListGroup, ListGroupItem, ListGroupItemHeading
} from 'reactstrap';
import { getMenuItems } from "../../apiCalls/callApi";
import './OrderDetails.css';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

    }

    componentDidMount() {
        getMenuItems()
            .then(response => {
                this.setState({ items: response.data.items });
            });
    }

    sendMenuItem = (id, e) => {
        let index = this.state.items.findIndex((item) => {
            return item._id === id;
        });
        let selectedItem = Object.assign({}, this.state.items[index]);
        this.props.sendMenuItem(selectedItem);
        
    }


    render() {
        return (
            <div>
                <Card outline color="secondary">
                    <CardHeader tag="h3" style={{ backgroundColor: "grey" }} >Menu</CardHeader>
                    <Row>

                        <Col xs="6" sm="6">
                            <ListGroup  >
                                <ListGroupItem  >
                                    <ListGroupItemHeading>Food</ListGroupItemHeading>
                                    <div id="scrollableContainer">
                                        {this.state.items.map((item) => {
                                            if (!item.length && item.category === "food") {
                                                return (<ListGroupItem key={item._id} style={{ backgroundColor: "grey" }}>
                                                    <ListGroupItem className="foodList" tag="a" href="#" action scope="row" style={{ color: "orange" }} onClick={this.sendMenuItem.bind(this, item._id)}><strong>{item.name}</strong></ListGroupItem>

                                                </ListGroupItem>);
                                            }

                                        })}
                                    </div>
                                </ListGroupItem>

                            </ListGroup>
                        </Col>
                        <Col xs="6" sm="6">
                            <ListGroup >
                                <ListGroupItem >
                                    <ListGroupItemHeading>Beverages</ListGroupItemHeading>
                                    <div id="scrollableContainer">
                                        {this.state.items.map((item) => {
                                            if (!item.length && item.category === "beverage") {
                                                return (<ListGroupItem key={item._id} style={{ backgroundColor: "grey" }}>
                                                    <ListGroupItem tag="a" href="#" action style={{ color: "orange" }} scope="row" onClick={this.sendMenuItem.bind(this, item._id)}><strong>{item.name}</strong></ListGroupItem>

                                                </ListGroupItem>);
                                            }

                                        })}
                                    </div>
                                </ListGroupItem>

                            </ListGroup>
                        </Col>
                    </Row>

                </Card>
            </div >
        );
    }

}

export default Menu;

