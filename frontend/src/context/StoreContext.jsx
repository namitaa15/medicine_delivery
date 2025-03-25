import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const StoreContext = createContext({});

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:5002"; // Ensure backend is running on this port
    const [medicine_list, setMedicineList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Add item to cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.post(url + "/api/orders/add", { itemId }, { headers: { token } });
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
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.post(url + "/api/orders/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    // Get total cart amount (with safety check)
    const getTotalCartAmount = () => {
        if (!medicine_list || medicine_list.length === 0) {
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
            const response = await axios.get(url + "/api/medicines");
            console.log("📦 Medicines fetched from backend:", response.data.data); // 👈 ADD THIS
            if (response.data && response.data.data) {
                setMedicineList(response.data.data);
            } else {
                console.warn("API response did not contain medicine data.");
                setMedicineList([]);
            }
        } catch (error) {
            console.error("Error fetching medicine list:", error);
            setMedicineList([]);
        }
    };
    

    // Load cart data from backend (ensuring valid data)
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/orders/unplaced", {}, { headers: { token } });
            if (response.data && response.data.orders) {
                setCartItems(response.data.orders);
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
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;