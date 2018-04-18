import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
//import {history} from '../../../store/store';
import {getAlbumsAction} from '../../../store/actions/desk';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Next from '@material-ui/icons/KeyboardArrowRight';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import List, {
    ListItem,
    ListItemAvatar
} from 'material-ui/List';

const styles = {
    cardContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'flex-start'
    },
    listItem: {
        display: 'block',
        position: 'relative',
        marginLeft: '.5rem',
        width: '100%'
    },
    listItemWrapper: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    arrow: {
        position: 'absolute',
        top: 'calc(50% - 12px)',
        right: '1rem'
    }
};

class PhotosBoard extends React.Component {

    constructor(props) {
        super(props);
        this.showAlbum = this.showAlbum.bind(this);
    }

    componentDidMount() {
        this.props.getAlbumsAction()
    }

    showAlbum(id, name) {
        this.props.history.push({
            pathname: `/photos/${id}`,
            search: `?name=${name}`
        })
    }

    render() {
        return (
            <div>
                {/*<AppBar>*/}
                    <Toolbar style={{backgroundColor: 'cadetblue'}}>
                        <Typography variant="title" color="inherit" >
                            {`Welcome, ${this.props.first_name}`}
                        </Typography>
                    </Toolbar>
                {/*</AppBar>*/}
                {this.props.albums.data ? (
                    <Paper elevation={2} >
                        <List dense={true}>
                            {this.props.albums.data.map(item => (
                                <ListItem
                                    dense
                                    button
                                    style={styles.listItemWrapper}
                                    key={item.id}
                                    onClick={() => this.showAlbum(item.id, item.name)}>
                                    <ListItemAvatar>
                                        {
                                            item.cover_photo ?
                                                (<Avatar
                                                    src={`http://graph.facebook.com/${item.cover_photo.id}/picture?access_token=${this.props.token}`}
                                                    size={40}
                                                />) :
                                                (
                                                    <Avatar
                                                        size={40}
                                                    >{item.name.charAt(0)}</Avatar>
                                                )
                                        }
                                    </ListItemAvatar>
                                    <div style={styles.listItem}>
                                        <div>
                                            <h2 style={{marginTop: 0}}>{item.name}</h2>
                                        </div>
                                        <div>
                                            Items: {item.count}
                                        </div>
                                        <div>
                                            Last Updated: {item.updated_time}
                                        </div>
                                        <div style={styles.arrow}>
                                            <Next/>
                                        </div>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    </Paper> )
                    : null}

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAlbumsAction: () => {
        dispatch(getAlbumsAction());
    }
});

const mapStateToProps = state => ({
    isDeskRequesting: state.desk.isRequesting,
    first_name: state.auth.first_name,
    albums: state.desk.albums,
    token: state.auth.token
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotosBoard))