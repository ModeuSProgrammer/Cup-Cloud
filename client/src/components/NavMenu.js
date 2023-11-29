import React from "react";
import { Link } from 'react-router-dom';

class NavMenu extends React.Component {
  render() {
    const { links } = this.props;
    if (!links || links.length === 0) {
      return null;
    }
    return (
      <div className="menu">
        <nav className="nav">
          <ul className="nav-list">
            {links.map((link) => (
              <li key={link.id} className="nav-item">
                {link.internal ? (
                  <Link to={link.url}>{link.text}</Link>
                ) : (
                  <a href={link.url} onClick={link.onClick}>{link.text}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavMenu;
