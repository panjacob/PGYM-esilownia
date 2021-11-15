import React from 'react';
import zxcvbn from 'zxcvbn';

const RegisterNotifications = ({email, password, rep_password, login, firstname, lastname}) => {
    const testResult = zxcvbn(password);

    const passWarning = () => {
        if (password.length > 0) {
            switch (testResult.score) {
                case 0:
                    return 'Zbyt słabe hasło';
                case 1:
                    return 'Zbyt słabe hasło';
                case 2:
                    return '';
                case 3:
                    return '';
                case 4:
                    return '';
                default:
                    return '';
            }
        }
    }

    const emailWarnign = () => {
        if (email.length > 0) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(email).toLowerCase())) {
                return '';
            } else {
                return 'Błedny E-mail'
            }
        }
    }

    const rep_pasWarning = () => {
        if (rep_password.length > 0) {
            if (password !== rep_password) {
                return 'Hasła sie nie zgadzają';
            } else {
                return '';
            }
        }
    }

    const loginWarnign = () => {
        if (login.length > 0) {
            if (login.length < 2) {
                return 'Zbyt krótki login'
            } else {
                return '';
            }
        }
    }

    const firstnameWarnign = () => {
        if (firstname.length > 0) {
            const re = /^[\s\p{L}]+$/u;
            if (re.test(String(firstname).toLowerCase())) {
                return '';
            } else {
                return 'Błedne znaki w imieniu'
            }
        }
    }

    const lastnameWarnign = () => {
        if (lastname.length > 0) {
            const re = /^[\s\p{L}]+$/u;
            if (re.test(String(lastname).toLowerCase())) {
                return '';
            } else {
                return 'Błedne znaki w imieniu'
            }
        }
    }

    return (
        <div className="warnings">

            <p className="alert alert-danger">{loginWarnign()}</p>
            <p className="alert alert-danger">{firstnameWarnign()}</p>
            <p className="alert alert-danger">{lastnameWarnign()}</p>
            <p className="alert alert-danger">{emailWarnign()}</p>
            <p className="alert alert-danger">{passWarning()}</p>
            <p className="alert alert-danger">{rep_pasWarning()}</p>

        </div>
    )
}

export default RegisterNotifications