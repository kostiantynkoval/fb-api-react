import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getAlbumByIdAction, getMorePhotosAction} from '../../../store/actions/desk';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import qs from 'query-string';
import Prev from '@material-ui/icons/KeyboardArrowLeft';
import Folder from '@material-ui/icons/Folder';
import Paper from 'material-ui/Paper';
import './AlbumBoard.css';
import { fromEvent } from 'rxjs/observable/fromEvent';


class AlbumBoard extends React.Component {

    constructor(props) {
        super(props);
        this.showPhoto = this.showPhoto.bind(this);
        this.state = {
            query: {},
            open: false,
            isNextDone: false
        };
        //Implementing lazy load on scroll
        const scrollObservable = fromEvent(document, 'scroll');
        this.scroll = scrollObservable.subscribe(val => {
            if (this.props.isPhotosNext && !this.state.isNextDone && window.pageYOffset + window.innerHeight > document.body.offsetHeight - (window.innerHeight/10)) {
                this.props.getMorePhotosAction(this.props.match.params.id, this.props.photosPaging);
            }

        });
    }

    //Getting more photos if big screen, no scroll, but more photos available
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isPhotosNext && !this.state.isNextDone && (window.innerHeight > document.body.offsetHeight)) {
            this.props.getMorePhotosAction(this.props.match.params.id, this.props.photosPaging);
        }
    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.photosPaging !=='' && nextProps.photosPaging === this.props.photosPaging) {
            this.setState({isNextDone: true});
        } else {
            this.setState({isNextDone: false});
        }
    }

    componentDidMount() {
        this.props.getAlbumByIdAction(this.props.match.params.id);
        const query = qs.parse(this.props.location.search);
        this.setState({query});
    }

    showPhoto(id) {
        this.props.history.push(`/photo/${id}`)
    }

    componentWillUnmount() {
        this.scroll.unsubscribe();
    }

    render() {
        return (
            <div>
                <Toolbar style={{backgroundColor: 'cadetblue', cursor: 'pointer'}} onClick={this.props.history.goBack}>
                    <Typography style={{position: 'relative', paddingLeft: '3rem'}} variant="title" color="inherit" >
                        <Prev style={{position: 'absolute',top: '0',left: '0'}} color="inherit"/>
                        <Folder style={{position: 'absolute',top: '0',left: '25px'}} color="inherit"/>
                        &nbsp;{this.state.query.name}
                    </Typography>
                </Toolbar>
                {this.props.photos.length ?
                    <Paper className="photo-container">
                        {this.props.photos.map(photoItem => (
                            <div key={`${photoItem.id}${this.props.photosPaging}`} onClick={() => this.showPhoto(photoItem.id)} className="photo-item" style={{backgroundImage: `url(http://graph.facebook.com/${photoItem.id}/picture?access_token=${this.props.token})`}}></div>
                        ))}
                </Paper> : null }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAlbumByIdAction: (id) => {
        dispatch(getAlbumByIdAction(id));
    },
    getMorePhotosAction: (id, after) => {
        dispatch(getMorePhotosAction(id, after))
    }

});

const mapStateToProps = state => ({
    isDeskRequesting: state.desk.isRequesting,
    first_name: state.auth.first_name,
    photos: state.desk.photos,
    photosPaging: state.desk.photosPaging,
    isPhotosNext: state.desk.isPhotosNext,
    token: state.auth.token
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumBoard))