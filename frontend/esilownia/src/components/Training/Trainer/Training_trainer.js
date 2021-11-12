import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Button from "react-bootstrap/Button";

function TrainingTrainer(props) {

    const [groupInfo, setGroupInfo] = useState([]);
    const [groupInfoParticipants, setGroupInfoParticipants] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);
    const [username, setUsername] = useState("")


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
                setGroupInfoParticipants(res.data.participants)
            });

        axiosInstance
            .post(`users/info/`, {},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUsername(res.data.username)
            });

    }, [props.groupId]);


    const typesChecked = (e) => {
    setTypeSelected(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(username)
        console.log(typeSelected)

        var urlencoded = new URLSearchParams();
        urlencoded.append("training_group_id", groupInfo.id);
        urlencoded.append("user_id", typeSelected);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/training/group/participant/remove", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    };

    function validateForm() {
        return typeSelected.length > 0;
    }

    return (
        <div className="trainingTrainer">
            <div className="container">
                <div className="container text-center">
                    <hr/>
                    <h1>Usuń użytkownika z grupy</h1>
                    <hr/>
                    <p>{JSON.stringify(groupInfo.participants)}</p>
                    <p>Owner: {JSON.stringify(groupInfo.owner)}</p>
                    <p>Id grupy: {JSON.stringify(groupInfo.id)}</p>
                    <div className="container border">
                        <select className="m-4" size="lg" controlId="text" onChange={typesChecked}>

                            {groupInfoParticipants.map((participants, idx) => (
                                <option
                                    key={idx}
                                    value={participants.user}
                                >
                                    {participants.user}
                                </option>
                            ))
                            }
                        </select>
                        <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login"
                                disabled={!validateForm()}>
                            Usuń Użytkownika
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default TrainingTrainer;