import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import closeSVG from './img/close-1511-svgrepo-com.svg';

interface FormData {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    // Здесь можно добавить логику входа (API вызов)
    console.log('Submitted data:', data);
    // Например, после успешного входа перенаправить
    // navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    // Например, открыть модальное окно или перейти на страницу восстановления пароля
    alert('Функция восстановления пароля еще не реализована.');
  };

  const handleSignUp = () => {
    // Перенаправление на страницу регистрации
    navigate('/signup');
  };

  return (
    <div className="SignFormCont">
      <ToastContainer />
      <div className="SignFormWrapp">
        <form className="FormClass" onSubmit={handleSubmit(onSubmit)}>
          <div className="CloseButton" onClick={() => navigate('/')}>
            <img className="closeSVGicon" alt="Close" src={closeSVG} />
          </div>
          <div className="MessageWrapper">
            <h3 className="SignInTitle">Sign In</h3>
          </div>
          <div className="EmailInputSection">
            <div className="EmailFieldWrapper">
              <div className="EmailLabel">Email</div>
              <input
                className="EmailInput"
                placeholder="Your email"
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="ErrorText">{errors.email.message}</p>}
            </div>
            <div className="PasswordFieldWrapper">
              <div className="PasswordLabel">Password</div>
              <input
                className="PasswordInput"
                placeholder="Your password"
                type="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="ErrorText">{errors.password.message}</p>}
              <div className="ForgotPasswordLink" onClick={handleForgotPassword}>
                Forgot password?
              </div>
            </div>
          </div>
          <button className="SignInButton" type="submit">
            {/* Можно добавить индикатор загрузки или disable при пустых полях */}
            Sign in
          </button>
          <div className="SignUpSection">
            <span className="SignUpText">Don’t have an account?{' '}</span>
            <span className="SignUpLink" onClick={handleSignUp}>Sign Up</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;