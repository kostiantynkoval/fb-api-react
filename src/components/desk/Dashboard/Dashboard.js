import React from 'react'
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {withRouter, Switch, Route} from 'react-router-dom';
import {logoutAction} from '../../../store/actions/auth';
import RaisedButton from 'material-ui/RaisedButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Photos from 'material-ui/svg-icons/image/collections';
import UploadsBoard from '../UploadsBoard/UploadsBoard';
import PhotosBoard from '../PhotosBoard/PhotosBoard';
import AlbumBoard from '../AlbumBoard/AlbumBoard';

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
        this.getPhotos = this.getPhotos.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            selectedIndex: 0,
        };
    }

    select(index, path) {
        this.setState({selectedIndex: index});
        this.props.push(path);

    }

    logout() {
        this.props.logoutAction();
    }

    status() {
        window.FB.getLoginStatus(function(response){
            console.log('response.status', response);
        });
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
        return (
            <div>
                {/* Fader for requests */}
                {/*{this.props.isAuthRequesting || this.props.isDeskRequesting ? <div className="fader"></div> : null}*/}

                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Photos"
                            icon={<Photos/>}
                            onClick={() => this.select(0, '/photos')}
                        />
                        <BottomNavigationItem
                            label="Favorites"
                            icon={<Favorite/>}
                            onClick={() => this.select(1, '/favorites')}
                        />
                        <BottomNavigationItem
                            label="Nearby"
                            icon={<IconLocationOn/>}
                            onClick={() => this.select(2, '/location')}
                        />
                        <BottomNavigationItem
                            label="Upload to Facebook"
                            icon={<FileUpload/>}
                            onClick={() => this.select(3, '/uploads')}
                        />
                    </BottomNavigation>

                {/*<div>*/}

                <RaisedButton
                    label="Logout"
                    secondary={true}
                    style={{margin: '15px'}}
                    onClick={this.logout}
                />
                {/*<RaisedButton*/}
                    {/*label="Photos"*/}
                    {/*primary={true}*/}
                    {/*style={{margin: '15px'}}*/}
                    {/*onClick={this.getPhotos}*/}
                {/*/>*/}
                {/*<RaisedButton*/}
                    {/*label="Status"*/}
                    {/*style={{margin: '15px'}}*/}
                    {/*onClick={this.status}*/}
                {/*/>*/}
                {/*<RaisedButton*/}
                    {/*label="Albums"*/}
                    {/*primary={true}*/}
                    {/*style={{margin: '15px'}}*/}
                    {/*onClick={this.getAlbums}*/}
                {/*/>*/}
                {/*</div>*/}

                <Route exact={true} path="/photos" render={() => (<PhotosBoard/>)}/>
                <Route path="/photos/:id" render={() => (<AlbumBoard/>)}/>
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