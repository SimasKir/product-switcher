import { createContext, useState } from "react"
import getData from "../utils/getData";

export const DataContext = createContext({})

export const DataProvider = ({ children }: React.PropsWithChildren<{}>) => {
    
    const [products, setProducts] = useState([]);
    const fetchProductsData = async () => {
        const data = await getData('https://products-switcher-api.onrender.com/json');
        setProducts(data);
    }

    return <DataContext.Provider value={{ products, fetchProductsData }}>{children}</DataContext.Provider>
}