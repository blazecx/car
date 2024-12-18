import { useState,useEffect } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './AuthPage.css'
const CarAdd = () => {
  const navigate = useNavigate();
  
   
    const [name,setName] = useState('');
    const [price, setPrice] = useState('');
    const [preview, setPreview] = useState(null);
     const token = localStorage.getItem('token');
     useEffect(() => {//крутой хук он нужен для получения текущего токена и проверки роли пользователя
      // Проверка наличия токена и его роли
      if (!token) {
          return navigate('/register', { replace: true });//проверяем есть ли вообще токен
      }

      try {
          const decodedToken = jwtDecode(token);//деодируем токен
          const role = decodedToken.role;//получаем роль из токена

          if (role !== 'admin') {//проеверяем роль токена
              return navigate('/', { replace: true }); // Редирект на страницу входа
          }
      } catch (error) {
          console.error('Ошибка декодирования токена:', error);
          navigate('/register', { replace: true }); // Редирект в случае ошибки декодирования
      }
  }, [navigate, token]);//Массив зависимостей, чтобы он запускался при изменении navigate или token
    const handleSubmit = async (e) => {
        e.preventDefault(); //нужно чтобы страница не перезагружалась при отправке формы
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('preview', preview);
        console.log('Данные, отправляемые на сервер:', {
            price,
            name,
            preview
        });
        try {
            const response = await fetch('http://localhost:5000/api/car/addCars', {
                method: 'POST',
                body:formData
            });
            if (response.ok) {
                const data = await response.json();
            console.log(data);
            }else{
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            
        } catch (error) {
            console.error('Error:', error);
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
              <h1>Добавить авто</h1>
            <form onSubmit={handleSubmit} method="post" className='form_reg'>
            
            <input type="text" placeholder='Бренд' className='input_reg' required value={name} // Подключаем состояние
              onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='Цена' className='input_reg' required value={price} // Подключаем состояние
              onChange={(e) => setPrice(e.target.value)}/>
            <input
            type="file"
             onChange={(e)=> setPreview(e.target.files[0])}
            className='photo_input'
            required
          />
           
            <button className='button_reg' >Создать</button>
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

export default CarAdd;
