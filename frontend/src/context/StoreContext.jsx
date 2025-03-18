import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const StoreContext = createContext({});

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"; // Ensure backend is running on this port
    const [token, setToken] = useState("");
    const [medicine_list, setMedicineList] = useState([]);

    // Add item to cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) - 1),
        }));
        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    // Get total cart amount (with safety check)
    const getTotalCartAmount = () => {
        if (!medicine_list || medicine_list.length === 0) {
            console.warn("Medicine list is empty, returning total cart amount as 0.");
            return 0;
        }

        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = medicine_list.find((product) => product._id === item);
                if (itemInfo && itemInfo.price) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Fetch medicine list (ensuring valid data)
    const fetchMedicineList = async () => {
        try {
            const response = await axios.get(url + "/api/medicine/list");
            if (response.data && response.data.data) {
                setMedicineList(response.data.data);
            } else {
                console.warn("API response did not contain medicine data.");
                setMedicineList([]); // Prevent undefined issues
            }
        } catch (error) {
            console.error("Error fetching medicine list:", error);
            setMedicineList([]); // Prevent crashes if API fails
        }
    };

    // Load cart data from backend (ensuring valid data)
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            if (response.data && response.data.cartData) {
                setCartItems(response.data.cartData);
            } else {
                setCartItems({}); // Prevent undefined errors
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
            setCartItems({}); // Prevent crashes if API fails
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchMedicineList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    // Debugging: Check if context values exist
    useEffect(() => {
        console.log("StoreContext Updated:", {
            medicine_list,
            cartItems,
            getTotalCartAmount,
            token,
        });
    }, [medicine_list, cartItems, token]);

    // Provide context to children
    const contextValue = {
        medicine_list,
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
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;