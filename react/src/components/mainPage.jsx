import { Link } from 'react-router-dom';
import './MainPage.css';


import { jwtDecode } from "jwt-decode";
const MainPage = () => {
 const token = localStorage.getItem('token');//получаем данные из localStorage   
    console.log('Token:', token); // Вывод токена в консоль
    let role = '';//создаём переменную для хранения роли пользователя
    if (token) {//если извлекли токен
        const decodedToken = jwtDecode(token);//декодируем токен
        role = decodedToken.role;//получаем из токена роль пользователя
    }
   
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаление токена при выходе
        window.location.reload(); // Перезагрузка страницы или перенаправление
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
          <div className="block_one">
          <h3>EH, I'LL<br/>PUMP <br/>IT UP</h3>
            <img src="https://cdn.dribbble.com/users/32512/screenshots/4403244/automotive_by_gleb.gif" alt="GIF"className='car_gif'/>
          </div>
          <div className="block_two">
            <h1>Машины нового поколения</h1>
            <div className="div_three">
                <div className="div_one">
                    <img src="/image/one_img_main.png" alt="" className='img_main'/>
                    <h2>Комфорт</h2>
                    <p>Все автомобили оснащены <br /> современными удобствами для <br /> удобной поездки.</p>
                </div>
                <div className="div_one">
                    <img src="/image/one_img_main.png" alt="" className='img_main'/>
                    <h2>Безопасность</h2>
                    <p>Все автомобили застрахованы и <br /> проходят регулярный техосмотр<br />для вашей безопасности. </p>
                </div>
                <div className="div_one">
                    <img src="/image/one_img_main.png" alt="" className='img_main'/>
                    <h2>Разнообразие</h2>
                    <p>Автомобили на любой вкус - от<br /> компактных городских машин до<br /> расскошных внедорожников. </p>
                </div>
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

export default MainPage;
