import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";

export default function Detail() {
    let { id } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        axiosClient.get('/admin/users/' + id)
            .then(({ data }) => {
                setUser(data.user);
            });
    }, [id]);

    if (!user) {
        return (<div className="text-danger">User not found!</div>);
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                        <h1>User details</h1>
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
                            <div className="table-responsive rounded">
                                <table className="table table-bordered mb-0">
                                    <tbody className="fw-semibold text-nowrap">
                                        <tr>
                                            <th>Firstname</th>
                                            <td>{user.firstname}</td>
                                        </tr>
                                        <tr>
                                            <th>Lastname</th>
                                            <td>{user.lastname}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Avatar</th>
                                            <td>
                                                <div className="avatar avatar-md">
                                                    <img className="avatar-img" src={user.avatar} alt="user avatar" />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}