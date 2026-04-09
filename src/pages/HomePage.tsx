import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BubbleButton } from '../components/BubbleButton';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';

export function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="layout">
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <AppHeader scrolled={scrolled} query="" setQuery={() => navigate('/catalog')} cart={[]} showToast={showToast} />

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="hero hero--centered">
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
            <p className="hero__subtitle" style={{ textAlign: 'center' }}>
              Все о клавиатурах от ведущих мировых производителей. <br />
              Кастомные сборки под ваш стиль.
            </p>
            <div className="hero__cta">
              <button className="btn-primary" onClick={() => navigate('/catalog')}>
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
      </section>

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

      <AppFooter />

      {/* ─── Toast ───────────────────────────────────────────── */}
      <div className={`toast${toast ? ' toast--visible' : ''}`}>
        🚧 Это только макет — функционал в разработке
      </div>
    </div>
  );
}
