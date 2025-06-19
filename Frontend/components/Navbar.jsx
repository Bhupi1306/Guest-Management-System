import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate()

    const [showNav, setShowNav] = useState(false);
    const [newUser, setNewUser] = useState(false);

    useEffect(() => {

    const token = localStorage.getItem("token");
    const apiLoad = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/verify`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
            const data = await response.json();

            if (!data.success) {
                console.error("User verification failed:", data.message);
                setShowNav(false);
            } else {
                setShowNav(true);
                if (data.isAdmin) {
                    setNewUser(true);
                } else {
                    setNewUser(false);
                }
            }

        } catch (error) {
            console.error("Error fetching user data:", error);
            setShowNav(false);
        }
    }

    if(token) {
        apiLoad(token);
        } else {
        setShowNav(false);
    }
  }, [showNav,setShowNav, newUser, setNewUser, navigate, localStorage]);


  const handleLogout = () => {
    localStorage.clear()
    navigate("/login");
  };

  const handleNewUser = () => {
    navigate('/register')
  };


  return (
    <>
    {showNav && (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-semibold text-blue-600" onClick={() => {navigate('/home')}}>LOGO</div>

      <div className="space-x-5">
        {newUser &&(<button
          onClick={handleNewUser}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          New User
        </button>)}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
    )}
    </>
  );
}
