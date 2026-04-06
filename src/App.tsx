import { useState, useMemo, useEffect } from 'react';
import { Phone, ShoppingCart } from 'lucide-react';
import logoImg from './assets/klavisha.jpg';
import keyboardImg from './assets/keyboard.png';
import { products, CATEGORIES, type Category } from './data/products';
import { ProductCard } from './components/ProductCard';
import { BubbleButton } from './components/BubbleButton';
import './App.css';

const CATEGORY_ICONS: Record<string, string> = {
  'Все':                    '⌨️',
  'Компактные клавиатуры':  '💻',
  'Клавиатуры':             '🖮',
  'Кастом':                 '🔩',
  'Кейкапы':                '🎨',
  'Свитчи':                 '🔘',
  'Аксессуары':             '🧰',
};

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


function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('Все');
  const [scrolled, setScrolled] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favOpen, setFavOpen] = useState(false);
  const [cart, setCart] = useState<number[]>([]);

  const toggleCart = (id: number) => {
    setCart(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      const matchCat = category === 'Все' || p.category === category;
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  const pluralize = (n: number) => n === 1 ? 'товар' : n >= 2 && n <= 4 ? 'товара' : 'товаров';

  return (
    <div className="layout">
      {/* SVG goo filter — используется bubble-кнопкой */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* ─── Header ─────────────────────────────────────────── */}
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <a href="/" className="logo">
          <img src={logoImg} alt="Klavisha" className="logo__img" />
          Klavisha<em>.uz</em>
        </a>

        <nav className="header-nav">
          <a href="#catalog" className="header-nav__link">Каталог</a>
          <button className="header-nav__link" onClick={showToast}>Кастомные сборки</button>
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

      {/* ─── Hero ────────────────────────────────────────────── */}г
      <section className="hero">
        <div className="hero__glow hero__glow--purple" aria-hidden="true" />
        <div className="hero__glow hero__glow--gold" aria-hidden="true" />
        <div className="hero__glow hero__glow--blue" aria-hidden="true" />

        <div className="hero__inner">
          <div className="hero__content">
            <span className="hero__tag">
              <span className="hero__tag-dot" />
              Клавиатуры · Ташкент
            </span>
            <h1 className="hero__title">
              звук. тактильность.<br />
              <span className="hero__title-accent">УНИКАЛЬНОСТЬ.</span>
            </h1>
            <p className="hero__subtitle">
              Все о клавиатурах от ведущих мировых производителей. <br />
              Кастомные сборки под ваш стиль.
            </p>
            <div className="hero__cta">
              <button
                className="btn-primary"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Смотреть каталог
              </button>

              <BubbleButton onClick={showToast}>Заказать кастомную сборку</BubbleButton>
            </div>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>200+</strong>
              <span>товаров</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>50+</strong>
              <span>брендов</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>Кастомные сборки</strong>
              <span>под заказ</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>Гарантия</strong>
              <span>1 год</span>
            </div>
          </div>
        </div>

        <div className="hero__keyboard" aria-hidden="true">
          <img src={keyboardImg} alt="" />
        </div>

      </section>

      {/* ─── Catalog ─────────────────────────────────────────── */}
      <main className="main" id="catalog">
        <div className="catalog-header">
          <h2 className="catalog-title">Каталог</h2>
          <nav className="categories" aria-label="Категории">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-btn${category === cat ? ' category-btn--active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                <span className="category-btn__icon">{CATEGORY_ICONS[cat]}</span>
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {filtered.length > 0 ? (
          <>
            <div className="results-bar">
              <span className="results-count">
                Найдено: <strong>{filtered.length}</strong> {pluralize(filtered.length)}
              </span>
              <div className="results-actions">
                <button className="sort-btn">По умолчанию ↕</button>
              </div>
            </div>
            <div className="products-grid">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  inCart={cart.includes(product.id)}
                  onToggleCart={() => toggleCart(product.id)}
                  onCardClick={showToast}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">🔍</div>
            <p className="empty-state__text">Ничего не найдено</p>
            <p className="empty-state__hint">Попробуйте изменить запрос или выбрать другую категорию</p>
            <button className="btn-primary" onClick={() => { setQuery(''); setCategory('Все'); }}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </main>

      {/* ─── Features ────────────────────────────────────────── */}
      <section className="features">
        <div className="feature">
          <span className="feature__icon">🔩</span>
          <strong>Кастом под заказ</strong>
          <p>Сборка кастомных клавиатур под ваш стиль</p>
        </div>
        <div className="feature">
          <span className="feature__icon">🌍</span>
          <strong>Мировые бренды</strong>
          <p>AJAZZ, AULA</p>
        </div>
        <div className="feature">
          <span className="feature__icon">🚚</span>
          <strong>Доставка по Узбекистану</strong>
          <p>Бесплатно от 500 000 сум</p>
        </div>
        <div className="feature">
          <span className="feature__icon">💬</span>
          <strong>Экспертная консультация</strong>
          <p>Поможем собрать идеальный билд</p>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <a href="/" className="logo footer__logo">Klavisha<em>.uz</em></a>
            <p>Элитные механические клавиатуры<br />и кастом-сборки в Ташкенте</p>
            <div className="footer__socials">
              <a href="#" className="footer__social">TG</a>
              <a href="#" className="footer__social">IG</a>
              <a href="#" className="footer__social">YT</a>
            </div>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Каталог</p>
            <span>Клавиатуры</span>
            <span>Кастом сборки</span>
            <span>Кейкапы</span>
            <span>Свитчи</span>
            <span>Аксессуары</span>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Покупателям</p>
            <span>Доставка и оплата</span>
            <span>Гарантия</span>
            <span>Возврат</span>
            <span>Заказ кастома</span>
            <span>О компании</span>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Контакты</p>
            <a href="tel:+998000000000">+998 00 000-00-00</a>
            <a href="mailto:info@klavisha.uz">info@klavisha.uz</a>
            <p>Ташкент, ул. ----------, ---</p>
            <p>Пн–Сб, 10:00–20:00</p>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Klavisha.uz — Все права защищены</p>
          <div className="footer__bottom-links">
            <span>Конфиденциальность</span>
            <span>Оферта</span>
          </div>
        </div>
      </footer>

      {/* ─── Toast ───────────────────────────────────────────── */}
      <div className={`toast${toast ? ' toast--visible' : ''}`}>
        🚧 Это только макет — функционал в разработке
      </div>

      {/* ─── Favorites drawer ────────────────────────────────── */}
      {favOpen && <div className="fav-overlay" onClick={() => setFavOpen(false)} />}
      <aside className={`fav-drawer${favOpen ? ' fav-drawer--open' : ''}`}>
        <div className="fav-drawer__header">
          <h2 className="fav-drawer__title">Избранное</h2>
          <button className="fav-drawer__close" onClick={() => setFavOpen(false)} aria-label="Закрыть">
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="fav-drawer__empty">
            <HeartIcon />
            <p>Пока ничего нет</p>
            <span>Нажмите ♥ на товаре, чтобы сохранить</span>
          </div>
        ) : (
          <ul className="fav-drawer__list">
            {favoriteProducts.map(p => (
              <li key={p.id} className="fav-item">
                <div className="fav-item__img">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="fav-item__info">
                  <p className="fav-item__name">{p.name}</p>
                  <p className="fav-item__price">{p.price.toLocaleString('ru-RU')} сум</p>
                </div>
                <button
                  className="fav-item__remove"
                  onClick={() => toggleFavorite(p.id)}
                  aria-label="Удалить из избранного"
                >
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}

export default App;
