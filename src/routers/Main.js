import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from '../axiosConfig';

// Imports de components
import Menu from '../components/Menu';
import Hilos from '../components/Hilos'
import Footer from '../components/Footer';
import Logout from '../components/Logout';
import Respuesta from '../components/Respuesta';

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usuarioActual: {},
            auth: localStorage.getItem('auth-token'),
            threadSelect: null // Es estado del hilo seleccionado.
        }

    }

    componentDidMount() {
        const currentUser = axios.get('/usuarios/me',);
        Promise.all([currentUser]).then(values => {
            this.setState({ usuarioActual: values[0].data })
        })
    }
    render() {
        console.log('Este es el valor de auth: ', this.state.auth)
        if (this.state.auth) {
            return (
                <div>
                    <Router>
                        <div>
                            <Menu usuarioActual={this.state.usuarioActual} />
                            <Switch>
                                <Route path='/forum' component={Hilos} />
                                <Route path='/respuesta' component={Respuesta} />
                                <Route path='/logout' component={Logout} />
                            </Switch>
                            <Footer />
                        </div>
                    </Router>
                </div>
            )
        } else {
            return <div>{window.location.href = '/'}</div>
        }

    }
}

