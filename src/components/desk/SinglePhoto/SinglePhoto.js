import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getSinglePhotoAction} from '../../../store/actions/desk';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Prev from '@material-ui/icons/KeyboardArrowLeft';
import Folder from '@material-ui/icons/Folder';
import './SinglePhoto.css';


class SinglePhoto extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSinglePhotoAction(this.props.match.params.id);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Toolbar style={{backgroundColor: 'cadetblue', cursor: 'pointer'}} onClick={this.props.history.goBack}>
                    <Typography style={{position: 'relative', paddingLeft: '3rem'}} variant="title" color="inherit" >
                        <Prev style={{position: 'absolute',top: '0',left: '0'}} color="inherit"/>
                        <Folder style={{position: 'absolute',top: '0',left: '25px'}} color="inherit"/>
                        &nbsp;{this.props.singlePhoto.album ? this.props.singlePhoto.album.name : ''}
                    </Typography>
                </Toolbar>
                <Card >
                    <div className="single-photo-wrapper">
                        <img className="single-photo" src={`http://graph.facebook.com/${this.props.match.params.id}/picture?access_token=${this.props.token}`} alt=""/>
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.singlePhoto.name || ''}
                        </Typography>
                        <Typography component="p">
                            Created: {this.props.singlePhoto.updated_time || ''}
                        </Typography>
                    </CardContent>
                </Card>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        singlePhoto: state.desk.singlePhoto,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSinglePhotoAction: (id) => {
            dispatch(getSinglePhotoAction(id))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePhoto));