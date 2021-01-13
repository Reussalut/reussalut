import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from '../axiosConfig'
import '../polyfill.min.js';


export default class Menu extends Component {

    state = {
        modalThreadState: false,
        threadTitle: "",
        threadMsg: "",
        threadDisease: ""

    }

    controlModalThread = () => {
        this.setState({
            modalThreadState: !this.state.modalThreadState
        })
    }

    onSubmit = async (e) => {
        const newThread = {
            idAuthor: this.props.usuarioActual._id,
            disease: this.state.threadDisease,
            titleThread: this.state.threadTitle,
            bodyThread: this.state.threadMsg
            }

        let elHilo = await axios.post('/hilos', newThread);

        //const newRespuesta = {
        //     idThread:,
        //     idAuthor: this.props.usuarioActual._id,
        //     titleThread: this.state.threadTitle,
        //     bodyThread: this.state.threadMsg
        // }


        // const res = await axios.post('/respuestas', newRespuesta);
        //await axios.post('/respuestas', newRespuesta);
        e.preventDefault();
    }

    onChange = e => {
        const tipo = e.target.name;
        const valor = e.target.value;

        this.setState({
            [tipo]: valor
        })
    }

    componentDidMount() {
        Modal.setAppElement('body');
    }

    render() {
        return (
            <div>
                <div className='nav-Menu'>
                    <ul>
                        <li className='nav-Menu-Logo'>
                            <div className='nav-container-logo'>
                                <img className='img-logo' src="/img/logoWundt256x256.ico" alt="Girl in a jacket" />
                                <div className='overlay-logo-text'>Wundt</div>
                            </div>
                        </li>
                        <div className='nav-menu-btns'>
                            {/* <li> <a>Home</a>  </li> */}
                            <li><Link to='/forum'>Home</Link></li>
                            <li> <a onClick={this.controlModalThread}>Nuevo Tema </a>  </li>
                            <li><Link to='/logout'>Cerrar Sesión</Link></li>
                        </div>
                    </ul>
                </div>
                <Modal
                    isOpen={this.state.modalThreadState}
                    ariaHideApp={false}
                    className='modal-new-thread'
                >
                    <form className="new-thread-form" onSubmit={this.onSubmit}>
                        <h2>Nuevo Tema</h2>
                        <p>Rellene todos los campos.</p>
                        <div className="new-thread-title-area">
                            <label htmlFor="titulo" className="form-label">Titulo</label>
                            <input className="form-control input-title-thread" type="text"
                                name="threadTitle"
                                onChange={this.onChange}
                                value={this.state.threadTitle}
                            />
                        </div>
                        <div className="new-thread-disease-area">
                            <label htmlFor="disease">Enfermedad</label>
                            <select className="form-control"
                                name='threadDisease'
                                onChange={this.onChange}
                                value={this.state.disease}>
                                {/* feat: Hacer una BD con las enfermedades
                                    y descargarlas aqui */}
                                <option></option>
                                <option value='Enfermedad 1'>Enfermedad 1</option>
                                <option value='Enfermedad 2'>Enfermedad 2</option>
                                <option value='Enfermedad 3'>Enfermedad 3</option>
                                <option value='Enfermedad 4'>Enfermedad 4</option>
                                <option value='Enfermedad 5'>Enfermedad 5</option>
                            </select>
                        </div>
                        <div className="new-thread-msg-area">
                            <label htmlFor="body-first-post">Mensaje</label>
                            <textarea className="form-control textarea-body-thread" rows="3"
                                name="threadMsg"
                                onChange={this.onChange}
                                value={this.state.threadMsg}

                            />
                        </div>

                        <div className='btns-modal-form'>
                            <button className="btn btn-primary btn-modal-send" type="submit" >Enviar</button>
                            <button className="btn btn-primary btn-modal-close" type="button" onClick={this.controlModalThread}>Cerrar</button>
                        </div>

                    </form>

                </Modal>

            </div>


        )
    }
}

