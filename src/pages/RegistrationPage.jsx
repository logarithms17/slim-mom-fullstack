import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import style from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={style.container}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
