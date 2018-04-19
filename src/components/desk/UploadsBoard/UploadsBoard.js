import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dropzone from "react-dropzone";
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {LinearProgress} from 'material-ui/Progress';
import {uploadFilesAction, getAlbumsAction} from '../../../store/actions/desk';
import './UploadsBoard.css';

class UploadsBoard extends React.Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            completed: 0,
            accepted: [],
            rejected: [],
            album: '',
            error: ''
        }
    }

    handleChange = event => {
        this.setState({ album: event.target.value, error: '' });
    };

    onDrop = (accepted, rejected) => {

        if (this.state.album === '') {
            this.setState({error: 'Choose the album first'});
            return false;
        }

        const formData = [];
        accepted.forEach((file, i) => {
            formData[i] = new FormData();
            formData[i].append('file', file, file.name);
            this.props.uploadFilesAction(formData[i], this.state.album);
        });



        this.setState({ completed: 0, accepted, rejected });

        function progress(that, completed) {
            if (completed > 100) {
                that.setState({completed: 100});
            } else {
                that.setState({completed});
                const diff = Math.random() * 10;
                that.timer = setTimeout(() => progress(that, completed + diff), 1000);
            }
        }
        progress(this ,5);
    };

    componentDidMount() {
        this.props.getAlbumsAction();
    }

    render() {
        return (
            <div>
                <Toolbar style={{backgroundColor: 'cadetblue'}}>
                    <Typography variant="title" color="inherit" >
                        Please, drag files to the box
                    </Typography>
                </Toolbar>
                <form className='form' encType='multipart/form-data'>
                    {this.props.albums.length ?
                        (
                            <FormControl error={this.state.error !== ''} className='form-control'>
                                <InputLabel htmlFor="album">Select album</InputLabel>
                                <Select
                                    value={this.state.album}
                                    onChange={this.handleChange}
                                    input={<Input name="album" id="album" />}
                                >
                                    {this.props.albums.map(album => (
                                        <MenuItem key={album.id} value={album.id}>{album.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{this.state.error}</FormHelperText>
                            </FormControl>
                        ) : null
                    }

                    <Dropzone onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)} accept='image/jpeg, image/png' maxSize={4000000} className="dropzone-box">
                        {this.state.accepted.length ?
                            this.state.accepted.map(file => (
                                <div className='frameWrapper' key={file.name} >
                                    <div className='imageWrapper'><img src={file.preview} width={150} height={150} alt=""/><div style={{width: 150, height: 150}} className={this.state.completed === 100 ? 'bg-gray' : 'bg-gray active'}></div></div>
                                    <div className='progress-line'><LinearProgress variant="determinate" value={this.state.completed} /></div>
                                </div>
                            )) :
                            (<div className='drop-text'>Try dropping some files here, or click to select files to upload</div>)
                        }
                    </Dropzone>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    uploadFilesAction: (data, i) => {
        dispatch(uploadFilesAction(data, i));
    },
    getAlbumsAction: () => {
        dispatch(getAlbumsAction('select'));
    }
});

const mapStateToProps = state => ({
    isAuthRequesting: state.auth.isRequesting,
    isDeskRequesting: state.desk.isRequesting,
    albums: state.desk.albums
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadsBoard))