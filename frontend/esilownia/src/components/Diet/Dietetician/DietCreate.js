import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useCollapse from "react-collapsed";
import axios_variebles from "../../Axios/Axios_variebles";

function DietCreate() {

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
        return title.length > 0 && description.length > 0 && typeSelected.length > 0 && pricePractice > 0 && priceWeek > 0 && priceMonth > 0;
    }

    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse()

    const handleSubmit = (e) => {
        e.preventDefault();

        var formdata = new FormData();
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

        fetch(axios_variebles.baseURL + "diet/create", requestOptions)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    };

    useEffect(() => {

        axiosInstance
            .post(`diet/type/all`, {}, {
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


    const selectedGroupType = (e) => {
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
                    <h1 style={{"fontSize": "4.75vw"}} className="display-1 font-weight-light mb-4">Stwórz Dietę</h1>
                    <hr></hr>
                </div>

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
                                    <h6 className="mb-0">Profilowe Diety</h6>
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
                                            <p>Wybierz plik aby zobaczyć jego dane</p>
                                        )}
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Form className="border p-4" onSubmit={handleSubmit}>
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
                                <Form.Label>Rodzaj Diety</Form.Label>
                                <div onChange={selectedGroupType.bind(this)}>
                                    <div className="mx-2">
                                        <input type="radio" value="true"
                                               name="group_type"/> Prywatna
                                    </div>
                                    <div className="mx-2">
                                        <input type="radio" value="false"
                                               name="group_type"/> Grupowa
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

export default DietCreate;