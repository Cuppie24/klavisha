import { Phone, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/klavisha.jpg';

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="15" height="15" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="19" height="19" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface AppHeaderProps {
  scrolled: boolean;
  query: string;
  setQuery: (q: string) => void;
  cart: number[];
  showToast: () => void;
}

export function AppHeader({ scrolled, query, setQuery, cart, showToast }: AppHeaderProps) {
  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <Link to="/custom" className="logo">
        <img src={logoImg} alt="Klavisha" className="logo__img" />
        Klavisha<em>.uz</em>
      </Link>

      <nav className="header-nav">
        <a href="#catalog" className="header-nav__link">Каталог</a>
        <Link to="/custom" className="header-nav__link">Кастомные сборки</Link>
      </nav>

      <div className="search-wrap">
        <span className="search-icon"><SearchIcon /></span>
        <input
          className="search-input"
          type="search"
          placeholder="Поиск по каталогу..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="header-actions">
        <a href="tel:+998000000000" className="header-phone">
          <Phone size={14} strokeWidth={1.8} />
          <span>+998 00 000-00-00</span>
        </a>
        <button className="header-icon-btn" aria-label="Избранное" onClick={showToast}>
          <HeartIcon />
        </button>
        <button className="header-cart-btn" aria-label="Корзина" onClick={showToast}>
          <ShoppingCart size={18} strokeWidth={1.8} />
          <span>Корзина</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </div>
    </header>
  );
}
