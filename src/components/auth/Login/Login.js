import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loginAction} from '../../../store/actions/auth';
import RaisedButton from 'material-ui/RaisedButton';
import Facebook from './facebook';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.status = this.status.bind(this);
        this.getAlbums = this.getAlbums.bind(this);
    }

    componentDidMount() {
        const facebookAPI = new Facebook();


        facebookAPI.getLoginStatus(function(response){
            if(response.status === "connected"){
                console.log('response.status', response);
            }
        }.bind(this));

        console.log('facebookAPI', facebookAPI);
        console.log('state', this.state);
    }

    logout() {
        window.FB.logout(function(response) {
            if (response && !response.error) {
                console.log('logout:', response);
            } else {
                console.log('logout error:', response);
            }
        });
    }

    login() {
        window.FB.login();
    }

    status() {
        window.FB.getLoginStatus(function(response){
            console.log('response.status', response);
        });
    }


    getAlbums() {
    window.FB.api(
            '/me/albums',
            'GET',
            {},
            function(response) {
                if (response && !response.error) {
                    console.log('albums:', response);
                } else {
                    console.log('albums error:', response);
                }
            }
        );
    }

    getPhotos() {
        window.FB.api(
            '/me/photos?fields=album',
            'GET',
            {},
            function(response) {
                if (response && !response.error) {
                    console.log('photos:', response);
                } else {
                    console.log('photos error:', response);
                }
            }
        );
    }

    render() {
        console.log('state', this.state);
        return (
            <div>
                {this.props.isRequesting ? <div className="fader"></div> : null}
                <RaisedButton
                    label="Login"
                    primary={true}
                    style={{margin: '15px'}}
                    onClick={this.login}
                />
                <RaisedButton
                    label="Logout"
                    secondary={true}
                    style={{margin: '15px'}}
                    onClick={this.logout}
                />
                <RaisedButton
                    label="Status"
                    style={{margin: '15px'}}
                    onClick={this.status}
                />
                <RaisedButton
                    label="Albums"
                    primary={true}
                    style={{margin: '15px'}}
                    onClick={this.getAlbums}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loginAction: (loginObj) => {
        dispatch(loginAction(loginObj));
    }
});

const mapStateToProps = state => ({
    isRequesting: state.auth.isRequesting,
    isLoggedIn: state.auth.isLoggedIn
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

