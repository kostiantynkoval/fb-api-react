import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {logoutAction} from '../../../store/actions/auth';
import DeskArea from '../DeskArea/DeskArea';
import ItemModal from '../ItemModal/ItemModal';
import ListNameModal from '../ListNameModal/ListNameModal';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutAction();
    }


    render() {
        return (
            <div>
                {/* Fader for requests */}
                {this.props.isAuthRequesting || this.props.isDeskRequesting ? <div className="fader"></div> : null}

                {/* Top toolbar */}
                <Toolbar style={{
                    backgroundColor: '#b7b7b7',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <ToolbarGroup>
                        <ToolbarTitle text="Simple React Desk"/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <RaisedButton
                            label="Logout"
                            secondary={true}
                            style={{width: '120px'}}
                            onClick={this.handleLogout}/>
                    </ToolbarGroup>
                </Toolbar>

                {/* Board  */}
                <DeskArea/>

                {/* Modal window for items changes handling */}
                <ItemModal/>

                {/* Modal window for change list name */}
                <ListNameModal/>

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