import React, {useEffect, useState} from "react";
import axiosInstance from "../../Axios/Axios";
import Button from "react-bootstrap/Button";
import axios_variebles from "../../Axios/Axios_variebles";

function TrainingGroupChangeVideo(props){
    const [groupInfo, setGroupInfo] = useState([]);
    const [video, setVideo] = useState();
    const [groupInfoVideos, setGroupInfoVideos] = useState([]);
    const [videoSelected, setVideoSelected] = useState('none');
    const [fileToUpload, setFileToUpload] = useState();
    const [fileToUploadName, setFileToUploadName] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [videoSelectedName, setVideoSelectedName] = useState("");

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
                setGroupInfoVideos(res.data.videos)
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


        var formdata = new FormData();
        if(isFilePicked===true){
            formdata.append("video", fileToUpload, fileToUploadName);
        }
        formdata.append("training_group", groupInfo.id )

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/video/add", requestOptions)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    const videoChosen = (e) => {
        if(e.target.value !=='none'){
            setVideoSelected(e.target.value)
            groupInfoVideos.map((video)=>{
                if(video.id.toString() === e.target.value){
                    setVideoSelectedName(video.url)
                }
            })
        }else{
            setVideoSelectedName( 'none')
            setVideoSelected('none')
        }
    }


    function validateForm() {
        return videoSelected !== 'none';
    }

    const handleRemoveVid = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));


        var formdata2 = new FormData();
        formdata2.append("id", videoSelected);


        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: formdata2,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/video/remove", requestOptions2)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }


    return(
        <div className="TrainingGroupChangeVideo">
            <hr/>
            <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Zmień Filmy Instruktażowe</h1>
            <hr/>
            <div className="col-md-8 mx-auto mt-3">
                <div className="card mb-3 bg-light">
                    <div className="card-body">
                        <div className="row">
                            <div className="mx-auto pt-1">
                                <div className="custom-file">
                                    <input type="file" accept="video/*"
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
                                <Button onClick={handleSubmitVid} variant="btn" size="sm">Dodaj Film</Button>
                            </div>
                            <div className="col-sm-3">
                                <p className="font-weight-bold">wybierz film do usunięcia</p>
                            </div>
                            <div className='col-sm-3'>
                                <select className='text-center' style={{width: '100%', height: '30px'}}
                                        onChange={videoChosen}>
                                    <option value='none'> - </option>
                                    {groupInfoVideos.map(function (videos, idx) {
                                        return (
                                            <option
                                                key={idx}
                                                value={videos.id}
                                                name={(videos.url).toString()}
                                            >
                                                {(videos.url).split("/").pop()}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <Button onClick={handleRemoveVid} variant="btn" size="sm" disabled={!validateForm()}>Usuń Film</Button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="container mt-4 mb-4">
                    <video className="img-thumbnail" src={axios_variebles.baseURL.slice(0, -1) + videoSelectedName} controls/>
                </div>

            </div>
        </div>
    );
}
export default TrainingGroupChangeVideo