import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logoutAction} from '../../../store/actions/auth';
import Facebook from '../../auth/Login/facebook';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
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

    handleLogout() {
        this.props.logoutAction();
    }


    render() {
        return (
            <div>
                {/* Fader for requests */}
                {this.props.isAuthRequesting || this.props.isDeskRequesting ? <div className="fader"></div> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logoutAction: () => {
        dispatch(logoutAction());
    }
});

const mapStateToProps = state => ({
    isAuthRequesting: state.auth.isRequesting,
    isDeskRequesting: state.desk.isRequesting
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));