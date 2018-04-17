import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { push } from 'react-router-redux';
import {getAlbumsAction} from '../../../store/actions/desk';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Next from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

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
        width: '100%'
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

    showAlbum(id) {
        this.props.pushToAlbum(id);
    }

    render() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={`Welcome, ${this.props.first_name}`} />
                    </ToolbarGroup>
                </Toolbar>
                {this.props.albums.data ? (
                    <Paper zDepth={2} >
                        <List>

                            {this.props.albums.data.map(item => (

                                <ListItem
                                    containerElement="div"
                                    style={styles.listItem}
                                    key={item.id}
                                    onClick={() => this.showAlbum(item.id)}
                                    leftAvatar={
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
                                >
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
    },
    pushToAlbum: (id) => {
        dispatch(push(`/photos/${id}`));
    }
});

const mapStateToProps = state => ({
    isDeskRequesting: state.desk.isRequesting,
    first_name: state.auth.first_name,
    albums: state.desk.albums,
    token: state.auth.token
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotosBoard))