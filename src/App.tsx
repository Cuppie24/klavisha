import { useState, useMemo, useEffect } from 'react';
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

function CartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={size} height={size} aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="14" height="14" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.06-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('Все');
  const [scrolled, setScrolled] = useState(false);

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
          Klavisha<em>.uz</em>
        </a>

        <nav className="header-nav">
          <a href="#catalog" className="header-nav__link">Каталог</a>
          <a href="#" className="header-nav__link">Кастом сборки</a>
          <a href="#" className="header-nav__link">О нас</a>
          <a href="#" className="header-nav__link">Доставка</a>
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
          <a href="tel:+998712345678" className="header-phone">
            <PhoneIcon />
            <span>+998 71 234-56-78</span>
          </a>
          <button className="header-icon-btn" aria-label="Избранное">
            <HeartIcon />
          </button>
          <button className="header-cart-btn" aria-label="Корзина">
            <CartIcon size={18} />
            <span>Корзина</span>
            <span className="cart-badge">0</span>
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
              Элитный магазин механических клавиатур · Ташкент
            </span>
            <h1 className="hero__title">
              Механика<br />
              <span className="hero__title-accent">нового уровня</span>
            </h1>
            <p className="hero__subtitle">
              Клавиатуры, кейкапы и свитчи от ведущих мировых производителей. <br />
              Кастомные сборки под ваш стиль.
            </p>
            <div className="hero__cta">
              <button
                className="btn-primary"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Смотреть каталог
              </button>

              <BubbleButton>Заказать кастом</BubbleButton>
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
              <strong>Кастом</strong>
              <span>под заказ</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>Гарантия</strong>
              <span>1 год</span>
            </div>
          </div>
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
                <ProductCard key={product.id} product={product} />
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
          <p>Сборка и смазка свитчей, монтаж кейкапов</p>
        </div>
        <div className="feature">
          <span className="feature__icon">🌍</span>
          <strong>Мировые бренды</strong>
          <p>Keychron, GMK, KBDFans, Gateron, Boba</p>
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
            <a href="#">Клавиатуры</a>
            <a href="#">Кастом сборки</a>
            <a href="#">Кейкапы</a>
            <a href="#">Свитчи</a>
            <a href="#">Аксессуары</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Покупателям</p>
            <a href="#">Доставка и оплата</a>
            <a href="#">Гарантия</a>
            <a href="#">Возврат</a>
            <a href="#">Заказ кастома</a>
            <a href="#">О компании</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Контакты</p>
            <a href="tel:+998712345678">+998 71 234-56-78</a>
            <a href="mailto:info@keycraft.uz">info@keycraft.uz</a>
            <p>Ташкент, ул. Амира Темура, 7</p>
            <p>Пн–Сб, 10:00–20:00</p>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2025 KeyCraft.uz — Все права защищены</p>
          <div className="footer__bottom-links">
            <a href="#">Конфиденциальность</a>
            <a href="#">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
