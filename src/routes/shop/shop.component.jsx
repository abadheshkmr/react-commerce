import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { Route, Routes } from 'react-router'; 

import './shop.styles.scss';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../../components/category/category.component';


const Shop = () => {
  
  const {categoriesMap} = useContext(CategoriesContext);
  console.log(categoriesMap); 
  return (
   <Routes>
    <Route index element={<CategoriesPreview />}/>
    <Route path=':category' element={<Category />} />
   </Routes>
  );
};

export default Shop;