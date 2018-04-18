import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getAlbumByIdAction} from '../../../store/actions/desk';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import qs from 'query-string';
import Prev from '@material-ui/icons/KeyboardArrowLeft';
import Folder from '@material-ui/icons/Folder';
import Paper from 'material-ui/Paper';
import './AlbumBoard.css';


class AlbumBoard extends React.Component {

    constructor(props) {
        super(props);
        this.showPhoto = this.showPhoto.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        console.log(this.props);
        this.state = {
            query: {},
            open: false
        }
    }

    componentDidMount() {
        this.props.getAlbumByIdAction(this.props.match.params.id);
        const query = qs.parse(this.props.location.search);
        this.setState({query});
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    showPhoto(id) {
        this.props.history.push(`/photo/${id}`)
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
                {this.props.currentAlbumPhotos.length ?
                    <Paper className="photo-container">
                        {this.props.currentAlbumPhotos.map(photoItem => (
                            <div onClick={() => this.showPhoto()} className="photo-item" style={{backgroundImage: `url(http://graph.facebook.com/${photoItem.id}/picture?access_token=${this.props.token})`}}></div>
                        ))}
                </Paper> : null }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAlbumByIdAction: (id) => {
        dispatch(getAlbumByIdAction(id));
    }
});

const mapStateToProps = state => ({
    isDeskRequesting: state.desk.isRequesting,
    first_name: state.auth.first_name,
    currentAlbumPhotos: state.desk.currentAlbumPhotos,
    currentAlbumPaging: state.desk.currentAlbumPaging,
    token: state.auth.token
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumBoard))