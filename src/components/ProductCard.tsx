import { Flame } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' сум';
}

function discountPercent(price: number, original: number): number {
  return Math.round((1 - price / original) * 100);
}



function CartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="15" height="15" aria-hidden="true">
      <path d="M1 1h3l2 9h9l2-7H5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="17" r="1.2" fill="currentColor" />
      <circle cx="15" cy="17" r="1.2" fill="currentColor" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="17" height="17" aria-hidden="true">
      <path d="M10 17s-7-4.35-7-9a4 4 0 018 0 4 4 0 018 0c0 4.65-7 9-7 9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, description, price, originalPrice, gradient, rating, reviews, inStock, tag } = product;
  const discount = originalPrice ? discountPercent(price, originalPrice) : null;

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <div className="product-card__gradient" style={{ background: gradient }} />

        {tag === 'hot' && (
          <span className="product-card__badge-hot">
            <Flame size={13} strokeWidth={2.5} />
            Хит
          </span>
        )}

        {!inStock && (
          <div className="product-card__sold-out">Нет в наличии</div>
        )}

        <button className="product-card__wish" aria-label="В избранное">
          <HeartIcon />
        </button>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__description">{description}</p>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <div className="product-card__price-row">
              <span className="product-card__price">{formatPrice(price)}</span>
              {discount && (
                <span className="product-card__discount">−{discount}%</span>
              )}
            </div>
            {originalPrice && (
              <span className="product-card__original">{formatPrice(originalPrice)}</span>
            )}
          </div>
          <button
            className="product-card__cart-btn"
            aria-label="В корзину"
            disabled={!inStock}
          >
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
