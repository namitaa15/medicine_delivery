import React, { createContext, useState, useEffect } from 'react';  // Fix: Combine the imports

import axios from "axios";

// Create the context only once, we don't need to re-import it
export const StoreContext = createContext();

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"; // Backend API endpoint
    const [token, setToken] = useState("");
    const [medicine_list, setMedicineList] = useState([]); // Store medicines data

    // Add item to the cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // Remove item from the cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Calculate the total amount of the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = medicine_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Fetch the list of medicines from the backend
    const fetchMedicineList = async () => {
        const response = await axios.get(url + "/api/medicine/list");
        setMedicineList(response.data.data);
    };

    // Load cart data for the user from the backend
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    // On component mount, load the data
    useEffect(() => {
        async function loadData() {
            await fetchMedicineList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    // Provide the context value to the rest of the app
    const contextValue = {
        medicine_list, // List of medicines
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}  {/* Render children components */}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;