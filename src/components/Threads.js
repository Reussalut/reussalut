
// React

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Config

import axios from '../axiosConfig';

// Components

export default class Hilos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            hilos: []
        }
    }

    componentDidMount() {
        const threads = axios.get('/hilos',);
        const users = axios.get('/usuarios/all',);

        Promise.all([threads, users]).then(values => {
            this.setState({ hilos: values[0].data, usuarios: values[1].data })
        })
    }

    /*
     *   El método recibe el idAuthor
     *     y devuelve el nombre o nickname del usuario
     *  
     */

    getPerfil = (idAuthor) => {
        let auxPerfil = {};
        const usuario = this.state.usuarios.find(usuario => {
            return usuario._id === idAuthor;
        })

        if (usuario) {
            usuario.tipoPrivacidad == 'Anónimo' ?
                auxPerfil = { nombre: usuario.nickname } :
                auxPerfil = { nombre: `${usuario.nombre} ${usuario.apellido}` };
        }


        return auxPerfil;
    }

    // crearRuta = (idThread) =>{
    //     return `/Reply/${idThread}`
    // }


    render() {
        return (

            <div className='containerHilos'>
                {
                    // Aqui es donde deberíamos
                    //  controlar que hilos ve el usuario
                    this.state.hilos.map(hilo => {
                        return <div className='initial-thread' key={hilo._id}>
                            <div className='initial-author-Thread'>
                                {
                                    this.getPerfil(hilo.idAuthor).nombre
                                }
                            </div>

                            <div className='initial-body-Thread' >
                                <Link to='/Reply'>
                                    <div className='initial-route-Thread'>
                                        <a className='initial-title-Thread' >
                                            {hilo.titleThread}
                                        </a><br />
                                        <span className='initial-body-post'>
                                            {hilo.bodyThread}
                                        </span>
                                    </div>
                                </Link>

                            </div>

                        </div>
                    })
                }
            </div>
        )
    }
}
