import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dropzone from "react-dropzone";
import LinearProgress from 'material-ui/LinearProgress';
import {uploadFilesAction} from '../../../store/actions/desk';
import './UploadsBoard.css';

class UploadsBoard extends React.Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            completed: 0,
            accepted: [],
            rejected: []
        }
    }


    onDrop = (accepted, rejected) => {
        const formData = new FormData();
        accepted.forEach(file => {
            console.log('file', file);
            formData.append('files[]', file, file.name);
        });

        this.setState({ completed: 0, accepted, rejected });
        this.props.uploadFilesAction(formData);



        //const options = { content: formData };
        //this.props.uploadFilesAction(options);

        /*var req = request.post("http://localhost:3001");
        req.on('progress', event => {
            var percent = Math.floor(event.percent);
            if (percent >= 100) {
                this.setState({ completed: 100 });
            } else {
                this.setState({ completed: percent });
            }
        });*/

        /*const that = this;
        req.send(data);
        req.end((err, res) => {
            console.log("Successfully uploaded");
        });*/

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

    render() {
        console.log(this.state);
        const divStyle = {
            border: '1px solid black',
            minHeight: '100px',
            display: 'flex',
            flexFlow: 'row wrap'
        };
        return (
            <div style={divStyle}>
                <Dropzone onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)} accept='image/jpeg, image/png' inputProps={{encType: 'multipart/form-data'}} maxSize={4000000} style={divStyle} className="dropzone-box">
                    {this.state.accepted.length ?
                        this.state.accepted.map(file => (
                            <div className='frameWrapper' key={file.name} >
                                <div className='imageWrapper'><img src={file.preview} width={200} height={200} alt=""/><div style={{width: 200, height: 200}} className={this.state.completed === 100 ? 'bg-gray' : 'bg-gray active'}></div></div>
                                <div className='progress-line'><LinearProgress mode="determinate" value={this.state.completed} /></div>
                            </div>
                        )) :
                        (<div>Try dropping some files here, or click to select files to upload.</div>)
                    }
                    <div>{this.state.completed}</div>
                </Dropzone>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    uploadFilesAction: (data) => {
        dispatch(uploadFilesAction(data));
    }
});

const mapStateToProps = state => ({
    isAuthRequesting: state.auth.isRequesting,
    isDeskRequesting: state.desk.isRequesting
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadsBoard))