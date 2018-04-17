import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { push } from 'react-router-redux';
import {getAlbumByIdAction} from '../../../store/actions/desk';
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

class AlbumBoard extends React.Component {

    constructor(props) {
        super(props);
        this.showPhoto = this.showPhoto.bind(this);
        console.log(this.props.match.params.id);
    }

    componentDidMount() {
        this.props.getAlbumByIdAction()
    }

    showPhoto(id) {
        this.props.pushToPhoto(id);
    }

    render() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={`Welcome, ${this.props.first_name}`} />
                    </ToolbarGroup>
                </Toolbar>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAlbumByIdAction: () => {
        dispatch(getAlbumByIdAction());
    },
    pushToAlbum: (id) => {
        console.log(id);
        dispatch(push(`/photos/${id}`));
    }
});

const mapStateToProps = state => ({
    isDeskRequesting: state.desk.isRequesting,
    first_name: state.auth.first_name,
    albums: state.desk.albums,
    token: state.auth.token
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumBoard))