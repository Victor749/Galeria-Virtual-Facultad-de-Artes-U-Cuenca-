
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Lightbox from 'react-image-lightbox';

export class ModalMio extends React.Component {

    constructor() {
        super();
        this.state = {
            active: 0,
            photoIndex: 0,
            isOpen: false,
            hidden: 'visible'
        }
    }

    hola = (e, a) => {
        console.log("Heyy there");
        console.log(e);
        console.log(a);
        this.setState({ active: e });
    }

    render() {
        // handleModal = console.log("heyyy");
        // console.log(Button);
        const { show2, handleChange, information, description, imageUrl } = this.props;
        // console.log("JAJA");
        console.log(show2);

        const { photoIndex, isOpen } = this.state;

        return (
            <div>
                {/* <Button variant="primary" onClick={console.log("heyyy")}>
                    Launch demo modal
                </Button> */}

                {/* <Container>

                        </Container> */}
                <Modal show={show2} style={{visibility: this.state.hidden}} size='lg' onHide={handleChange} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Ficha Museográfica
                                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid p-0">
                        <div className="d-flex flex-column justify-content-between bd-highlight example-parent" style={{ height: '70vh' }}>
                            <div className="modalUniversidad p-12 bd-highlight col-example" style={{ height: '50vh' }}>
                                <img src={imageUrl} />
                            </div>
                            <div className="p-12 bd-highlight col-example d-flex justify-content-end align-items-center" style={styles.modalUniversidad}>
                                <label className="m-0">Universidad de Cuenca</label>
                            </div>
                            <div className="p-12 bd-highlight col-example" style={{ height: '30vh' }}>
                                <h4 style={styles.title}>Descripcion: </h4>
                                <p>{description}</p>
                            </div>
                            <div className="p-12 bd-highlight col-example d-flex justify-content-end align-items-center" style={styles.modalUniversidad}>
                                <label className="m-0">Universidad de Cuenca</label>
                            </div>
                        </div>

                        <div>
                            <button type="button" onClick={() => this.setState({ isOpen: true, hidden: 'hidden' })}>Ver Obra</button>
                        </div>

                    </Modal.Body>
                    {/* <Modal.Footer>
                                        <Button onClick={handleChange}>Close</Button>
                                    </Modal.Footer> */}
                </Modal>

                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false, hidden: 'visible' })}
                        clickOutsideToClose={false}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}

            </div>

        );

    }
}

const link = 'http://localhost:3000/static_assets/';

const images = [
    link + 'Escultura 1.jpg',
    link + 'Escultura 2.jpg',
    link + 'Escultura 3.jpg',
    link + 'Escultura 4.jpg',
    link + 'Escultura 5.jpg',
];

const styles =
{
    modalUniversidad:
        { height: '10vh', background: 'red', color: 'white' },

    colorCircles: { width: '30px', height: '30px', color: 'blue' }
}
