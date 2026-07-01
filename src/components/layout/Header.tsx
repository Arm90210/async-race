import Nav from './Nav';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Async Race</h1>
      <Nav />
    </header>
  );
}

export default Header;
