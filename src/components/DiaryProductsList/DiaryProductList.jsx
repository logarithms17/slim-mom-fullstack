import { useEffect, useState } from 'react';
import { DiaryProductListItem } from '../DiaryProductListItem/DiaryProductListItem';
import css from './DiaryProductList.module.css';

const DiaryProductsList = ({ selectedDate }) => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatDateForAPI = date => {
    return date.toISOString().split('T')[0];
  };

  const fetchProducts = async date => {
    const formattedDate = formatDateForAPI(date);
    const token = localStorage.getItem('token');

    console.log('Authorization token being sent:', token);

    if (!token) {
      console.error('No auth token found');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://slim-mom-fullstack.onrender.com/api/products/getConsumedProduct/${formattedDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch products, status: ${response.status}, message: ${errorData.message}`
        );
      }

      const data = await response.json();
      setProductsList(data.dailyConsumedProducts || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchProducts(selectedDate);
    }
  }, [selectedDate]);

  const isAnyProducts = productsList.length > 0;

  return isLoading ? (
    <p className={css.text}>Loading...</p>
  ) : !isAnyProducts ? (
    <p className={css.text}>The list in your diary is still empty.</p>
  ) : (
    <div className={css.boxProducts}>
      <ul className={css.productsList}>
        {[...productsList].reverse().map((product, i) => (
          <DiaryProductListItem key={i} product={product} date={selectedDate} />
        ))}
      </ul>
    </div>
  );
};

export default DiaryProductsList;
