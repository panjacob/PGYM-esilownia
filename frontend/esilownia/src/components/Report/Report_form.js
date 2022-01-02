import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios_variebles from "../Axios/Axios_variebles";
import Button from "react-bootstrap/Button";

function ReportForm() {

    const [description, setDescription] = useState("");
    const [title, setTitle] = useState('');

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
        formdata.append("title", title);
        formdata.append("file", fileToUpload, fileToUploadName);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "moderator/report/create", requestOptions)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    function validateForm() {
        return description.length > 0 && title.length > 0 && fileToUpload !== undefined;
    }

    return (
        <div className="reportForm">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Zgłoszenia</h1>
                <h1 style={{"fontSize": "2vw"}} className="display-1 font-weight-light mb-4">Przed wyslaniem zgłoszenia należy uzupełnić tytuł, opis oraz załączyć screenshot zgłaszanej treści.</h1>
                <hr></hr>
            </div>

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3 bg-light">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 text-secondary">
                                <h1 style={{"fontSize": "1.25vw"}} className="display-1 font-weight-light mb-4">Tytuł zgłoszenia</h1>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-12 text-secondary">
                                <textarea type="text-area" rows={5} className="form-control form-control-sm"
                                          onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-secondary">
                                <h1 style={{"fontSize": "1.25vw"}} className="display-1 font-weight-light mb-4">Opis zgłoszenia</h1>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-12 text-secondary">
                                <textarea type="text-area" rows={5} className="form-control form-control-sm"
                                          onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" onChange={onFileChange}></input>
                            <label className="custom-file-label" htmlFor="customFile">Wybierz plik</label>
                            <div className='mt-2 text-center mb-2'>
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

                        <div className="row mt-3">
                            <div className="col-sm-3">
                                <Button disabled={!validateForm()} onClick={handleSubmitData} variant="btn" size="sm">Wyślij zgłoszenie</Button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );

}

export default ReportForm;