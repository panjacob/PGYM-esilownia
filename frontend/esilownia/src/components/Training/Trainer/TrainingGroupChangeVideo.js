import React, {useEffect, useState} from "react";
import axiosInstance from "../../Axios/Axios";
import Button from "react-bootstrap/Button";
import axios_variebles from "../../Axios/Axios_variebles";

function TrainingGroupChangeVideo(props){
    const [groupInfo, setGroupInfo] = useState([]);
    const [video, setVideo] = useState();
    const [fileToUpload, setFileToUpload] = useState();
    const [fileToUploadName, setFileToUploadName] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);

    useEffect(() => {

        axiosInstance
            .post(`training/group/get`, {id: props.groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setGroupInfo(res.data)
            });

    }, [props.groupId]);

    const onFileChange = (event) => {
        setFileToUpload(event.target.files[0]);
        setFileToUploadName(event.target.files[0].name)
        setVideo(URL.createObjectURL(event.target.files[0]));
        setIsFilePicked(true);
    };

    const handleSubmitVid = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));

        var formdata2 = new FormData();
        formdata2.append("id", groupInfo.id);

        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: formdata2,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/video/remove", requestOptions2)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        var formdata = new FormData();
        formdata.append("video", fileToUpload, fileToUploadName);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/video/add", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload()

    }
    return(
        <div className="TrainingGroupChangeImage">
            <hr/>
            <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Zmień Film Grupy</h1>
            <hr/>
            <div className="col-md-8 mx-auto mt-3">
                <div className="card mb-3 bg-light">
                    <div className="card-body">
                        <div className="row">
                            <div className="mx-auto">
                                <h6 className="mb-0">Film Grupy</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <img src={video} alt="..." className="img-thumbnail" width='200px'
                                     height='200px'/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto pt-1">
                                <div className="custom-file">
                                    <input type="file" accept="video/*" className="custom-file-input" id="customFile" onChange={onFileChange}></input>
                                    <label className="custom-file-label" htmlFor="customFile">Wybierz plik</label>
                                    {isFilePicked ? (
                                        <div>
                                            <p>Filename: {fileToUpload.name}</p>
                                            <p>Filetype: {fileToUpload.type}</p>
                                            <p>Size in bytes: {fileToUpload.size}</p>
                                            <p>
                                                lastModifiedDate:{' '}
                                                {fileToUpload.lastModifiedDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    ) : (
                                        <p>Select a file to show details</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <Button onClick={handleSubmitVid} variant="btn" size="sm">Zmien Film</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TrainingGroupChangeVideo