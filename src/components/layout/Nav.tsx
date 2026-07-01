import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Garage
      </NavLink>
      <NavLink
        to="/winners"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Winners
      </NavLink>
    </nav>
  );
}

export default Nav;
