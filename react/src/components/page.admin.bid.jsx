import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './MainPage.css';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
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
        window.location.reload(); // Перезагрузка страницы или перенаправление
    };
    useEffect(() => {
        if (!token || role !== 'admin') {
            return navigate('/register', { replace: true });
        }

        const fetchBookings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/booking/admin`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const bookingsData = await response.json();
                setBookings(bookingsData);
            } catch (error) {
                console.error('Ошибка при получении заявок:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate, token, role]);

    const handleAccept = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/booking/admin/accept/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                setBookings(bookings.map(b => (b._id === id ? { ...b, status: 'Принято' } : b)));
            }
        } catch (error) {
            console.error('Ошибка при принятии заявки:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/booking/admin/reject/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                setBookings(bookings.map(b => (b._id === id ? { ...b, status: 'Отклонено' } : b)));
            }
        } catch (error) {
            console.error('Ошибка при отклонении заявки:', error);
        }
    };

    if (loading) {
        return <div className="Loading">Загрузка данных заявок...</div>;
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

          <div className="bookings1">
    <div className="div_top_booking">
        <p className="title_booking">Обработка заявок</p>
    </div>

    <table className="booking_table">
        <thead>
            <tr>
                <th>Автомобиль</th>
                <th>Статус</th>
                <th>Дата бронирования</th>
                <th>ФИО</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            {bookings.map(booking => (
                <tr key={booking._id} className="booking_row">
                    <td>
                        
                        {booking.carId.name}
                    </td>
                    <td className="stat">{booking.status}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.userId ? booking.userId.name : 'Неизвестен'}</td>
                    <td>
                        <div className="div_but">
                            <button onClick={() => handleAccept(booking._id)} className="button_reg1">Принять</button>
                        <button onClick={() => handleReject(booking._id)} className="button_reg1">Отклонить</button>
                        </div>
                        
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

   
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

export default AdminBookings;