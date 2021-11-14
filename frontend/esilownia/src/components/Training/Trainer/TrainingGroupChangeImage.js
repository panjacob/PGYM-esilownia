import React, {useEffect, useState} from "react";
import axiosInstance from "../../Axios/Axios";
import Button from "react-bootstrap/Button";

function TrainingGroupChangeImage(props){
    const [groupInfo, setGroupInfo] = useState([]);
    const [photo, setPhoto] = useState();
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
        setPhoto(URL.createObjectURL(event.target.files[0]));
        setIsFilePicked(true);
    };

    const handleSubmitPic = (e) => {
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

        fetch("http://127.0.0.1:8000/training/group/image/remove", requestOptions2)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        var formdata = new FormData();
        formdata.append("image", fileToUpload, fileToUploadName);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/training/group/image/add", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload()

    }
    return(
            <div className="TrainingGroupChangeImage">
                <hr/>
                <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Zmień Zdjęcie grupy</h1>
                <hr/>
                <div className="col-md-8 mx-auto mt-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="mx-auto">
                                    <h6 className="mb-0">Zdjecie Grupy</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mx-auto">
                                    <img src={photo} alt="..." className="img-thumbnail" width='200px'
                                         height='200px'/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mx-auto pt-1">
                                    <div className="custom-file">
                                        <input type="file" accept="image/png, image/gif, image/jpeg" className="custom-file-input" id="customFile" onChange={onFileChange}></input>
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
                                    <Button onClick={handleSubmitPic} variant="primary" size="sm">Zmien Zdjecie</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default TrainingGroupChangeImage