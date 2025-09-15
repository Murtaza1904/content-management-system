import { Outlet } from "react-router-dom";
// import "../../assets/css/error.css";
import NotFoundImage from "../../assets/images/error.svg";

export default function ErrorLayout() {
    return (
        <>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 align-self-center">
                            <img src={NotFoundImage} alt="404 Not Found" width="100%" />
                        </div>
                        <div className="col-md-6 align-self-center">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}