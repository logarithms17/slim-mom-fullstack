import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import style from './RegistrationPage.module.css';

const Register = () => {
  return (
    <div className={style.container}>
      <RegistrationForm />
    </div>
  );
};

export default Register;
