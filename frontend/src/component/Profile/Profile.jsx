import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
const Profile = () => {
    const { logout, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    // Function for logging out the user
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logout successfully");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    // Function to navigate to different pages
    const handlePages = (url) => {
        if (url) {
            navigate(url);
            document.getElementById("my-drawer-4").checked = false; 
        }
    };

  

    return (
        <div className="">
            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className='drawer-button btn btn-ghost btn-circle avatar'>
                        <div className="w-10 rounded-full">
                            <img
                                alt="Profile"
                                referrerPolicy="no-referrer"
                                src={`${user ? user.photo:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}`}
                            />
                        </div>
                    </label>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><button onClick={() => handlePages("/update-profile")}>Profile</button></li>
                        <li><button onClick={() => handlePages("/orders")}>Orders</button></li>
                        <li><button onClick={() => handlePages("/settings")}>Settings</button></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
