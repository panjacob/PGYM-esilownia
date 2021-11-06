import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePicture from '../../imgs/basic_profile_photo.jpg'
import Button from "react-bootstrap/Button";
import axiosInstance from "../Axios/Axios";

function Account_Edit_photo_change() {

    const [photo, setPhoto] = useState();
    const [fileToUpload, setFileToUpload] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

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
                    setPhoto('http://localhost:8000' + res.data.profile_photo)
                }
                console.log(res)
            });

    }, []);

    const onFileChange = (event) => {
        setFileToUpload(event.target.files[0]);
        setPhoto(URL.createObjectURL(event.target.files[0]));
        setIsFilePicked(true);
    };


    const handleSubmitPic = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("profile_photo", fileToUpload,'pp.png');

        for(let pair of formData.entries()) {
            console.log(pair[0]+', '+pair[1]);
        }

            axiosInstance
                .post(`/users/photo/add`, {formData}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                    }
                })
                .then((res) => {
                    //console.log(res)
                });
    }

    return (
        <div className="account_photo_change">

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3">

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
                                    <input type="file" className="custom-file-input" id="customFile" onChange={onFileChange}></input>
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

export default Account_Edit_photo_change;