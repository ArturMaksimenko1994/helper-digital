import { Navigate } from "react-router";
import styles from "./../aut.module.scss";

const PageForgotPassword = () => {

  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.aut}>PageForgotPassword</div>
  );
};

export default PageForgotPassword;
