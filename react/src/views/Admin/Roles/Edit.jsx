import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { sweetAlert } from "../../../utils/alerts/alert";

export default function Edit() {
    const { id } = useParams();

    const [role, setRole] = useState({
        id: null,
        name: '',
        slug: '',
        permissions: [],
    });

    const nameRef = useRef();
    const slugRef = useRef();
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const [permissions, setPermissions] = useState([]);

    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/admin/roles/' + id)
            .then(({ data }) => {
                setRole(data.role);
                setSelectedPermissions(data.role.permissions.map(p => String(p.id)));
            });
        axiosClient.get('/admin/permissions')
            .then(({ data }) => {
                setPermissions(data.permissions);
            });
    }, [id]);

    const handlePermissionChange = (event) => {
        const value = event.target.value;

        setSelectedPermissions((prev) =>
            prev.includes(value)
            ? prev.filter((id) => id !== value)
            : [...prev, value]
        );
    };

    const EditRole = (event) => {
        event.preventDefault();

        const payload = {
            name: nameRef.current.value,
            slug: slugRef.current.value,
            permissions: selectedPermissions,
        }

        axiosClient.put('/admin/roles/' + id, payload)
            .then(({ data }) => {
                navigate('/roles');
                sweetAlert(data.message);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }

    if (!role) {
        return (<div className="text-danger">Role not found!</div>);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between mb-3">
                        <h1>Edit role</h1>
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
                            <form onSubmit={EditRole}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name <sup className="text-danger">*</sup></label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input ref={nameRef} value={role.name} onChange={event => setRole({ ...role, name: event.target.value })} className={`form-control ${errors && errors.name ? 'is-invalid' : ''}`} type="text" id="name" placeholder="Name" />
                                            </div>
                                            {errors && errors.name && <div className="text-danger ms-5">
                                                {errors.name}
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="slug" className="form-label">Slug <sup className="text-danger">*</sup></label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input ref={slugRef} value={role.slug} onChange={event => setRole({ ...role, slug: event.target.value })} className={`form-control ${errors && errors.slug ? 'is-invalid' : ''}`} type="text" id="slug" placeholder="Last Name" />
                                            </div>
                                            {errors && errors.slug && <div className="text-danger ms-5">
                                                {errors.slug}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <h5>Permissions</h5>
                                <div className="row">
                                    {permissions.length > 0
                                        ? permissions.map((permission) => (
                                            <div className="col-md-6" key={permission.id}>
                                                <div className="mb-3">
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                value={permission.id}
                                                                name="permissions[]"
                                                                checked={selectedPermissions.includes(String(permission.id))}
                                                                onChange={handlePermissionChange}
                                                            />
                                                            {permission.name}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <div className="text-danger">No permission found!</div>}
                                </div>
                                <div className="d-flex justify-content-end gap-3">
                                    <Link className="btn btn-secondary" to="/roles">Cancel</Link>
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