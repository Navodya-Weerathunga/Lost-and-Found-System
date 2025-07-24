import { Link, useParams, useNavigate } from 'react-router-dom';
import ProfileIcon from '../Pictures/profileicon.png';
import './UserNavbar.css';

const UserNavbar = () => {
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const handleLogout = () =>{
        
        alert("Logged out successfully");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("isLogin");
        navigate(`/`)
        
    }
    
    return (
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="/AdminHome"><h3>Lost & Found System</h3></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/Home">HOME</a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="/ItemList">ITEMS</a>
                    </li>
                    
                    </ul>
            </div>

            <Link to={`/Profile/${userId}`}><img src={ProfileIcon} style={{width: '50px', height: '50px', marginRight: '5%'}}/></Link>
            
            <div className='endbtn'>
                <form class="form-inline my-2 my-lg-0">
                    <button class="logout" type="submit" onClick={handleLogout}>Logout</button>
                </form>
            </div>
                    
        </nav>
    
    )
}

export default UserNavbar;