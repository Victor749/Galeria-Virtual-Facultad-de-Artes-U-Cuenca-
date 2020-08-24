
import {Button, Modal, Container, Row, Col} from 'react-bootstrap';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'
// import './ modal.styles.css';


export class ModalMio extends React.Component{


    constructor(){
        super();
        this.state = {
            active: 0
        }
    }

    hola = (e, a) =>{
        console.log("Heyy there");
        console.log(e);
        console.log(a);
        this.setState({active: e});
    }

    render(){       
        // handleModal = console.log("heyyy");
        // console.log(Button);
        const {show2, handleChange, information, description, imageUrl} = this.props;
        // console.log("JAJA");
        console.log(show2);


        return(
            <div>
                {/* <Button variant="primary" onClick={console.log("heyyy")}>
                    Launch demo modal
                </Button> */}
                
                        {/* <Container>

                        </Container> */}
                    <Modal show={show2}  size='lg' onHide={handleChange}  aria-labelledby="contained-modal-title-vcenter">
                        <Carousel interval={null} activeIndex={this.state.active} onSelect={this.hola} nextIcon={<img src="../static_assets/chevron-circle-right-solid.svg" style={styles.colorCircles} />}
                            prevIcon={<img src="../static_assets/chevron-circle-left-solid.svg" style={styles.colorCircles} />}>
                            <Carousel.Item>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                        Ficha Museográfica
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="show-grid p-0">
                                        <div className="d-flex flex-column justify-content-between bd-highlight example-parent" style={{ height: '70vh'}}>
                                            <div className="modalUniversidad p-12 bd-highlight col-example" style={{ height: '50vh'}}>
                                                <img src={imageUrl}/>
                                                </div>
                                            <div className="p-12 bd-highlight col-example d-flex justify-content-end align-items-center" style={styles.modalUniversidad}>
                                                <label className="m-0">Universidad de Cuenca</label>
                                            </div>
                                            <div className="p-12 bd-highlight col-example" style={{ height: '30vh'}}>
                                                <h4 style={styles.title}>Descripcion: </h4>
                                                <p>{description}</p>
                                                </div>
                                            <div className="p-12 bd-highlight col-example d-flex justify-content-end align-items-center" style={styles.modalUniversidad}>
                                                <label className="m-0">Universidad de Cuenca</label>
                                            </div>
                                        </div>
                                    
                                    </Modal.Body>
                                    {/* <Modal.Footer>
                                        <Button onClick={handleChange}>Close</Button>
                                    </Modal.Footer> */}
                                
                            </Carousel.Item>
                            <Carousel.Item>
                                    <div className="d-flex flex-column justify-content-between bd-highlight example-parent" style={{ height: '70vh'}}>
                                        <div className="p-12 bd-highlight col-example" style={{ height: '50vh'}}>
                                            
                                        </div>
                                        <div className="p-12 bd-highlight col-example d-flex justify-content-end align-items-center" style={styles.modalUniversidad}>
                                            <label className="m-0">Universidadjajajja de Cuenca</label>
                                        </div>
                                        <div className="p-12 bd-highlight col-example" style={{ height: '30vh'}}>Flex item</div>
                                        <div className="p-12 bd-highlight col-example d-flex justify-content-end align-items-center" style={styles.modalUniversidad}>
                                            <label className="m-0">Universidadjajaj de Cuenca</label>
                                        </div>
                                    </div>
                            </Carousel.Item>
                            
                        </Carousel>
                    </Modal>
                        

                        
                    
            </div>
            
        );
    
    }
  }



const styles = 
{
    modalUniversidad : 
        { height: '10vh', background: 'red', color: 'white'},

    colorCircles : {width: '30px', height: '30px', color: 'blue'}
}
