import React from 'react';
import { Table, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import './OrderList.css';
import classnames from 'classnames';
import Header from '../Shared/Header';
import PropTypes from 'prop-types';
import { getUsersOrders } from "../../apiCalls/callApi";

class OrderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      orders: []
    };
    this.toggle = this.toggle.bind(this);
  }


  static contextTypes = {
    router: PropTypes.object
  }


  componentDidMount() {
    getUsersOrders()
        .then((response) => {         
          this.setState({ orders: response.data });
          console.log("data", response.data);
        });
  }

  selectOrder = (orderId) => {
    localStorage.setItem('selectedOrder', orderId);
    this.context.router.history.push("/OrderDetails/" + orderId);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>

            </Col>

          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center" >
              <h1 className="orangify"> Order <small className="greyify">List</small></h1>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === "2" })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Currently Open
            </NavLink>
                </NavItem>
              </Nav>
              <br />
              <Table hover responsive>
                <thead>

                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>$ Total Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.orders.map((order, count = 0) => {
                    if (!order.length && order.status === "open") {
                      count++;
                      return (<tr key={order._id} onClick={() => { this.selectOrder(order._id); }}>
                        <th scope="row">
                          {count}</th>
                        <td>{order.customer}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.status}</td>
                      </tr>);
                    }
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>

    );
  }
}







export default OrderList;