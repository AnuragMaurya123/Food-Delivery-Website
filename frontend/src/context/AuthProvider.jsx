/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import Swal from 'sweetalert2';

const initialState={
  token:localStorage.getItem("token") || null,
}

export const AuthContext = createContext({initialState});

const authReducer=(state,action)=>{
  switch (action.type) {
      case "LOGIN_START":
          return{
              token:null
          }
          case "LOGIN_SUCCESS":
              return{
                  token:action.payload.token
              } 
              case "LOGOUT":
                  return{
                      token:null
                  }
      default:
          state;
  }
}

const AuthProvider = ({ children }) => {
  const [recepit, setRecepit] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const Backend_Url = import.meta.env.VITE_BACKEND_URL;
  const [error, setError] = useState(null);
  const [model, setModel] = useState("");
  const [userCartDetail, setUserCartDetail] = useState([{}]);
  const [state, dispatch] = useReducer(authReducer,initialState)
  const modalRef = useRef(null);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [cartItem, setCartItem] = useState({})
  

  //list of fav food Ids
  useEffect(() => {
    const fetchfavIds = async () => {
      try {
        const response = await axios.get(`${Backend_Url}/api/fav/list-fav`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
  
          setFavorite(response.data.favoriteData); 

      } catch (error) {
        console.log(error);
      }
    };
  
    // Only fetch favorites if there’s a token and menu data
    if (state.token) {
      fetchfavIds();
    }
  }, [Backend_Url, state.token]);
  

  //list menu
    const fetchData = async () => {
     if (state.token) {
      try {
        const response = await axios.get(Backend_Url + "/api/menu/all-menu", {
          headers: {
            Authorization: `Bearer ${state.token}`
          },
        });
        setRecepit(response.data.menus); 
      } catch (error) {
        console.log(error);
      }
     } else {
      try {
        const response = await axios.get(Backend_Url + "/api/menu/all-menu");
        setRecepit(response.data.menus); 
      } catch (error) {
        console.log(error);
      }
     }
    };

 useEffect(() => {
    fetchData()
  }, [state.token]);

  // for removing from favorite list
  const  deleteToFav = async (id) => {
    try {
        // If it's already a favorite, remove it
        const response = await axios.delete(`${Backend_Url}/api/fav/delete-fav`, {
          data: { foodId: id }, // Make sure to send the foodId in the request body
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        if (response.data.success) {
          fetchData(); // Fetch updated favorites
        }
    } catch (error) {
      console.error(error);
    }
  };

  // for adding from favorite list
  const addToFav=async (id)=>{
    try {
        // If it's not a favorite, add it
        const response = await axios.post(`${Backend_Url}/api/fav/add-fav`, { foodId: id }, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        if (response.data.success) {
          fetchData(); // Fetch updated favorites
        }

    } catch (error) {
      console.error(error);
    }
  }
   
  // fetching user profile
  useEffect(() => {
    if (!state.token) return; // Exit early if no token
  
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${Backend_Url}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
  
        if (response.data.success) {
          setUser(response.data.data);
          localStorage.setItem("user", JSON.stringify(response.data.data)); 
        } else {
          toast.error(response.data.message || "User update failed");
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [Backend_Url, state.token, setUser, setLoading]);

  // Create an account
  const createUser = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
        const response = await axios.post(`${Backend_Url}/api/auth/register`, { email, password });
      console.log(response);
      
        // Check for successful registration based on your API response structure
        if (response.data.success) {
            console.log("User registered successfully:", response.data); // Log the success data
            toast.success(response.data.message);
            dispatch({
              type:"LOGIN_SUCCESS",
              payload:{
                token:response.data.token,
              }
          })
          closeModal()
          setLoading(false)
        } else {
              setError(response.data.message) 
              setModel("signup")
        }
    } catch (error) {
      console.log(error);
      
        // Log the error details
        console.error("Registration error:", error.response ? error.response.data : error.message);
        // Show a more user-friendly error message
        setError(error.response?.data?.message || "An unexpected error occurred during registration");
    }finally{
      setLoading(false)
    }
  };

  //for controlling mode start
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  //for controlling model end

  // Login with email and password
  const login = async (email, password) => {
    setLoading(true);
    setError(null);  // Clear any previous errors before starting the login process
  
    try {
      const response = await axios.post(`${Backend_Url}/api/auth/login`, { email, password });
  
      // Check if the login is successful
      if (response.data.success) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: response.data.token,
          }
        });
        
        // Save token in localStorage and show success message
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        // Close the modal after successful login
        closeModal();
        // Redirect user to the specified path
      } else {
        // If the response indicates failure, show an error message
        setError(response.data.message || "Login failed");
        setModel("login")
      }
    } catch (error) {
      // Catch any network or unexpected errors and display them
      setError(error.response?.data?.message || "An unexpected error occurred during login");
    } finally {
      setLoading(false); 
      
    }
  };
  
  // Logout
  const logout =async () => {
    setLoading(true)
     if(user){
      dispatch({
        type:"LOGOUT"
      })
      localStorage.removeItem("token")
      setLoading(false)
     }
     
  };

  // update user
  const updateUser =async (email,name,phone,gender,photo) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("gender", gender);
      if (photo[0]) {
        formData.append("photo", photo[0]); 
      }

      const response = await axios.put(
        `${Backend_Url}/api/user/update`, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${state.token}`, 
            "Content-Type": "multipart/form-data", 
          },
        }
      );


      if (response.data.success) {
        setUser(response.data.data)
        localStorage.setItem("user",response.data.data)
        toast.success("User updated successfully");
      } else {
        toast.error(response.data.message || "User update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }finally{
      setLoading(false)
    }
  };

  //google sign
  const googlelogin = async () => {
      setLoading(true)
    try {
        const result = await signInWithPopup(auth, provider); // Firebase Google auth
        
        // Get user info
        const user = result.user;
        const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            phone:user.phoneNumber 
           
        };
        
        // Send user data to your backend to create an account in the database
        const response = await fetch(`${Backend_Url}/api/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to create user account in the database');
        }

        const data = await response.json();
        if (data.success) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    token: data.token,
                }
            });
            toast.success("Logged in Successfully")
            // Save token in localStorage and show success message
            localStorage.setItem("token", data.token);
            // Close the modal after successful login
            closeModal();
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        setError(error.message || "An unexpected error occurred during Google login");
    }finally{
      setLoading(false)
    }
};

 //add to cart
 const handleAddToCart=async(item)=>{
  if (!state.token) {

    Swal.fire({
      title: "Please Login To Order Foods",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login!"
    }).then((result) => {
      if (result.isConfirmed) {
        openModal()
      }
    });
    return;
  }
  const cartCopy = { ...cartItem }; 
  
  if (cartCopy[item._id]) {
    cartCopy[item._id] += 1; 
  } else {
    cartCopy[item._id] = 1; 
  }

  setCartItem(cartCopy); 

  if(state.token){
    try { 
      const itemId=item._id
    const response=await axios.post(Backend_Url+"/api/cart/add-cart",{itemId},{
      headers: { 
          Authorization: `Bearer ${state.token}`
      }
  })
   if (response.data.success) {
   setUserCartDetail(response.data.cart)
    Swal.fire({
      position: "center",
      icon: "success",
      title: response.data.message,
      showConfirmButton: false,
      timer: 1500
    });
   }
    
    } catch (error) {
    console.log(error);      
    toast.error(error.message)
    }  
}

 }

 // update cart
 const handleUpdateToCart = async (itemId) => {
  // Update local cart state by incrementing by 1 if it exists
  setUserCartDetail((prevCart) => ({
    ...prevCart,
    [itemId]: (prevCart[itemId] || 0) + 1, // Increment by 1 if item exists, else set to 1
  }));

  try {
    const response = await axios.put(
      `${Backend_Url}/api/cart/update-cart`,
      { itemId, quantity: (userCartDetail[itemId] || 0) + 1 }, 
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      }
    );

    if (response.data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      console.log(response);
      
    } else {
      toast.error(response.data.message || "Failed to update cart");
    }
  } catch (error) {
    console.error("Cart update error:", error);
    toast.error(error.response?.data?.message || "An error occurred");
  }
};


// Delete cart
const handleDeleteToCart = async (itemId) => {
  const cartData = structuredClone(userCartDetail); 
 

  if (cartData[itemId]) {
    delete cartData[itemId]; 
    setUserCartDetail(cartData); 
  } else {
    return toast.error("Internal Error")
  }

  try {
    const response = await axios.delete(`${Backend_Url}/api/cart/delete-cart`, {
      headers: {
        Authorization: `Bearer ${state.token}`
      },
      data: { itemId }  
    });

    if (response.data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      toast.error(response.data.message || "Failed to update cart");
    }
  } catch (error) {
    console.error("Cart update error:", error);
    toast.error(error.response?.data?.message || "An error occurred");
  }
};

 //list to cart
 useEffect(() => {
  const fetchListCart=async()=>{
    try { 
    const response=await axios.get(Backend_Url+"/api/cart/list-cart",{
      headers: { 
          Authorization: `Bearer ${state.token}`
      }
  })  
   if (response.data.success) {
      setUserCartDetail(response.data.cartData)
   }else{
    toast.success(response.data.message)
   }
    
    } catch (error) {
    console.log(error);      
    toast.error(error.response?.data?.message || "An error occurred");
    }  
 }

 if (state.token) {
  fetchListCart()
 }
 }, [Backend_Url, state.token])

 //function for how many cart are there
 const countAddToCart = () => {
  if (!userCartDetail || typeof userCartDetail !== 'object') return 0;

  return Object.values(userCartDetail).reduce((totalCount, quantity) => {
    return totalCount + (quantity > 0 ? quantity : 0);
  }, 0);
};


 //function for total price of food
 const getCardAmount = () => {
  if (!userCartDetail || typeof userCartDetail !== 'object') return 0;

  return Object.entries(userCartDetail).reduce((totalAmount, [itemId, quantity]) => {
    const itemInfo = recepit.find((item) => item._id === itemId);
    if (itemInfo && itemInfo.price && quantity > 0) {
      return totalAmount + itemInfo.price * quantity;
    }
    return totalAmount;
  }, 0);
};



  const authValue = {
    cartItem,
    user,
    setUser,
    createUser,
    login,
    logout,
    loading,
    setLoading,
    Backend_Url,
    error, 
    updateUser,
    setError,
    token:state.token,
    dispatch,
    openModal,
    closeModal,
    modalRef,
    model, 
    setModel,
    googlelogin,
    handleAddToCart,
    userCartDetail,
    handleUpdateToCart,
    handleDeleteToCart,
    recepit,
    setRecepit,
    countAddToCart,
    favorite,
    fetchData,
    getCardAmount,
    deleteToFav,
    addToFav
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};



export default AuthProvider;
