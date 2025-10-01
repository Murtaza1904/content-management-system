import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";

export default function Detail() {
    let { id } = useParams();
    const [role, setRole] = useState();

    useEffect(() => {
        axiosClient.get('/admin/roles/' + id)
            .then(({ data }) => {
                setRole(data.role);
            });
    }, [id]);

    if (!role) {
        return (<div className="text-danger">Role not found!</div>);
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                        <h1>Role details</h1>
                        <div>
                            <Link className="btn btn-secondary" to="/roles">
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
                                            <th>Name</th>
                                            <td>{role.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Slug</th>
                                            <td>{role.slug}</td>
                                        </tr>
                                        <tr>
                                            <th>Updated At</th>
                                            <td>{role.updated_at}</td>
                                        </tr>
                                        <tr>
                                            <th>Permissions</th>
                                            <td>
                                                {role.permissions.length > 0
                                                    ? role.permissions.map((permission) => (
                                                        <span className="badge bg-secondary me-1" key={permission.id}>{permission.name}</span>
                                                    ))
                                                    : <span className="text-muted">No permissions assigned</span>
                                                }
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