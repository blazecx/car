import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';
import toast from "react-hot-toast";
const ReservePage = () => {
    const {_id} = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const [date, setDate] = useState('');


    const token = localStorage.getItem('token');
    let role = '';

    if (token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role;
    }
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена при выходе
        window.location.reload();
        toast.success('Вы вышли из системы') // Перезагрузка страницы или перенаправление
    };
    useEffect(() => {
        if (!token) {
            return navigate('/register', { replace: true });
        }

        const fetchCarData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/car/${_id}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setCar(data);
                
            } catch (error) {
                console.error('Ошибка при получении автомобиля:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, [navigate, token, _id]);

    if (loading) {
        return <div className="Loading">Загрузка данных автомобиля...</div>;
    }

    if (!car) {
        return <div className="Loading">Не удалось загрузить информацию о автомобиле.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: jwtDecode(token).id,
            carId: _id,
            date,

        };

        try {
            const response = await fetch(`http://localhost:5000/api/booking/createBooking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            console.log(response);
            console.log('Заявка на резервирование отправлена');
            toast.success('Автомобиль забранирован');
            navigate('/'); // Перенаправляем на главную страницу
        } catch (error) {
            console.error('Ошибка при создании заявки:', error);
            toast.error('Данный автомобиль уже забронирован на эту дату');
        }
    };

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
          <div className="div_block_res">

          
            <div className="div_create_bid">
                <h1>Формирование заявки</h1>
            </div>
            <form className="form_bid" onSubmit={handleSubmit}>
                <img src={`http://localhost:5000/${car.preview}`} alt={car.name} className='img_car' />
                <div className="div_form_bid">
                    <h1 className="name_car_id">Марка: {car.name}</h1>
                    <h2 className="price_car_id">Цена: {car.price}₽/сут</h2>
                    <p>Дата бронирования:</p>
                    <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}  className="data" required />
                    <button type='submit' className="button_reg2">Бронирование</button>
                </div>
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

export default ReservePage;