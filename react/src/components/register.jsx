import {Link,useNavigate} from 'react-router-dom';
import  {useState} from 'react';
import './MainPage.css';
import toast from 'react-hot-toast';
function Auth() {
  const [number_phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [seria, setSeria] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();//нужно чтобы страница не перезагружалась при отправке формы
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      return alert("Пароль должен содержать минимум одну цифру.");
      
  }
    const payload = {
      number_phone,
      password,
      email,
      number,
      seria,
      name,
    }

    console.log('Данные, отправляемые на сервер:', {
      number_phone,
      password,
      email,
      number,
      seria,
      name,
  });

    try{
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Устанавливаем заголовок
      },
      body: JSON.stringify(payload),
      });
      if(response.ok){
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        console.log(data);

        toast.success('Вы успешно зарегистрированы!');
        navigate('/');
      }else{
        console.error('Ошибка при отправке запроса:', response.statusText);
        toast.error('Ошибка входа. Проверьте свои учетные данные.');
      }
    }catch(error){
      console.error('Ошибка при обработке запроса:', error);
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
              <h1>Регистрация</h1>
            <form onSubmit={handleSubmit} method="post" className='form_reg'>
            <input type="text" placeholder='Введите  ФИО' className='input_reg' required value={name} // Подключаем состояние
              onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder='Введите номер телефона' className='input_reg' required  value={number_phone} // Подключаем состояние
              onChange={(e) => setPhone(e.target.value)}/>
            <input type="email" placeholder='Введите  email' className='input_reg' required value={email} // Подключаем состояние
              onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Придумайте пароль' className='input_reg' required value={password} // Подключаем состояние
              onChange={(e) => setPassword(e.target.value)}/>
            <input type="text" placeholder='Введите серию' className='input_reg' required value={seria} // Подключаем состояние
              onChange={(e) => setSeria(e.target.value)} />
            <input type="text" placeholder='Введите номер' className='input_reg' required value={number} // Подключаем состояние
              onChange={(e) => setNumber(e.target.value)}/>
            <Link to={'/auth'}>Уже есть аккаунт?</Link>
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
  
  export default Auth;
  