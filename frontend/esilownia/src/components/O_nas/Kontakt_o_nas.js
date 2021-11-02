import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    FaFacebookF,
    FaTwitter,
    FaGoogle,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaGem,
    FaHome,
    FaEnvelope, FaPhone, FaPrint,
} from "react-icons/fa";

function Kontakt() {
    return (
        <div className="kontakt_o_nas mt-5">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>

                <div className="row justify-content-between">
                    <a href="/o_nas" className="mx-4 text-reset">
                        <FaFacebookF/>
                    </a>
                    <a href="/o_nas" className="mx-4 text-reset">
                        <FaTwitter/>
                    </a>
                    <a href="/o_nas" className="mx-4 text-reset">
                        <FaGoogle/>
                    </a>
                    <a href="/o_nas" className="mx-4 text-reset">
                        <FaInstagram/>
                    </a>
                    <a href="/o_nas" className="mx-4 text-reset">
                        <FaLinkedinIn/>
                    </a>
                    <a href="/o_nas" className="mx-4 text-reset">
                        <FaGithub/>
                    </a>
                </div>

            </section>

            <section className="dane">
                <div className="container text-center text-md-start mt-5">

                    <div className="row mt-3">

                        <div className="col-md col-lg-4 col-xl-3 mx-auto mb-4">

                            <h6 className="text-uppercase fw-bold mb-4">
                                <FaGem className="mr-1"/>Nazwa Firmy
                            </h6>
                            <p>E-Gym Spk. z.o.o.</p>
                            <p>Grupa E-Siłownia</p>
                            <p>PJWSTK 2021</p>

                        </div>

                        <div className="col-md col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                            <h6 className="text-uppercase fw-bold mb-4">
                                Kontakt
                            </h6>

                            <p><FaHome className="mr-1"/> Gdańsk, Brzegi 55</p>
                            <p><FaEnvelope className="mr-1"/> mail@mail.com</p>
                            <p><FaPhone className="mr-1"/> + 48 000 000 000</p>
                            <p><FaPrint className="mr-1"/> + 48 000 000 000</p>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}

export default Kontakt;