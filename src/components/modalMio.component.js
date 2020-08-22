
import {Button, Modal, Container, Row, Col} from 'react-bootstrap';
import React, { useState } from 'react';


export class ModalMio extends React.Component{


    render(){       
        // handleModal = console.log("heyyy");
        // console.log(Button);
        const {show2, handleChange} = this.props;
        // console.log("JAJA");
        console.log(show2);

        return(
            <div>
                {/* <Button variant="primary" onClick={console.log("heyyy")}>
                    Launch demo modal
                </Button> */}
                <Modal show={show2} onHide={handleChange} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Using Grid in Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                        <Row>
                            <Col xs={12} md={8}>
                            .col-xs-12 .col-md-8
                            </Col>
                            <Col xs={6} md={4}>
                            .col-xs-6 .col-md-4
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>
                            .col-xs-6 .col-md-4
                            </Col>
                            <Col xs={6} md={4}>
                            .col-xs-6 .col-md-4
                            </Col>
                            <Col xs={6} md={4}>
                            .col-xs-6 .col-md-4
                            </Col>
                        </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleChange}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        );
    
    }
  }
