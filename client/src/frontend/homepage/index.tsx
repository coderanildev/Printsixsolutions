import HomeBanner from "./HomeBanner";
import SupportSection from "./SupportSection";
import ShopByCategory from "./ShopByCategory";
import { useGetAllCategoriesQuery } from "../../redux/services/categories";
import {useGetAllProductNewArrivalQuery } from "../../redux/services/products"
import NewArrivalProduct from "./NewArrivalProduct";

const HomePage = () => {
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery();
  const categories = categoriesData?.categories || [];
  
  // Fetch new arrival products
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetAllProductNewArrivalQuery();
  const products = productsData?.products || [];

  return (
    <main>
      <HomeBanner />
      <SupportSection />
      <ShopByCategory categories={categories} />
      <NewArrivalProduct products={products} />
    </main>
  );
};

export default HomePage;
