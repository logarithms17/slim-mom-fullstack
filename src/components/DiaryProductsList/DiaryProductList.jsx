import { DiaryProductListItem } from '../DiaryProductListItem/DiaryProductListItem';
import css from './DiaryProductList.module.css';

const DiaryProductsList = ({ productsList = [] }) => {
  const isAnyProducts = productsList.length > 0;

  return !isAnyProducts ? (
    <p className={css.text}>The list in your diary is still empty.</p>
  ) : (
    <div className={css.boxProducts}>
      <ul className={css.productsList}>
        {[...productsList].reverse().map((product, i) => (
          <DiaryProductListItem key={i} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default DiaryProductsList;
