import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Dropzone from "react-dropzone";
import LinearProgress from 'material-ui/LinearProgress';

class UploadsBoard extends React.Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            completed: 0
        }
    }


    onDrop = files => {
        this.setState({ completed: 0 });
        /*var data = new FormData();
        files.forEach(file => {
            data.append("files[]", file, file.name);
        });*/

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
        const divStyle = {
            border: '1px solid black'
        };
        return (
            <div style={divStyle}>
                <Dropzone onDrop={this.onDrop} className="dropzone-box">
                    <div>Try dropping some files here, or click to select files to upload. {this.state.completed}</div>
                    <LinearProgress mode="determinate" value={this.state.completed} />
                </Dropzone>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({
    isAuthRequesting: state.auth.isRequesting,
    isDeskRequesting: state.desk.isRequesting
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadsBoard))