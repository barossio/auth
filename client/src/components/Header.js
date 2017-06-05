import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
             <Link className="navbar-brand" to="/">Redux Auth</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
