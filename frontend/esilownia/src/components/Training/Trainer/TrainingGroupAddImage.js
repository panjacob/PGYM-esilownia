import {useEffect, useState} from "react";
import axiosInstance from "../../Axios/Axios";

function TrainingGroupAddImage(props){
    const [groupInfo, setGroupInfo] = useState([]);

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
            });

    }, [props.groupId]);
    return(
        <div>

        </div>
    )
}
export default TrainingGroupAddImage