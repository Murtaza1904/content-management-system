import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card-group d-block d-md-flex row">
                        <div class="card col-md-7 p-4 mb-0">
                            <div class="card-body">
                                <h1>Forgot Password</h1>
                                <p class="text-body-secondary">Enter your existing account email.</p>
                                <div class="input-group mb-3"><span class="input-group-text">
                                    <svg class="icon">
                                        <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
                                    </svg></span>
                                    <input class="form-control" type="text" placeholder="Email" />
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <button class="btn btn-primary px-4" type="button">Send</button>
                                    </div>
                                    <div class="col-6 text-end">
                                        <Link class="btn btn-link px-0" to="/login">Already have an account?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}