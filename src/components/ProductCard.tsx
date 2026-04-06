import { Flame, ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  inCart: boolean;
  onToggleCart: () => void;
  onCardClick: () => void;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' сум';
}

function discountPercent(price: number, original: number): number {
  return Math.round((1 - price / original) * 100);
}




export function ProductCard({ product, isFavorite, onToggleFavorite, inCart, onToggleCart, onCardClick }: ProductCardProps) {
  const { name, description, price, originalPrice, image, inStock, tag } = product;
  const discount = originalPrice ? discountPercent(price, originalPrice) : null;

  return (
    <article className="product-card" onClick={onCardClick} style={{ cursor: 'pointer' }}>
      <div className="product-card__image-wrap">
        <img className="product-card__img" src={image} alt={name} />

        {tag === 'hot' && (
          <span className="product-card__badge-hot">
            <Flame size={13} strokeWidth={2.5} />
            Хит
          </span>
        )}

        {!inStock && (
          <div className="product-card__sold-out">Нет в наличии</div>
        )}

        <button
          className={`product-card__wish${isFavorite ? ' product-card__wish--active' : ''}`}
          aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
        >
          <Heart size={16} strokeWidth={1.8} fill={isFavorite ? 'currentColor' : 'none'} />
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
            className={`product-card__cart-btn${inCart ? ' product-card__cart-btn--active' : ''}`}
            aria-label={inCart ? 'Убрать из корзины' : 'В корзину'}
            disabled={!inStock}
            onClick={(e) => { e.stopPropagation(); onToggleCart(); }}
          >
            <ShoppingCart size={15} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}
