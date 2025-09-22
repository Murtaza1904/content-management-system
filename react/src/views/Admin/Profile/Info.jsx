import axiosClient from "../../../axios-client";
import { useEffect, useRef, useState } from "react";
import { sweetAlert } from "../../../utils/alerts/alert";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function Info() {
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const currentPasswordRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    const { user, setUser } = useStateContext();

    useEffect(() => {
        firstnameRef.current.value = user.firstname,
        lastnameRef.current.value = user.lastname
    });

    const updateInfo = (event) => {
        event.preventDefault();

        axiosClient.patch('/admin/info', {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
        }).then(({ data }) => {
            sweetAlert(data.message);
            // setUser(data.user);
        }).catch((error) => {
            const response = error.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        });
    }
    
    const updatePassword = (event) => {
        event.preventDefault();

        axiosClient.patch('/admin/password', {
            current_password: currentPasswordRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }).then(({ data }) => {
                sweetAlert(data.message);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-start mb-3">
                        <h1>Personal Info</h1>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={updateInfo}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="firstname" className="form-label">Firstname <sup className="text-danger">*</sup></label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input ref={firstnameRef} className={`form-control ${errors && errors.firstname ? 'is-invalid' : ''}`} type="text" id="firstname" placeholder="First Name" />
                                            </div>
                                            {errors && errors.firstname && <div className="text-danger ms-5">
                                                {errors.firstname}
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="lastname" className="form-label">Lastname <sup className="text-danger">*</sup></label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input ref={lastnameRef} className={`form-control ${errors && errors.lastname ? 'is-invalid' : ''}`} type="text" id="lastname" placeholder="Last Name" />
                                            </div>
                                            {errors && errors.lastname && <div className="text-danger ms-5">
                                                {errors.lastname}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope-at"></i>
                                        </span>
                                        <input value={user.email} className="form-control" type="email" id="email" placeholder="Email" autoComplete="username"
                                            disabled readOnly/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end gap-3">
                                    <button className="btn btn-primary" type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-start mb-3">
                        <h1>Password</h1>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={updatePassword}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="current-password" className="form-label">Current Password <sup className="text-danger">*</sup></label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-lock"></i>
                                                </span>
                                                <input ref={currentPasswordRef} className={`form-control ${errors && errors.password ? 'is-invalid' : ''}`} type="password" id="current-password" placeholder="Current Password" autoComplete="current-password" />
                                            </div>
                                            {errors && errors.password && <div className="text-danger ms-5">
                                                {errors.password}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="new-password" className="form-label">New Password <sup className="text-danger">*</sup></label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-lock"></i>
                                                </span>
                                                <input ref={passwordRef} className={`form-control ${errors && errors.password ? 'is-invalid' : ''}`} type="password" id="new-password" placeholder="New Password" autoComplete="new-password" />
                                            </div>
                                            {errors && errors.password && <div className="text-danger ms-5">
                                                {errors.password}
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="new-password-confirmation" className="form-label">New Password Confirmation <sup className="text-danger">*</sup></label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-lock"></i>
                                                </span>
                                                <input ref={passwordConfirmationRef} className={`form-control ${errors && errors.passwordConfirmation ? 'is-invalid' : ''}`} type="password" id="new-password-confirmation" placeholder="Confirm New Password" autoComplete="new-password" />
                                            </div>
                                            {errors && errors.passwordConfirmation && <div className="text-danger ms-5">
                                                {errors.passwordConfirmation}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end gap-3">
                                    <button className="btn btn-primary" type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}