import { useSelector } from 'react-redux';
import { diarySelectors } from '../../redux/diaryPerDay';
import { DiaryProductListItem } from '../DiaryProductListItem/DiaryProductListItem';
import css from './DiaryProductList.module.css';

const DiaryProductsList = () => {
  const productsList = useSelector(diarySelectors.getDiaryProducts);
  const isAnyProducts = productsList !== null && productsList.length > 0;

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
//test
export default DiaryProductsList;
