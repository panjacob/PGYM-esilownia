import React, {useEffect, useState} from "react";
import axiosInstance from "../../Axios/Axios";
import Button from "react-bootstrap/Button";
import axios_variebles from "../../Axios/Axios_variebles";

function TrainingGroupChangeImage(props){
    const [groupInfo, setGroupInfo] = useState([]);
    const [photo, setPhoto] = useState();
    const [groupInfoPhotos, setGroupInfoPhotos] = useState([]);
    const [photoSelected, setPhotoSelected] = useState('none');
    const [fileToUpload, setFileToUpload] = useState();
    const [fileToUploadName, setFileToUploadName] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [photoSelectedName, setPhotoSelectedName] = useState("");

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
                setGroupInfoPhotos(res.data.images)
                console.log(groupInfoPhotos)
                console.log(res.data)
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


        var formdata = new FormData();
        if(isFilePicked===true){
            formdata.append("image", fileToUpload, fileToUploadName);
        }
        formdata.append("training_group", groupInfo.id )

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/image/add", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload()

    }

    const photoChosen = (e) => {
        if(e.target.value !=='none'){
            setPhotoSelected(e.target.value)
            groupInfoPhotos.map((photo)=>{
                if(photo.id.toString() === e.target.value){
                    setPhotoSelectedName(photo.url)
                }
            })
        }else{
            setPhotoSelectedName( 'none')
            setPhotoSelected('none')
        }
    }


    function validateForm() {
        return photoSelected !== 'none';
    }

    const handleRemovePic = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));


        var formdata2 = new FormData();
            formdata2.append("id", photoSelected);


        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: formdata2,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/image/remove", requestOptions2)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload()

    }


    return(
            <div className="TrainingGroupChangeImage">
                <hr/>
                <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Zmień Zdjęcia Pokazowe</h1>
                <hr/>
                <div className="col-md-8 mx-auto mt-3">
                    <div className="card mb-3 bg-light">
                        <div className="card-body">
                            <div className="row">
                                <div className="mx-auto pt-1">
                                    <div className="custom-file">
                                        <input type="file" accept="image/png, image/gif, image/jpeg"
                                               className="custom-file-input" id="customFile" onChange={onFileChange}>
                                        </input>
                                        <label className="custom-file-label" htmlFor="customFile">Wybierz plik</label>
                                        {isFilePicked ? (
                                            <div>
                                                <p>Nazwa: {fileToUpload.name}</p>
                                                <p>Typ: {fileToUpload.type}</p>
                                                <p>Rozmiar: {fileToUpload.size}</p>
                                                <p>
                                                    Ostatnia modyfikacja:{' '}
                                                    {fileToUpload.lastModifiedDate.toLocaleDateString()}
                                                </p>
                                            </div>
                                        ) : (
                                            <p>Wybierz plik aby zobaczyć szczegóły</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <hr></hr>

                            <div className="row">
                                <div className="col-sm-3">
                                    <Button onClick={handleSubmitPic} variant="btn" size="sm">Dodaj Zdjęcie</Button>
                                </div>
                                <div className="col-sm-3">
                                    <p className="font-weight-bold">wybierz zdjęcie do usunięcia</p>
                                </div>
                                <div className='col-sm-3'>
                                    <select className='text-center' style={{width: '100%', height: '30px'}}
                                            onChange={photoChosen}>
                                        <option value='none'> - </option>
                                        {groupInfoPhotos.map(function (photos, idx) {
                                                    return (
                                                        <option
                                                            key={idx}
                                                            value={photos.id}
                                                            name={(photos.url).toString()}
                                                        >
                                                            {(photos.url).split("/").pop()}
                                                        </option>
                                                    )
                                        })}
                                    </select>
                                </div>
                                <div className="col-sm-3">
                                    <Button onClick={handleRemovePic} variant="btn" size="sm" disabled={!validateForm()}>Usuń Zdjęcie</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="container mt-4 mb-4">
                        <img src={axios_variebles.baseURL.slice(0, -1) + photoSelectedName}
                             alt="..." className="img-thumbnail"
                             />
                    </div>

                </div>
            </div>
    );
}
export default TrainingGroupChangeImage