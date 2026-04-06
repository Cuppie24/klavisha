export function AppFooter() {
  return (
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
  );
}
