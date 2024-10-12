import { GrClose } from 'react-icons/gr';
import css from './DiaryProductListItem.module.css';

export const DiaryProductListItem = ({
  product, // This is the entire product object now
  date,
  currentDate = new Date().toLocaleDateString(),
  isLoadingDeletedProd,
  onDelete,
}) => {
  // Directly extract the properties from the product object
  const { product: title, quantity, calories, _id } = product;
  const isCurrentDay = date.toLocaleDateString() === currentDate;

  const handleDelete = () => {
    document.body.style.overflow = 'hidden';
    onDelete && onDelete(_id);
  };

  return (
    <li className={css.listItem}>
      <div className={css.info}>
        <div>{title}</div> {/* Product name is now displayed directly */}
        <div>{quantity} Grams</div>
        <div>{calories} Kcal</div>
      </div>

      {isCurrentDay && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={isLoadingDeletedProd}
        >
          <GrClose />
        </button>
      )}
    </li>
  );
};
