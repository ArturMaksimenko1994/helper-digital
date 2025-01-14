import { Navigate } from "react-router";
import styles from "./../aut.module.scss";

const PageRegister = () => {

    const token = localStorage.getItem("authToken");

    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={styles.aut}>PageRegister</div>
    );
};

export default PageRegister;