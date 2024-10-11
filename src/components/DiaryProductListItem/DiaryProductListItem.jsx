import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { diarySelectors } from '../../redux/diaryPerDay';
import css from './DiaryProductListItem.module.css';

export const DiaryProductListItem = ({ product }) => {
  const dispatch = useDispatch();

  const { weightGrm, _id } = product;
  const date = useSelector(diarySelectors.getCurrentDate);
  const currentDate = new Date().toLocaleDateString();
  const isCurrentDay = date === currentDate;
  const isLoadingDeletedProd = useSelector(
    diarySelectors.getIsDeleteProductLoading
  );

  const payload = {
    productId: _id,
    date: date,
  };

  const handleDelete = () => {
    document.body.style.overflow = 'hidden';
  };

  return (
    <li className={css.listItem}>
      <div className={css.info}>
        <div>{product.product.title}</div>
        <div>{weightGrm} Grams</div>
        <div>{product.product.calories}Kcal</div>
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
