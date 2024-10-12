import { GrClose } from 'react-icons/gr';
import css from './DiaryProductListItem.module.css';

export const DiaryProductListItem = ({
  product,
  date,
  currentDate = new Date().toLocaleDateString(),
  isLoadingDeletedProd,
  onDelete,
}) => {
  const { weightGrm, _id } = product;
  const isCurrentDay = date === currentDate;

  const handleDelete = () => {
    document.body.style.overflow = 'hidden';
    onDelete && onDelete(_id);
  };

  return (
    <li className={css.listItem}>
      <div className={css.info}>
        <div>{product.product.title}</div>
        <div>{weightGrm} Grams</div>
        <div>{product.product.calories} Kcal</div>
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
