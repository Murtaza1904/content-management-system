import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { sweetAlert } from "../../../utils/alerts/alert";

export default function Edit() {
    const { id } = useParams();

    const [user, setUser] = useState({
        id: null,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/admin/users/' + id)
            .then(({ data }) => {
                setUser(data.user);
            });
    }, [id]);

    const EditUser = (event) => {
        event.preventDefault();

        const payload = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.put('/admin/users/' + id, payload)
            .then(({ data }) => {
                navigate('/users');
                sweetAlert(data.message);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }

    if (!user) {
        return (<div className="text-danger">User not found!</div>);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                        <h1>Edit user</h1>
                        <div>
                            <Link className="btn btn-secondary" to="/users">
                                <svg className="icon">
                                    <use xlinkHref="/node_modules/@coreui/icons/sprites/free.svg#cil-arrow-left"></use>
                                </svg>
                                <span className="ms-3">Back</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={EditUser}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="firstname" className="form-label">Firstname <sup className="text-danger">*</sup></label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input ref={firstnameRef} className={`form-control ${errors && errors.firstname ? 'is-invalid' : ''}`}
                                                    value={user.firstname} onChange={event => setUser({ ...user, firstname: event.target.value })} type="text" id="firstname" placeholder="First Name" />
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
                                                <input ref={lastnameRef} className={`form-control ${errors && errors.lastname ? 'is-invalid' : ''}`}
                                                    value={user.lastname} onChange={event => setUser({ ...user, lastname: event.target.value })} type="text" id="lastname" placeholder="Last Name" />
                                            </div>
                                            {errors && errors.lastname && <div className="text-danger ms-5">
                                                {errors.lastname}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email <sup className="text-danger">*</sup></label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope-at"></i>
                                        </span>
                                        <input ref={emailRef} className={`form-control ${errors && errors.email ? 'is-invalid' : ''}`}
                                            value={user.email} onChange={event => setUser({ ...user, email: event.target.value })} type="email" id="email" placeholder="Email" autoComplete="username" />
                                    </div>
                                    {errors && errors.email && <div className="text-danger ms-5">
                                        {errors.email}
                                    </div>}
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password (Optional)</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-lock"></i>
                                                </span>
                                                <input ref={passwordRef} className={`form-control ${errors && errors.password ? 'is-invalid' : ''}`}
                                                    onChange={event => setUser({ ...user, password: event.target.value })} type="password" id="password" placeholder="Password" autoComplete="new-password" />
                                            </div>
                                            {errors && errors.password && <div className="text-danger ms-5">
                                                {errors.password}
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="password_confirmation" className="form-label">Password Confirmation (Optional)</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-lock"></i>
                                                </span>
                                                <input ref={passwordConfirmationRef} className={`form-control ${errors && errors.passwordConfirmation ? 'is-invalid' : ''}`}
                                                    onChange={event => setUser({ ...user, password_confirmation: event.target.value })} type="password" id="password_confirmation" placeholder="Confirm" autoComplete="new-password" />
                                            </div>
                                            {errors && errors.passwordConfirmation && <div className="text-danger ms-5">
                                                {errors.passwordConfirmation}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end gap-3">
                                    <Link className="btn btn-secondary" to="/users">Cancel</Link>
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