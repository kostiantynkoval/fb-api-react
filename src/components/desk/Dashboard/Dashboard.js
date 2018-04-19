import React from 'react'
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {withRouter, Route, Redirect} from 'react-router-dom';
import {logoutAction} from '../../../store/actions/auth';
import Button from 'material-ui/Button';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconLocationOn from '@material-ui/icons/LocationOn';
import Favorite from '@material-ui/icons/Favorite';
import FileUpload from '@material-ui/icons/FileUpload';
import Photos from '@material-ui/icons/Collections';
import UploadsBoard from '../UploadsBoard/UploadsBoard';
import PhotosBoard from '../PhotosBoard/PhotosBoard';
import AlbumBoard from '../AlbumBoard/AlbumBoard';
import SinglePhotoWrapper from '../SinglePhoto/SinglePhoto';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.status = this.status.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            value: this.props.location.pathname,
        };
        console.log(this.props);
    }

    select(event, value) {
        this.setState({value});

        this.props.push(`${value}`);

    }

    logout() {
        this.props.logoutAction();
    }

    status() {
        window.FB.getLoginStatus(function(response){
            console.log('response.status', response);
        });
    }

    render() {
        return (
            <div>
                {/* Fader for requests */}
                {/*{this.props.isAuthRequesting || this.props.isDeskRequesting ? <div className="fader"></div> : null}*/}

                    <BottomNavigation value={this.state.value} onChange={this.select}>
                        <BottomNavigationAction
                            label="Photos"
                            icon={<Photos/>}
                            value="/photos"
                        />
                        <BottomNavigationAction
                            label="Favorites"
                            icon={<Favorite/>}
                            value="/favorites"
                        />
                        <BottomNavigationAction
                            label="Location"
                            icon={<IconLocationOn/>}
                            value="/location"
                        />
                        <BottomNavigationAction
                            label="Upload to Facebook"
                            icon={<FileUpload/>}
                            value="/uploads"
                        />
                    </BottomNavigation>

                <Button
                    variant="raised"
                    color="secondary"
                    style={{margin: '15px'}}
                    onClick={this.logout}
                >Logout</Button>


                <Route exact path="/" render={() => (<Redirect to='/photos'/>)}/>
                <Route exact={true} path="/photos" render={() => (<PhotosBoard/>)}/>
                <Route path="/photos/:id" render={() => (<AlbumBoard/>)}/>
                <Route path="/photo/:id" render={() => (<SinglePhotoWrapper/>)}/>
                <Route path="/favorites" render={() => (<div><h1>Favorites Component</h1></div>)}/>
                <Route path="/location" render={() => (<div><h1>Location Component</h1></div>)}/>
                <Route path="/uploads" render={() => (<UploadsBoard/>)}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logoutAction: () => {
        dispatch(logoutAction());
    },
    push: (path) => {
        dispatch(push(path))
    }
});

const mapStateToProps = state => ({
    isAuthRequesting: state.auth.isRequesting,
    isDeskRequesting: state.desk.isRequesting
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));