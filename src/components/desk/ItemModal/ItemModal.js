import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {addListAction} from '../../../store/actions/desk';
import {changeItemAction, hideItemWindowAction, deleteItemAction} from '../../../store/actions/itemChange';

// Gap between buttons
const styles = {
    button: {
        margin: 4
    }
};

class ItemsModal extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            name: this.props.item.name,
            content: this.props.item.content,
            errorText: ''
        };
        this.changeValue = this.changeValue.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({name: nextProps.item.name, content: nextProps.item.content})
    }

    handleClose = () => {

        this.props.hideItemWindowAction();
    };

    handleDelete() {
        const deletedItem = {
            id: this.props.item.id,
            name: this.state.name,
            content: this.state.content
        };
        this.props.deleteItemAction(deletedItem, this.props.items);
    }

    changeValue(event) {
        this.setState({[event.target.name]: event.target.value});
        if(this.state.errorText !== '' && event.target.name === 'name') {
            this.setState({errorText: ''})
        }
    }

    submitForm(e) {
        // handling form errors
        if(this.state.errorText === '' && this.state.name === '') {
            this.setState({errorText: '* TODO Name is required'});
            return false;
        }
        // new item which replace old one
        const changedItem = {
            id: this.props.item.id,
            name: this.state.name,
            content: this.state.content
        };
        this.props.changeItemAction(changedItem, this.props.items);

        // reset form errors
        this.setState({errorText: ''});
        e.preventDefault()
    }

    render() {
        //Submit, Delete, Cancel buttons
        const actions = [
            <RaisedButton
                style={styles.button}
                label="Cancel"
                onClick={this.handleClose}
            />,
            <RaisedButton
                style={styles.button}
                label="Delete"
                secondary={true}
                onClick={(e) => this.handleDelete(e, document.forms[0].value)}
            />,
            <RaisedButton
                style={styles.button}
                label="Submit"
                type="submit"
                primary={true}
                disabled={this.state.errorText !== ''}
                onClick={(e) => this.submitForm(e, document.forms[0].value)}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="TODO Item"
                    actions={actions}
                    modal={true}
                    open={this.props.isItemWindowVisible}
                >
                    <div style={{width: '100%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'stretch'}} name="itemForm">
                        <TextField
                            fullWidth={true}
                            floatingLabelText="TODO Name *"
                            name="name"
                            hintText="TODO Name"
                            errorText={this.state.errorText}
                            value={this.state.name}
                            onChange={this.changeValue}
                        />
                        <TextField
                            name="content"
                            fullWidth={true}
                            floatingLabelText="TODO Message"
                            multiLine={true}
                            rows={2}
                            rowsMax={4}
                            value={this.state.content}
                            onChange={this.changeValue}
                        />
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    hideItemWindowAction: () => {
        dispatch(hideItemWindowAction());
    },
    addListAction: () => {
        dispatch(addListAction());
    },
    changeItemAction: (item, items) => {
        dispatch(changeItemAction(item, items));
    },
    deleteItemAction: (item, items) => {
        dispatch(deleteItemAction(item, items));
    },
});

const mapStateToProps = state => ({
    items: state.desk.items,
    item: state.itemChange.item,
    isItemWindowVisible: state.itemChange.isItemWindowVisible
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemsModal));