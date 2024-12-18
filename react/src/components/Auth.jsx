
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import './AuthPage.css'
const Register = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault(); //нужно чтобы страница не перезагружалась при отправке формы
  const payload = {
    email,
    password,
  }
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Устанавливаем заголовок
      },
      body: JSON.stringify(payload),
    });
    if(response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
            
      console.log(data);
      toast.success('Вы успешно зашли в систему!');
      navigate('/'); // переходим на главную страницу после успешной авторизации
    }else{
      console.error('Ошибка при отправке запроса:', response.statusText); // выводим ошибку в консоль для дебага
    }
     
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error); // выводим ошибку в консоль для дебага
  }
}
    return (
        <>
        <header>
            <div className="div_header">
                <Link to={'/'}><img src="/image/logo.png" alt="" className='logo'/></Link>
                <div className="div_center_header">

                </div>
                
                
            </div>
          </header>
          <div className="main_div_register">
              <h1>Авторизация</h1>
            <form onSubmit={handleSubmit} method="post" className='form_reg'>
            
            <input type="email" placeholder='Введите  email' className='input_reg' required value={email} // Подключаем состояние
              onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Введите пароль' className='input_reg' required value={password} // Подключаем состояние
              onChange={(e) => setPassword(e.target.value)}/>
            
            <Link to={'/register'}>Ещё нет аккаунта?</Link>
            <button className='button_reg' >Войти</button>
          </form>
          </div>
          <footer>
            <img src="/image/logo.png" alt="" className='logo'/>
            <div className="div_center_footer">
            <p>Информация на сайте носит справочный характер</p>
            <p>Политика конфиденциальности</p>
            </div>
            <div className="div_end_footer">
                <p>©2013-2024, OOO «Эх, Прокачу»<br />Все права защищены</p>
            </div>
          </footer>
        </>
    );
}

export default Register;
