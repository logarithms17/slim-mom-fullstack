import { useEffect, useState, useCallback } from 'react';
import { DiaryProductListItem } from '../DiaryProductListItem/DiaryProductListItem';
import css from './DiaryProductList.module.css';

const DiaryProductsList = ({ selectedDate }) => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDeletedProd, setIsLoadingDeletedProd] = useState(false);

  const formatDateForAPI = date => {
    return date.toISOString().split('T')[0];
  };

  const fetchProducts = useCallback(async date => {
    const formattedDate = formatDateForAPI(date);
    const token = localStorage.getItem('token');

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
  }, []); // No dependencies because nothing inside fetchProducts changes

  useEffect(() => {
    if (selectedDate) {
      fetchProducts(selectedDate);
    }
  }, [selectedDate, fetchProducts]);

  // Function to handle delete request
  const handleDelete = async productId => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No auth token found');
      return;
    }

    setIsLoadingDeletedProd(true);
    try {
      const response = await fetch(
        `https://slim-mom-fullstack.onrender.com/api/products/deleteConsumedProduct/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to delete product, status: ${response.status}, message: ${errorData.message}`
        );
      }

      // Update the state to remove the deleted product
      setProductsList(prevProducts =>
        prevProducts.filter(p => p._id !== productId)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsLoadingDeletedProd(false);
      document.body.style.overflow = 'unset'; // Allow scrolling again
    }
  };

  const isAnyProducts = productsList.length > 0;

  return isLoading ? (
    <p className={css.text}>Loading...</p>
  ) : !isAnyProducts ? (
    <p className={css.text}>The list in your diary is still empty.</p>
  ) : (
    <div className={css.boxProducts}>
      <ul className={css.productsList}>
        {[...productsList].reverse().map((product, i) => (
          <DiaryProductListItem
            key={i}
            product={product}
            date={selectedDate}
            onDelete={handleDelete} // Pass handleDelete function to the item
            isLoadingDeletedProd={isLoadingDeletedProd}
          />
        ))}
      </ul>
    </div>
  );
};

export default DiaryProductsList;
