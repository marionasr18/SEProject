// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import NavigationBar from './NavigationBar';
function Profile() {
  const nav = useNavigate();

      const handleLogout = () => {
        localStorage.removeItem('auth')
        sessionStorage.removeItem('item_key');

        nav("/", { replace: true })
    }
  return (<>
   <NavigationBar/>
  </> );
}

export default Profile;