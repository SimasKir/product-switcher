import { createContext, useState } from "react"
import getData from "../utils/getData";

export const DataContext = createContext({})

export const DataProvider = ({ children }: React.PropsWithChildren<{}>) => {

    const [products, setProducts] = useState([]);
    const [comments, setComments] = useState([]);
    const fetchProductsData = async () => {
        const data = await getData('https://products-switcher-api.onrender.com/json');
        setProducts(data);
    }

    const fetchCommentsData = async () => {
        const data = await getData('https://products-switcher-api.onrender.com/comments');
        setComments(data);
    }

    return <DataContext.Provider value={{ products, fetchProductsData, comments, fetchCommentsData }}>{children}</DataContext.Provider>
}