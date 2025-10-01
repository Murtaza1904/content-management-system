import { Link, useSearchParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useEffect, useState } from "react";
import { confirmAlert } from "../../../utils/alerts/confirm";
import { sweetAlert } from "../../../utils/alerts/alert";
import Pagination from "../../../components/app/Pagination";

export default function Index() {
    const [roles, setRoles] = useState();
    const [meta, setMeta] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const [currentPage, setPage] = useState(pageFromUrl);

    useEffect(() => {
        setSearchParams({ page: currentPage });
        fetchRoles(currentPage);
    }, [currentPage]);

    const fetchRoles = (currentPage = 1) => {
        axiosClient.get('/admin/roles?page=' + currentPage)
            .then(({ data }) => {
                setRoles(data.roles);
                setMeta(data.meta);
            });
    }

    const deleteRole = id => {
        confirmAlert('Are you sure you want to delete this role?', () => {
            axiosClient.delete('/admin/roles/' + id)
                .then(({ data }) => {
                    sweetAlert(data.message);
                    fetchRoles();
                })
        });
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between">
                        <h1>Roles</h1>
                        <div>
                            <Link className="btn btn-primary" to="/roles/create">
                                <svg className="icon">
                                    <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-plus"></use>
                                </svg>
                                <span className="ms-3">Add</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="table-responsive rounded">
                                <table className="table border mb-0">
                                    <thead className="fw-semibold text-nowrap">
                                        <tr className="align-middle">
                                            <th className="bg-body-secondary">#</th>
                                            <th className="bg-body-secondary">Name</th>
                                            <th className="bg-body-secondary text-center">Slug</th>
                                            <th className="bg-body-secondary">Updated At</th>
                                            <th className="bg-body-secondary"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roles && roles.length > 0
                                            ? roles.map((role, index) => (
                                                <tr className="align-middle" key={role.id}>
                                                    <td>{(meta.per_page * (meta.current_page - 1)) + (index + 1)}</td>
                                                    <td>{role.name}</td>
                                                    <td>{role.slug}</td>
                                                    <td>
                                                        <div className="fw-semibold text-nowrap">{role.updated_at}</div>
                                                    </td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="btn btn-transparent p-0" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <Link className="dropdown-item" to={"/roles/" + role.id}>Info</Link>
                                                                <Link className="dropdown-item" to={"/roles/" + role.id + "/edit"}>Edit</Link>
                                                                <button className="dropdown-item text-danger" onClick={event => deleteRole(role.id)}>Delete</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : <tr className="text-center">
                                                <td colSpan="5" className="text-danger">No role found!</td>
                                            </tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {roles && roles.length > 0 && meta.currentPage !== meta.lastPage
                        ? <Pagination meta={meta} onPageChange={setPage} />
                        : ''}
                </div>
            </div>
        </>
    );
}