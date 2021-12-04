import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useCollapse from "react-collapsed";
import axios_variebles from "../../Axios/Axios_variebles";

function TrainingGroupCreate() {

    const [difficulity, setDifficulity] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pricePractice, setPricePractice] = useState(0);
    const [priceWeek, setPriceWeek] = useState(0);
    const [priceMonth, setPriceMonth] = useState(0);
    const [isPrivate, setIsPrivate] = useState('');

    const [type, setType] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);

    const [photo, setPhoto] = useState();
    const [fileToUpload, setFileToUpload] = useState();
    const [fileToUploadName, setFileToUploadName] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);

    function validateForm() {
        return difficulity.length > 0 && title.length > 0 && description.length > 0 && typeSelected.length > 0 && pricePractice > 0 && priceWeek > 0 && priceMonth > 0;
    }

    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse()

    const handleSubmit = (e) => {
        e.preventDefault();

        var formdata = new FormData();
        formdata.append("difficulty", difficulity);
        formdata.append("title", title);
        formdata.append("description", description);
        for (let i = 0; i < typeSelected.length; i++) {
            formdata.append("type", typeSelected[i]);
        }
        formdata.append("price_day", pricePractice);
        formdata.append("price_week", priceWeek);
        formdata.append("price_month", priceMonth);
        if(isFilePicked===true){
            formdata.append("image", fileToUpload, fileToUploadName);
        }
        formdata.append("is_private", isPrivate);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/create", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload()
    };

    useEffect(() => {

        axiosInstance
            .post(`training/group/type/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setType(res.data)
            })
            .catch(
                function (error) {
                    alert(error)
                    return Promise.reject(error)
                });

    }, []);

    const typesChecked = (e) => {

        if (typeSelected.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setTypeSelected(typeSelected.filter((e) => (e !== name)))
        } else {
            let name = e.target.name;
            setTypeSelected([...typeSelected, name]);
        }

    }

    const selectedDifficulty = (e) => {
        //console.log(e.target.value);
        setDifficulity(e.target.value)
    }

    const selectedGroupType = (e) => {
        //console.log(e.target.value);
        setIsPrivate(e.target.value)
    }

    const onFileChange = (event) => {
        setFileToUpload(event.target.files[0]);
        setFileToUploadName(event.target.files[0].name)
        setPhoto(URL.createObjectURL(event.target.files[0]));
        setIsFilePicked(true);
    };

    return (
        <div className="createGroup">
            <div className="container">

                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Stwórz Grupę</h1>
                    <hr></hr>
                </div>


                <div className='container'></div>

                <div className='row mx-auto ml-0 mr-0 justify-content-center'>
                    <div className='row border p-4' style={{minHeight: '120px'}}>

                        <div className="col-md-5 text-center my-auto" style={{minWidth: '200px'}}>
                            <button block size="lg" className="btn btn-lg" id="btn-login"
                                    {...getToggleProps()}>
                                {(isExpanded) ? 'Zamknij Panel' : 'Stwórz Grupę'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="container" {...getCollapseProps()}>

                        <div className="border p-4 mb-1">
                            <div className="row">
                                <div className="mx-auto">
                                    <h6 className="mb-0">Profilowe Grupy</h6>
                                </div>
                            </div>

                        <div className="row">
                            <div className="mx-auto">
                                <img src={photo} alt="..." className="img-thumbnail" width='200px'
                                     height='200px'/>
                            </div>
                        </div>

                        <div className="mx-auto pt-1">
                            <div className="custom-file">
                                <input type="file" accept="image/png, image/gif, image/jpeg" className="custom-file-input" id="customFile" onChange={onFileChange}></input>
                                <label className="custom-file-label" htmlFor="customFile">Wybierz plik</label>
                                <div className="text-center mt-1">
                                    <hr/>
                                    {isFilePicked ? (
                                        <div>
                                            <p>Nazwa : {fileToUpload.name}</p>
                                            <p>Typ : {fileToUpload.type}</p>
                                            <p>Wielkość : {fileToUpload.size} bytes</p>
                                            <p>
                                                Ostatnio modyfikowany :{' '}
                                                {fileToUpload.lastModifiedDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    ) : (
                                        <p>Select a file to show details</p>
                                    )}
                                    <hr/>
                                </div>
                            </div>
                        </div>
                        </div>

                <Form className="border p-4" onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="text">
                        <Form.Label>Stopień Zaawansowania</Form.Label>
                        <div onChange={selectedDifficulty.bind(this)}>
                            <div className="mx-2">
                                <input type="radio" value="0"
                                       name="group_difficulty"/> Łatwy
                            </div>
                            <div className="mx-2">
                                <input type="radio" value="1"
                                       name="group_difficulty"/> Średni
                            </div>
                            <div className="mx-2">
                                <input type="radio" value="2"
                                       name="group_difficulty"/> Zaawansowany
                            </div>
                            <div className="mx-2">
                                <input type="radio" value="3"
                                       name="group_difficulty"/> Armagedon
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group size="lg" controlId="text">
                        <Form.Label>Tytuł</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="text">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="text">
                        <Form.Label>Typ</Form.Label>
                        {type.map((types) => (
                            <div key={`inline-checkbox-${types.id}`} className="mb-3">
                                <Form.Check
                                    inline
                                    name={types.id}
                                    type="checkbox"
                                    onChange={typesChecked.bind(this)}
                                    id={`inline-checkbox-${types.id}`}
                                /> {types.type.charAt(0).toUpperCase() + types.type.slice(1)}
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group size="lg" controlId="text">
                        <Form.Label>Rodzaj grupy</Form.Label>
                        <div onChange={selectedGroupType.bind(this)}>
                            <div className="mx-2">
                                <input type="radio" value="true"
                                       name="group_type"/> Prywatny
                            </div>
                            <div className="mx-2">
                                <input type="radio" value="false"
                                       name="group_type"/> Grupowy
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group size="lg" controlId="text">
                        <Form.Label>Ceny</Form.Label>
                        <div className="row justify-content-center">
                            <div className="col-md-3">
                                <Form.Label>Dzień</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={pricePractice}
                                    onChange={(e) => setPricePractice(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <Form.Label>Tydzień</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={priceWeek}
                                    onChange={(e) => setPriceWeek(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <Form.Label>Miesiąc</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={priceMonth}
                                    onChange={(e) => setPriceMonth(e.target.value)}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login"
                            disabled={!validateForm()}>
                        Utwórz Grupę
                    </Button>
                </Form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TrainingGroupCreate;