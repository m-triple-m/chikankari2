'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const BrowseContext = createContext();

export const BrowseProvider = ({ children }) => {

    const [selPriceRange, setSelPriceRange] = useState([100, 10000]);

    const [masterList, setMasterList] = useState([]);
    const [productList, setProductList] = useState([]);

    const filterByPrice = (priceRange) => {
        return masterList.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
    }

    const filterByColor = (color) => {
        return masterList.filter(product => product.color.toLowerCase() === color.toLowerCase());
    }

    const filterBySize = (selSizes) => {
        return masterList.filter(product => product.size.some(size => selSizes.includes(size)));
    }

    const stringSlicer = (str, limit) => {
        if (str.length > limit) {
            return str.slice(0, limit) + '...';
        }
        return str;
    }

    const fetchProduct = (category) => {
      if (window !== undefined) {
        //   setLoading(true);
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/getbygender/${category}`)
            .then((result) => result.json())
            .then(data => {
              console.log(data);
              setProductList(data);
              setMasterList(data);
            //   setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
    
        }
    }

    const fetchAllProducts = () => {
        if (window !== undefined) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`)
                .then((result) => result.json())
                .then(data => {
                    console.log(data);
                    setProductList(data);
                    setMasterList(data);
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }

    const fetchWomenProducts = () => fetchProduct('women');
    const fetchMenProducts = () => fetchProduct('men');
    const fetchKidProducts = () => fetchProduct('kid');


      useEffect(() => {
        if (masterList.length > 0) {
          setProductList(filterByPrice(selPriceRange));
        }
      }, [selPriceRange])
      

    return (
        <BrowseContext.Provider value={{ 
            selPriceRange, 
            setSelPriceRange, 
            filterByPrice, 
            filterByColor,
            filterBySize,
            fetchWomenProducts, 
            fetchMenProducts,
            fetchKidProducts,
            fetchAllProducts,
            productList, 
            setProductList,
            masterList,
            stringSlicer
         }}>
            {children}
        </BrowseContext.Provider>
    )

}

const useBrowseContext = () => useContext(BrowseContext);

export default useBrowseContext;