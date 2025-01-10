
import styles from "./PageProfile.module.scss";

const PageProfile = () => {
  return (
    <div className={styles.profile}>
      <div className="container">
        <div className={styles.profile__row}>
          <p>Name:</p>
          <p>Email:</p>
        </div>
      </div>
    </div>
  );
};

export default PageProfile;
