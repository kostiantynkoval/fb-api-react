import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {renameListAction} from '../../../store/actions/desk';
import {hideListWindowAction} from '../../../store/actions/itemChange';

const styles = {
    button: {
        margin: 4
    }
};

class ListNameModal extends React.Component {
    constructor(props) {
        super(props);
        this.renameList = this.renameList.bind(this);
        this.state = {
            errorText: '',
            name: this.props.list.name
        };
        this.changeValue = this.changeValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({name: nextProps.list.name})
    }

    handleClose = () => {
        this.props.hideListWindowAction();
    };

    changeValue(event) {
        this.setState({name: event.target.value});
        if(this.state.errorText !== '' && event.target.value !== '') {
            this.setState({errorText: ''})
        }
    }

    //submitting modal window
    renameList() {
        // handling form errors
        if(this.state.errorText === '' && this.state.name === '') {
            this.setState({errorText: '* List title is required'});
            return false;
        }
        const newItems = this.props.items;

        // finding out list index which we want to update
        const listIndex = newItems.findIndex(item => item.id === this.props.list.id);

        // new item which replace old one
        newItems[listIndex].name = this.state.name;
        this.props.renameListAction(newItems);

        // reset form errors
        this.setState({errorText: ''});
    }

    render() {
        //Submit, Cancel buttons
        const actions = [
            <RaisedButton
                style={styles.button}
                label="Cancel"
                onClick={this.handleClose}
            />,
            <RaisedButton
                style={styles.button}
                label="Submit"
                primary={true}
                disabled={this.state.errorText !== ''}
                onClick={() => this.renameList()}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="List Title"
                    actions={actions}
                    modal={true}
                    open={this.props.isListWindowVisible}
                >
                    <TextField
                        value={this.state.name}
                        onChange={this.changeValue}
                        floatingLabelText="List Title*"
                        errorText={this.state.errorText}
                    />
                </Dialog>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    hideListWindowAction: () => {
        dispatch(hideListWindowAction());
    },
    renameListAction: (items) => {
        dispatch(renameListAction(items));
    },
});

const mapStateToProps = state => ({
    items: state.desk.items,
    list: state.itemChange.list,
    isListWindowVisible: state.itemChange.isListWindowVisible
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListNameModal));