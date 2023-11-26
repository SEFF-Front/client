import { Link } from 'react-router-dom';
import './AdminSideBar.css'
function AdminSideBar(){

    return(
      
        <div className="users-sec " style={{transform:'translateY(50px)'}}>
        <div className='parent-users '> 
          <h5  ><Link to="/adminPanel/users">Users</Link></h5>

            {/*  */}
          <div className="lg-ul ">
            <ul>
            <li><Link to="#">Admins</Link></li>
            <li><Link to="#">Editors</Link></li>
            <li><Link to="#">Editors</Link></li>
            <li><Link to="#">Students</Link></li>
          </ul>
          </div>
          <div className='drop container'>
          <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className='dropdown-menu'>
            <li ><Link className='dropdown-item' to="#">Admins</Link></li>
            <li><Link className='dropdown-item' to="#">Editors</Link></li>
            <li><Link className='dropdown-item' to="#">Editors</Link></li>
            <li><Link className='dropdown-item' to="#">Students</Link></li>
          </ul>
</div>
          </div>
 
          
        
        </div>
        <div className='parent-users'>
          <h5><Link to="/adminPanel/articles">Articles</Link></h5>
            
          <div className="lg-ul">
            <ul>
            <li><Link to="">Published Articles</Link></li>
            <li><Link to="">Scheduled Articles</Link></li>
            <li><Link to="">Saved Drafts</Link></li>
          </ul>
          </div>
        </div>

        <div className='parent-users'>
          <h5><Link to="/adminPanel/Jops">Jops</Link></h5>
        
          <div className="lg-ul">
            <ul>
            <li><Link to="">Published Jops</Link></li>
            <li><Link to="">Saved Drafts</Link></li>
          </ul>
          </div>
        </div>

        <div className='parent-users'>
          <h5><Link to="/adminPanel/courses">Courses</Link></h5>
            
          <div className="lg-ul">
             <ul>
            <li><Link to="">Published Courses</Link></li>
            <li><Link to="">Scheduled Courses</Link></li>
            <li><Link to="">Saved Drafts</Link></li>
          </ul>
          </div>
        </div>
        

      </div>
    )
}
export default AdminSideBar;