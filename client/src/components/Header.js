import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Header extends Component {
  renderSignin(){
    if(this.props.authenticated){
      //show sign out
      return [
        <li key={1}><Link to="/feature">Feature</Link></li>,
        <li key={2}><Link to="/signout">Sign Out</Link></li>
      ]
    }else{
      return [
        <li key={1}><Link to="/signin">Sign In</Link></li>,
        <li key={2}><Link to="/signup">Sign Up</Link></li>

      ]
    }

  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <div className="navbar-header">
             <Link className="navbar-brand" to="/">Redux Auth</Link>
          </div>
          <ul className="nav navbar-nav">
            {this.renderSignin()}
              </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){
  return {
    authenticated : state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header);
