import './MainPage.css';
import {Link,useNavigate} from 'react-router-dom';
import { useState,useEffect } from'react';
import { jwtDecode } from "jwt-decode";
const Catalog = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');//получаем данные из localStorage   
    console.log('Token:', token); // Вывод токена в консоль
    let role = '';//создаём переменную для хранения роли пользователя
    if (token) {//если извлекли токен
        const decodedToken = jwtDecode(token);//декодируем токен
        role = decodedToken.role;//получаем из токена роль пользователя
        
    }else if (!token) {
        navigate('/register', { replace: true }); //если токен не найден, перенаправляем на страницу регистрации
    }
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена при выходе
        window.location.reload(); // Перезагрузка страницы или перенаправление
    };
    const [cars, setCars] = useState([]);//состояние для хранения массива автомобилей
    const [loading,setLoading] = useState(true); //состояние для отображения загрузки
    useEffect(() => {
        const fetchCars = async ()=>{
            try {
                const response = await fetch('http://localhost:5000/api/car/getCar');
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();//получаем данные с сервера
                setCars(data);//устанавливаем данные в состояние
                setLoading(false); //скрываем загрузку
            } catch (error) {
                console.error('Ошибка при получении автомобилей:', error);
                setLoading(true); // Обработка загрузки в случае ошибки
            }
        }
        fetchCars(); //вызываем функцию при монтировании компонента
    },[]);

    return (
        <>
        <header>
            <div className="div_header">
                <Link to={'/'}><img src="/image/logo.png" alt="" className='logo'/></Link>
                <div className="div_center_header">
                {role==='admin'? <Link to='/bid'>Заявки</Link> : <Link to={'/booking'}>Мои заявки</Link>}  
                    
                    {role==='admin'? <Link to='/CarAdd'>Админ панель</Link> :''}
                <Link to={'/catalog'}>Забронировать</Link>
                {token? <p onClick={handleLogout} className='a'>Выйти</p> :<Link to={'/register'}>Вход</Link>   }
                
                </div>
                
                
            </div>
          </header>
          <div className="catalog">
   
        <p className="title_booking">Наши Автомобили</p>

  
<div className="div_all">
    {cars.map(car => (
        <div className="product_div" key={car._id}>
            
            <img src={`http://localhost:5000/${car.preview}`} alt={car.name} className="img_car" />
            <p className="tovar">{car.name}</p>
            <p className="tovar">{car.price}₽/сут</p>
            
               
                    <Link to={`/car/${car._id}`}><button className='button_reg2'>Забронировать</button></Link>
                
            
        </div>
    ))}
</div>
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

export default Catalog;
