import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrainingRemove(){
    
    const [trainingId, setTrainingId] = useState("");
 

const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
        .post(`training/remove`, {
            trainingId: trainingId,
        })
        .then((res) => {
            //console.log(res)
            //console.log(res.data)
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            localStorage.setItem('token_type', res.data.token_type);

        });
};

    return(
        <div className="removeTraining">
            <Form onSubmit={handleSubmit}>
                <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login" type="submit" onChange={(e) => setTrainingId(e.target.value)} >
                    Usuń Trening
                </Button>
            </Form>
        </div>
    );
}
export default TrainingRemove;