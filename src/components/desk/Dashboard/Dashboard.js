import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logoutAction} from '../../../store/actions/auth';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import UploadsBoard from '../UploadsBoard/UploadsBoard';
import PhotosBoard from '../PhotosBoard/PhotosBoard';

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
        this.getAlbums = this.getAlbums.bind(this);
        this.getPhotos = this.getPhotos.bind(this);
    }

    logout() {
        this.props.logoutAction();
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
        return (
            <div>
                {/* Fader for requests */}
                {this.props.isAuthRequesting || this.props.isDeskRequesting ? <div className="fader"></div> : null}

                <Tabs>
                    <Tab
                        label="Photos"
                    >
                        <PhotosBoard/>
                    </Tab>
                    <Tab
                        label="Uploads"
                    >
                        <UploadsBoard/>
                    </Tab>
                </Tabs>


                <RaisedButton
                    label="Logout"
                    secondary={true}
                    style={{margin: '15px'}}
                    onClick={this.logout}
                />
                <RaisedButton
                    label="Photos"
                    primary={true}
                    style={{margin: '15px'}}
                    onClick={this.getPhotos}
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
    logoutAction: () => {
        dispatch(logoutAction());
    }
});

const mapStateToProps = state => ({
    isAuthRequesting: state.auth.isRequesting,
    isDeskRequesting: state.desk.isRequesting
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));