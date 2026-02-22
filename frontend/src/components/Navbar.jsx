import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        🌍 <span style={{ fontWeight: "600" }}>Smart AQI Platform</span>
      </div>
      <button style={styles.button} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  nav: {
    background: "#0f172a",
    color: "white",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    fontSize: "20px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  button: {
    background: "#ef4444",
    border: "none",
    padding: "8px 18px",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Navbar;