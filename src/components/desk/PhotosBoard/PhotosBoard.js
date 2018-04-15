import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class PhotosBoard extends React.Component {
    render() {
        return (
            <h1>PhotosBoard</h1>
        )
    }
}

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({
    isAuthRequesting: state.auth.isRequesting,
    isDeskRequesting: state.desk.isRequesting
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotosBoard))