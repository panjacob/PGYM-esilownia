import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Button from "react-bootstrap/Button";
import axios_variebles from "../../Axios/Axios_variebles";

function DietRemoveParticipant(props) {

    const [dietInfo, setDietInfo] = useState([]);
    const [dietInfoParticipants, setDietInfoParticipants] = useState([]);
    const [userSelected, setUserSelected] = useState('none');
    const [usersData, setUsersData] = useState([])


    useEffect(() => {

        axiosInstance
            .post(`diet/get`, {id: props.groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setDietInfo(res.data)
                setDietInfoParticipants(res.data.participants)
            });

    }, [props.groupId]);

    useEffect(() => {

        let list = []
        dietInfoParticipants.map((user) => {
            axiosInstance
                .post(`/users/get/`, {id: user.user}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                    }
                })
                .then((res) => {
                    setUsersData([...usersData, res.data]);
                    list.push(res.data)
                    setUsersData(list)

                })
        })

    }, [dietInfoParticipants]);


    const userChosen = (e) => {
        setUserSelected(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var urlencoded = new URLSearchParams();
        urlencoded.append("diet_group", dietInfo.id);
        urlencoded.append("user", userSelected);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "diet/participant/remove", requestOptions)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .catch(error => console.log('error', error));

    };

    function validateForm() {
        return userSelected !== 'none';
    }

    return (
        <div className="dietRemoveParticipant">

            <hr/>
            <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Usuń użytkownika z
                diety</h1>
            <hr/>

            <div className="container justify-content-center border p-4">
                <div className="row mb-3 justify-content-center">
                    <div className='col-md-5 my-auto'>
                        <p className='m-0'><b>Wybierz użytkownika do usunięcia :</b></p>
                    </div>
                    <div className='col-md-5 my-auto'>
                        <select className='text-center' style={{width: '100%', height: '30px'}}
                                onChange={userChosen}>
                            <option value='none'> - </option>
                            {dietInfoParticipants.map(function (participants, idx) {
                                for (let i = 0; i < usersData.length; i++) {
                                    if (usersData[i].id === participants.user) {
                                        return (
                                            <option
                                                key={idx}
                                                value={participants.user}
                                            >
                                                {usersData[i].username}
                                            </option>
                                        )
                                    }
                                }
                            })}

                        </select>
                    </div>
                </div>

                <div className="row justify-content-center my-auto">
                    <div className='col-md-3'>
                        <Button onClick={handleSubmit} block size="md" className="btn" id="btn-login"
                                disabled={!validateForm()}>
                            Usuń Użytkownika
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DietRemoveParticipant;