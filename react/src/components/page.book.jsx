import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';

const PageBook = () => {
    const [bookings, setBookings] = useState([]); // состояние для хранения массива заявок
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    let role = '';

    if (token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role;
    }

    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена при выходе
        window.location.reload(); // Перезагрузка страницы
    };

    useEffect(() => {
        if (!token) {
            return navigate('/register', { replace: true });
        }

        const { id: userId } = jwtDecode(token); // Получаем userId из токена

        const fetchUserBookings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/booking/user/${userId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const bookingsData = await response.json();
                setBookings(bookingsData);
            } catch (error) {
                console.error('Ошибка при получении заявок:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, [navigate, token]);

    if (loading) {
        return <div className="Loading">Загрузка данных бронирования...</div>;
    }

    if (!bookings.length) {
        return <div className="Loading">Нет заявок на бронирование.</div>;
    }

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

            <div className="bookings">
                <div className="div_top_booking">
                    <p className="title_booking">Ваши заявки:</p>
                    
                </div>
                
                <table className="booking_table">
        <thead>
            <tr>
                <th>Автомобиль</th>
                <th>Статус</th>
                <th>Дата бронирования</th>
                <th>ФИО</th>
            </tr>
        </thead>
        <tbody>
            {bookings.map(booking => (
                <tr key={booking._id}>
                    <td>
                        
                        {booking.carId ? booking.carId.name : 'Не указано'}
                    </td>
                    <td>{booking.status}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.userId ? booking.userId.name : 'Не указано'}</td>
                </tr>
            ))}
        </tbody>
    </table>
                 
            </div>
            <div className="div_bottom_hr_booking">
                <h2 className="p_bottom_prodol">Хотите создать новую заявку?</h2>
                <Link to={'/catalog'}> <button className='button_reg2'>Забронировать</button></Link>
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
};

export default PageBook;
