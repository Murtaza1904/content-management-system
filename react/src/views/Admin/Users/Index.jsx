import { Link, useSearchParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useEffect, useState } from "react";
import { confirmAlert } from "../../../utils/alerts/confirm";
import { sweetAlert } from "../../../utils/alerts/alert";
import Pagination from "../../../components/app/Pagination";

export default function Index() {    
    const [users, setUsers] = useState();
    const [meta, setMeta] = useState(null);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const [currentPage, setPage] = useState(pageFromUrl);
    
    useEffect(() => {
        document.title = 'Users - CMS';
        setSearchParams({ page: currentPage });
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = (currentPage = 1) => {
        axiosClient.get('/admin/users?page=' + currentPage)
            .then(({ data }) => {
                setUsers(data.users);
                setMeta(data.meta);
            });
    }

    const deleteUser = id => {
        confirmAlert('Are you sure you want to delete this user?', () => {
            axiosClient.delete('/admin/users/' + id)
                .then(({ data }) => {
                    sweetAlert(data.message);
                    fetchUsers();
                })
        });
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between">
                        <h1>Users</h1>
                        <div>
                            <Link className="btn btn-primary" to="/users/create">
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
                                            <th className="bg-body-secondary text-center">
                                                <i className="bi bi-people"></i>
                                            </th>
                                            <th className="bg-body-secondary">User</th>
                                            <th className="bg-body-secondary text-center">Country</th>
                                            <th className="bg-body-secondary">Usage</th>
                                            <th className="bg-body-secondary text-center">Payment Method</th>
                                            <th className="bg-body-secondary">Updated At</th>
                                            <th className="bg-body-secondary"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && users.length > 0
                                            ? users.map((user, index) => (
                                                <tr className="align-middle" key={user.id}>
                                                    <td>{(meta.per_page * (meta.current_page - 1)) + (index + 1)}</td>
                                                    <td className="text-center">
                                                        <div className="avatar avatar-md">
                                                            <img className="avatar-img" src={user.avatar} alt="user avatar" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-nowrap">{user.firstname} {user.lastname}</div>
                                                        <div className="small text-body-secondary text-nowrap">{user.email}</div>
                                                    </td>
                                                    <td className="text-center">
                                                        <svg className="icon icon-xl">
                                                            <use xlinkHref="node_modules/@coreui/icons/sprites/flag.svg#cif-us"></use>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-between align-items-baseline">
                                                            <div className="fw-semibold">50%</div>
                                                            <div className="text-nowrap small text-body-secondary ms-3">Jun 11, 2023 - Jul 10, 2023</div>
                                                        </div>
                                                        <div className="progress progress-thin">
                                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <svg className="icon icon-xl">
                                                            <use xlinkHref="node_modules/@coreui/icons/sprites/brand.svg#cib-cc-mastercard"></use>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <div className="fw-semibold text-nowrap">{user.updated_at}</div>
                                                    </td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="btn btn-transparent p-0" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <Link className="dropdown-item" to={"/users/" + user.id}>Info</Link>
                                                                <Link className="dropdown-item" to={"/users/" + user.id + "/edit"}>Edit</Link>
                                                                <button className="dropdown-item text-danger" onClick={event => deleteUser(user.id)}>Delete</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : <tr className="text-center">
                                                <td colSpan="7" className="text-danger">No user found!</td>
                                            </tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {users && users.length > 0 && meta.currentPage !== meta.lastPage
                        ? <Pagination meta={meta} onPageChange={setPage} />
                        : ''}
                </div>
            </div>
        </>
    );
}