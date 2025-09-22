import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { sweetAlert } from "../../utils/alerts/alert";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();


    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient.post('/auth/login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                sweetAlert('Welcome to admin panel');
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else if (response && response.status === 401) {
                    event.preventDefault();
                    setErrors({ invalidCredentials: [response.data.message] });
                }
            });
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card-group d-block d-md-flex row">
                        <div className="card col-md-7 p-4 mb-0">
                            <div className="card-body">
                                <h1>Login</h1>
                                <p className="text-body-secondary">Sign In to your account</p>
                                {errors && errors.invalidCredentials && <div className="alert alert-danger">
                                    {errors.invalidCredentials}
                                </div>}
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            <input ref={emailRef} className={`form-control ${errors && errors.email ? 'is-invalid' : ''}`} id="email" name="email" type="email" placeholder="Email" autoComplete="username" />
                                        </div>
                                        {errors && errors.email && <div className="text-danger ms-5">
                                            {errors.email}
                                        </div>}
                                    </div>
                                    <div className="mb-4">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <input ref={passwordRef} className={`form-control ${errors && errors.password ? 'is-invalid' : ''}`} id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
                                        </div>
                                        {errors && errors.password && <div className="text-danger ms-5">
                                            {errors.password}
                                        </div>}
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <button className="btn btn-primary px-4" id="login-button" type="submit">Login</button>
                                        </div>
                                        <div className="col-6 text-end">
                                            <Link className="btn btn-link px-0" to="/forgot-password">Forgot password?</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}