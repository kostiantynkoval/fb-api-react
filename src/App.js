import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { checkUserStatusAction } from './store/actions/auth';
import { hideSnackbarAction } from './store/actions/snackbar';
import VK from './store/vk';
import request from 'superagent';

import Dashboard from './components/desk/Dashboard/Dashboard';
import Login from './components/auth/Login/Login';
import Snackbar from 'material-ui/Snackbar';

class App extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.checkUserStatusAction();
    }

    handleRequestClose = () => {
        this.props.hideSnackbarAction();
    };

    render() {
        console.log('authStatus', this.props.authStatus);
        return (
            <div>
                {this.props.isRequesting ? <div className="fader"></div> : null}
                <main>
                    <Route path="/" render={() => (
                        this.props.authStatus === 'connected' ? (<Dashboard/>) : null
                    )} />
                    <Route path="/login" render={() => (
                        this.props.authStatus !== 'connected' ? (<Login/>) : (<Redirect to="/" />)
                    )} />
                </main>

                <Snackbar
                    open={this.props.snackbarMessage !== ''}
                    message={this.props.snackbarMessage}
                    onClose={this.handleRequestClose}
                />

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    hideSnackbarAction: () => {
        dispatch(hideSnackbarAction());
    },
    checkUserStatusAction: () => {
        dispatch(checkUserStatusAction());
    }
});

const mapStateToProps = state => ({
    isRequesting: state.auth.isRequesting,
    authStatus: state.auth.authStatus,
    snackbarMessage: state.snackbar.snackbarMessage
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


