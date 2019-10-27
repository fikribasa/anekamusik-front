import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

class LoginModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal">
        <ModalBody className="modal-body">
          <Form className="form-login">
            <FormGroup>
              <div>
                <Label for="email" className="label-login">
                  Email :{" "}
                </Label>
              </div>
              <Input
                type="text"
                name="email"
                id="email"
                className="input-login"
                onChange={this.inputHandler}
                placeholder="email"
              />
            </FormGroup>

            <FormGroup>
              <div>
                <Label for="password" className="label-login">
                  Password :{" "}
                </Label>
              </div>
              <Input
                type="password"
                name="password"
                id="password"
                className="input-login"
                onChange={this.inputHandler}
                placeholder="password"
              />
            </FormGroup>

            <Button className="cancel-button" onClick={this.toggle}>
              Cancel
            </Button>
            <Button type="button" className="submit-login" onClick={this.login}>
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
