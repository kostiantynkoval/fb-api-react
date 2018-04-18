import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loginAction} from '../../../store/actions/auth';
import Button from 'material-ui/Button';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        this.props.loginAction()
    }

    render() {
        return (
            <div>
                {this.props.isRequesting ? <div className="fader"></div> : null}
                <Button
                    variant="raised"
                    color="primary"
                    style={{margin: '15px'}}
                    onClick={this.login}
                >Login</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loginAction: () => {
        dispatch(loginAction());
    }
});

const mapStateToProps = state => ({
    isRequesting: state.auth.isRequesting,
    authStatus: state.auth.authStatus
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

