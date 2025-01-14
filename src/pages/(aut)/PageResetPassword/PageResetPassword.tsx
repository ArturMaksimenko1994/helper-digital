import { Navigate } from "react-router";
import styles from "./../aut.module.scss";

const PageResetPassword = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={styles.aut}>PageResetPassword</div>
    );
};

export default PageResetPassword;