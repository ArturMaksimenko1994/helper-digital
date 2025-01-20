import { ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './Button.module.scss';

type IProps = {
  type: 'primary' | 'primary-outline' | 'secondary' | 'secondary-outline';
  htmlElement: 'button' | 'link';
  buttonType?: 'button' | 'submit' | 'reset';
  link?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: string;
  allowFullScreen?: 'full-width' | string;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
};

type IContentProps = {
  icon?: string;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
};

const Content = ({ icon, iconPosition, children }: IContentProps) => (
  <>
    {icon && iconPosition === 'left' && <i className={styles.icon}>{icon}</i>}
    <span>{children}</span>
    {icon && iconPosition === 'right' && <i className={styles.icon}>{icon}</i>}
  </>
);

const Button = ({
  type,
  htmlElement,
  buttonType = 'button',
  link,
  size = 'md',
  icon,
  allowFullScreen = '',
  iconPosition = 'left',
  children,
}: IProps) => {
  const classNames = `${styles.button} ${styles[type]} ${styles[size]} ${styles[allowFullScreen]}`;

  return (
    <>
      {htmlElement === 'button' && (
        <button type={buttonType} className={classNames}>
          <Content icon={icon} iconPosition={iconPosition}>
            {children}
          </Content>
        </button>
      )}

      {htmlElement === 'link' && link && (
        <Link to={`/${link}`} className={classNames}>
          <Content icon={icon} iconPosition={iconPosition}>
            {children}
          </Content>
        </Link>
      )}
    </>
  );
};

export default Button;
