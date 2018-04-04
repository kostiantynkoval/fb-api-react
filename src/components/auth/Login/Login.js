import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {loginAction} from '../../../store/actions/auth';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.css'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
        this.state = {
            emailValue: '',
            emailValueErrorText: '',
            passwordValue: '',
            passwordValueErrorText: '',
        }
    }


    onInput(event, newValue) {
        const errorVar = `${event.currentTarget.name}ErrorText`;
        this.setState({[event.currentTarget.name]: newValue});
        this.setState({[errorVar]: ''});
    }

    onSubmit(event) {
        // Errors handling
        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        event.preventDefault();
        if (this.state.emailValue === '') {

            this.setState({emailValueErrorText: '* Email is required'})
            return;
        }
        if (!emailReg.test(this.state.emailValue)) {
            this.setState({emailValueErrorText: '* This email is not valid'})
            return;
        }
        if (this.state.passwordValue === '') {
            this.setState({passwordValueErrorText: '* Password is required'})
            return;
        }
        if (!passwReg.test(this.state.passwordValue)) {
            this.setState({passwordValueErrorText: '* Password should contain min 6 chars, at least 1 letter and 1 number'})
            return;
        }

        // If no errors dispatch login action
        this.props.loginAction({
            password: this.state.passwordValue,
            email: this.state.emailValue
        });
        document.getElementsByTagName('form')[0].reset();
    }

    render() {
        return (
            <div>
                {this.props.isRequesting ? <div className="fader"></div> : null}
                <Link to="/register"><RaisedButton label="Register" secondary={true} style={{width: '120px', color: 'black', position: 'absolute', top: 30, right: 35}} /></Link>

                <div className="auth-wrapper">
                    <div className="auth auth-logo"></div>
                    <div className="auth-divider"></div>
                    <form onSubmit={this.onSubmit} className="auth auth-form">
                        <div>
                            <TextField
                                fullWidth={true}
                                name="emailValue"
                                hintText="Enter your email"
                                floatingLabelText="Email*"
                                errorText={this.state.emailValueErrorText}
                                onChange={(event, newValue) => this.onInput(event, newValue)}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth={true}
                                name="passwordValue"
                                hintText="Enter password"
                                floatingLabelText="Password*"
                                type="password"
                                errorText={this.state.passwordValueErrorText}
                                onChange={(event, newValue) => this.onInput(event, newValue)}
                            />
                        </div>
                        <div className="auth-raised-button">
                            <RaisedButton
                                type="submit"
                                label="Login"
                                primary={true}
                                style={{margin: '15px'}}
                            />
                        </div>
                    </form>
                </div>
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

