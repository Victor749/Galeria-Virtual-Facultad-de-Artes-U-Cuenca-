
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Lightbox from 'react-image-lightbox';
// import { ButtonComentario } from './ButtonComentario.component';

export class ModalMio extends React.Component {

    constructor() {
        super();
        this.state = {
            active: 0,
            photoIndex: 0,
            isOpen: false,
            hidden: 'visible',
            numberSlides: 1
        }
    }

    hola = (e, a) => {
        console.log("Heyy there");
        console.log(e);
        console.log(a);
        this.setState({ active: e });
    }

    move = (step) =>{
        let position;
        if(step+this.state.active > this.state.numberSlides){
            position = 0;
        }else if(step+this.state.active < 0){
            position = this.state.numberSlides;
        }else{
            position = this.state.active + step;
        }
        console.log("yyyy");
        console.log(position);
        this.setState({active: position});
    }

    render(){       
        // handleModal = console.log("heyyy");
        // console.log(Button);
        const {show2, autor, titulo, asignatura, ciclo, tutor, dimensiones, fechaProducccion, rutaElemento, handleChange, descripcion, facebook, instagram, visitas} = this.props;
        console.log("JAJA");
        console.log(visitas);
        console.log(rutaElemento);
        console.log(facebook);
        console.log(instagram);
        console.log(process.env.DEBUG);

        const { photoIndex, isOpen } = this.state;

        return (
            <div>
                {/* <Button variant="primary" onClick={console.log("heyyy")}>
                    Launch demo modal
                </Button> */}
                
                        {/* <Container>
                        </Container> */}
                    <Modal show={show2}  size='lg' style={{visibility: this.state.hidden}} onHide={handleChange}  aria-labelledby="contained-modal-title-vcenter"  >
                        <Carousel interval={null} controls={false} activeIndex={this.state.active} onSelect={this.hola} nextIcon={<img src="../static_assets/chevron-circle-right-solid.svg" style={styles.colorCircles} />}
                            prevIcon={<img src="../static_assets/chevron-circle-left-solid.svg" style={styles.colorCircles} />}>
                            <Carousel.Item>
                                    {/* <Modal.Header closeButton >
                                        <Modal.Title id="contained-modal-title-vcenter">
                                        Ficha Museográfica
                                        </Modal.Title>
                                    </Modal.Header> */}
                                    
                                        <div className="d-flex flex-column justify-content-between bd-highlight example-parent"  >
                                            {/* <div>
                                                
                                            </div> */}
                                            <div className="d-flex row justify-content-center p-12 bd-highlight mb-3 col-example" style={{height: '60%'}}>
                                                <div className="col-6 col-sm-7 m-0 p-0 border-right">
                                                    <p className="tituloFicha">Ficha Museográfica</p>
                                                    <p className="data">Autor: <label className="data-entry">{autor}</label></p>
                                                                
                                                    <p className="data">Título: <label className="data-entry">{titulo}</label></p>
                                                    
                                                    <p className="data">Asignatura: <label className="data-entry">{asignatura}</label></p>
                                                    
                                                    <p className="data">Ciclo: <label className="data-entry">{ciclo}</label></p>
                                                    
                                                    <p className="data">Tutor: <label className="data-entry">{tutor}</label></p>
                                                    
                                                    {/* <p>Técnica: </p> */}
                                                    <p className="data">Dimensiones: <label className="data-entry">{dimensiones}</label></p>
                                                
                                                    <p className="data">Fecha Producción: <label className="data-entry">{fechaProducccion}</label></p>
                                                </div>
                                                <div className="row justify-self-end justify-content-center col-12 col-sm-4 pl-3 " style={{height: '350px'}}>
                                                    <img className="" src={`${rutaElemento}`}  style={{height: '100%'}}/>
                                                </div>
                                            </div>
                                            <div className="p-12 bd-highlight col-example d-flex justify-content-end align-items-center" style={styles.modalUniversidad}>
                                                <label className="m-0">Universidad de Cuenca</label>
                                            </div>
                                            <div className="row justify-content-center p-12 bd-highlight col-example" >
                                                <div className="col-11 p-3">
                                                    <p className="tituloDescripcion">Descripción:  </p>
                                                    <p className="descripcion">{descripcion}</p>
                                                </div>
                                            </div>
                                            <div className="row justify-content-between align-items-center p-12 bd-highlight col-example d-flex justify-content-end align-items-center" style={styles.modalUniversidad}>
                                                <div className="row justify-content-center align-items-center col-4">
                                                    <a className="redSocial" href={`${facebook}`} target="_blank">
                                                        <img className="facebook" src="http://localhost:3000/static_assets/facebook.png"  />
                                                    </a>
                                                    <a className="redSocial" href={`${instagram}`} target="_blank">
                                                        <img className="instagram" src="http://localhost:3000/static_assets/instagram.png"  />
                                                    </a>
                                                    <svg className="seen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"/>
                                                    </svg>
                                                    <span>{visitas}</span>
                                                </div>
                                                <div className="col-4">
                                                    Universidad de Cuenca
                                                </div>
                                            </div>
                                            <div>
                                                <button type="button" onClick={() => this.setState({ isOpen: true, hidden: 'hidden' })}>Ver Obra</button>
                                            </div>
                                        </div>
                                        
                                    
                                    {/* <Modal.Footer>
                                        <Button onClick={handleChange}>Close</Button>
                                    </Modal.Footer> */}
                                
                            </Carousel.Item>
                            <Carousel.Item>
                                    <div className="d-flex flex-column justify-content-between bd-highlight example-parent" >
                                        <div className="comentarios" /*style={{height: '60vh'}} */ >
                                            sa;lkfksa
                                        </div>
                                        <div className="row justify-content-center hacer-comentario">
                                            <textarea className="col-12 col-sm-8 comentario">

                                            </textarea>
                                            {/* <ButtonComentario /> */}
                                        </div>
                                        <div className="" style={styles.modalUniversidad}>
                                        </div>
                                    </div>
                            </Carousel.Item>
                            
                        </Carousel>
                        <button className="moveButton" style={styles.prevbutton} onClick={() => {console.log('hola'); this.move(-1);}}><img src="http://localhost:3000/static_assets/chevron-circle-left-solid.svg" style={styles.colorCircles} /></button>
                        <button className="moveButton" style={styles.nextbutton} onClick={() => {console.log('hola'); this.move(1);}}><img src="http://localhost:3000/static_assets/chevron-circle-right-solid.svg" style={styles.colorCircles} /></button>
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
    modalUniversidad : 
        { height: '7vh', background: 'black', color: 'white'},

    colorCircles : {width: '30px', height: '30px', color: 'blue'},
    prevbutton: {position: 'absolute',top: '50%', left: '-7%', outline: 'none'},
    nextbutton: {position: 'absolute',top: '50%', right: '-7%', outline: 'none'},
}
