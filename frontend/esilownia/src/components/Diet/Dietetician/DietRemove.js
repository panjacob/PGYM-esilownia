import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Button from "react-bootstrap/Button";
import axios_variebles from "../../Axios/Axios_variebles";
import {Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function DietRemove(props) {

    const [dietInfo, setDietInfo] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);


    const history = useHistory();

    function OpenModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Czy na pewno chcesz usunąć Dietę ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Spowoduje to usunięcie wszystkich danych związanych z dietą oraz spotkaniami zawartymi w diecie.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn" id="btn-danger" onClick={handleSubmit}>Tak</Button>
                    <Button onClick={props.onHide}>Nie</Button>
                </Modal.Footer>
            </Modal>
        );
    }

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
            });

    }, [props.groupId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", dietInfo.id);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "diet/remove", requestOptions)
            .then(response => {
                response.text();
                history.goBack();
            })
            .catch(error => console.log('error', error));

    };


    return (
        <div className="trainingGroupRemove">

            <hr/>
            <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Usuń Dietę</h1>
            <hr/>
            <div className="row justify-content-center my-auto">
                <div className='col-md-3'>
                    <Button onClick={() => setModalShow(true)} block size="lg" className="btn btn-danger" id="btn-danger"
                    >
                        Usuń Dietę
                    </Button>
                    <OpenModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </div>
    );

}

export default DietRemove;