import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loginAction} from './store/actions/auth';

import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Desk from './components/desk/Dashboard/Dashboard';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Registration/Register';

import Snackbar from 'material-ui/Snackbar';
import {hideSnackbarAction} from "./store/actions/snackbar";

class App extends Component {

    handleRequestClose = () => {
        this.props.hideSnackbarAction();
    };

    render() {
        return (
            <div>
                {this.props.isRequesting ? <div className="fader"></div> : null}
                <main>
                    <Route exact={true} path="/" render={() => (
                        this.props.isLoggedIn ? (<Desk/>) : (<Redirect to="/login" />)
                    )} />
                    <Route exact path="/login" render={() => (
                        !this.props.isLoggedIn ? (<Login/>) : (<Redirect to="/" />)
                    )} />
                    <Route exact path="/register" render={() => (
                        !this.props.isLoggedIn ? (<Register/>) : (<Redirect to="/" />)
                    )} />
                </main>

                <Snackbar
                    open={this.props.snackbarMessage !== ''}
                    message={this.props.snackbarMessage}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loginAction: (loginObj) => {
        dispatch(loginAction(loginObj));
    },
    hideSnackbarAction: () => {
        dispatch(hideSnackbarAction());
    },
});

const mapStateToProps = state => ({
    isRequesting: state.auth.isRequesting,
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    snackbarMessage: state.snackbar.snackbarMessage
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


