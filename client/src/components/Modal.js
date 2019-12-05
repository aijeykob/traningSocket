import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { writingText, turnModal } from '../actions/action';
let mapStateToProps = state => ({
  places: state.places,
  modale: state.modale,
  items: state.items,
  email: state.email,
  selectedPlace: state.selectedPlace
})
export class Home extends Component {

  constructor(props) {
    super(props)
  }
  onChangeInput = (e) => {
    e.preventDefault();
    this.props.dispatch(writingText(e.target.value, e.target.name))
  };

  render() {

    const { selectedPlace, dispatch, modale, email } = this.props;

    return (
      <Modal show={modale}
        onHide={() => dispatch(turnModal(false))}
      >
        <Modal.Header closeButton>
          <Modal.Title>Broning place #{selectedPlace}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => this.onChangeInput(e)}
              placeholder="Enter email" />
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={this.props.name}
              onChange={(e) => this.onChangeInput(e)}
              placeholder="Name" />
            <Button variant="primary" id={10}
              onClick={() => this.props.test(this.props.email, this.props.name, this.props.selectedPlace)}>
              Send
  </Button>
          </Form>

        </Modal.Body>
      </Modal>
    );
  }
}
export default connect(mapStateToProps)(Home)