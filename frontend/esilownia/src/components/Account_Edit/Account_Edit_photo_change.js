import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePicture from '../../imgs/basic_profile_photo.jpg'
import Button from "react-bootstrap/Button";
import axiosInstance from "../Axios/Axios";
import axios_variebles from "../Axios/Axios_variebles";

function Account_Edit_photo_change() {

    const [photo, setPhoto] = useState();
    const [fileToUpload, setFileToUpload] = useState();
    const [fileToUploadName, setFileToUploadName] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {

        axiosInstance
            .post(`users/info/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                if(res.data.profile_photo === null){
                    setPhoto(profilePicture)
                } else {
                    setPhoto(axios_variebles.baseURL.slice(0, -1) + res.data.profile_photo)
                }
                //console.log(res)
                setUserId(res.data.id)
            });

    }, []);

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
        formdata2.append("id", userId);

        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: formdata2,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "users/photo/remove", requestOptions2)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        var formdata = new FormData();
        formdata.append("profile_photo", fileToUpload, fileToUploadName);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "users/photo/add", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload()

    }

    return (
        <div className="account_photo_change">
            <div className="col-md-8 mx-auto mt-3">
                <div className="card mb-3 bg-light">
                    <div className="card-body">
                        <div className="row">
                            <div className="mx-auto">
                                <h6 className="mb-0">Zdjecie profilowe</h6>
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
                                    <div className="text-center mt-1">
                                    {isFilePicked ? (
                                        <div>
                                            <p>Nazwa : {fileToUpload.name}</p>
                                            <p>Typ : {fileToUpload.type}</p>
                                            <p>Wielkość : {fileToUpload.size} bytes</p>
                                            <p>
                                                Ostatnio modyfikowany :{' '}
                                                {fileToUpload.lastModifiedDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    ) : (
                                        <p>Select a file to show details</p>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-3">
                                <Button onClick={handleSubmitPic} variant="btn" size="sm">Zmien Zdjecie</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account_Edit_photo_change;