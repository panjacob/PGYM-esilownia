import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";
import axios_variebles from "../Axios/Axios_variebles";

function DashboardApplication() {

    const [description, setDescription] = useState("");
    const [appRole, setAppRole] = useState([]);

    const [fileToUpload, setFileToUpload] = useState();
    const [fileToUploadName, setFileToUploadName] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);

    const onFileChange = (event) => {
        setFileToUpload(event.target.files[0]);
        setFileToUploadName(event.target.files[0].name)
        setIsFilePicked(true);
    };


    const handleSubmitData = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));

        var formdata = new FormData();

        formdata.append("description", description);

        if(appRole.includes('Trainer')){
            formdata.append("trainer", JSON.stringify(true));
        } else {
            formdata.append("trainer", JSON.stringify(false));
        }

        if(appRole.includes('Dietician')){
            formdata.append("dietician", JSON.stringify(true));
        } else {
            formdata.append("dietician", JSON.stringify(false));
        }

        formdata.append("file", fileToUpload, fileToUploadName);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "moderator/application/send", requestOptions)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    const ApplicationRole = (e) => {

        if(appRole.indexOf(e.target.value) !== -1) {
            let name = e.target.value;
            setAppRole(appRole.filter((e)=>(e !== name)))
        } else {
            let name = e.target.value;
            setAppRole([...appRole,name]);
        }

    }

    function validateForm() {
        return description.length > 0 && (appRole.includes('Trainer') || appRole.includes('Dietician')) && fileToUpload !== undefined;
    }

    return (
        <div className="dashboardApplication">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Aplikacja</h1>
                <h1 style={{"fontSize": "2vw"}} className="display-1 font-weight-light mb-4">Aplikuj na pozycje trenera
                    lub dietetyka</h1>
                <hr></hr>
            </div>

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3 bg-light">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 text-secondary">
                                <h1 style={{"fontSize": "1.25vw"}} className="display-1 font-weight-light mb-4">Tekst podania</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-secondary">
                                <textarea type="text-area" rows={5} className="form-control form-control-sm"
                                          onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 m-1 text-secondary">
                                <div onChange={ApplicationRole.bind(this)}>
                                    <div className="mx-2">
                                        <input type="checkbox" value="Trainer"
                                               name="application_role"/> Trener
                                    </div>
                                    <div className="mx-2">
                                        <input type="checkbox" value="Dietician"
                                               name="application_role"/> Dietetyk
                                    </div>
                                </div>
                            </div>
                        </div>
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

                        <div className="row mt-1">
                            <div className="col-sm-3">
                                <Button disabled={!validateForm()} onClick={handleSubmitData} variant="btn" size="sm">Wyślij aplikacje</Button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default DashboardApplication;