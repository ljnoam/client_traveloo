import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom"; // <-- IMPORT

const Modal = ({ title, children, onClose }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate(); // <-- INIT

  const handleNavigateToLogin = () => {
    navigate("/login"); // <-- REDIRECTION VERS login.jsx
  };

  const handleNavigateToRegister = () => {
    navigate("/register"); // <-- REDIRECTION VERS register.jsx
  };

  const containerClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-green-700";

  const titleClasses = darkMode ? "text-purple-400" : "text-green-700";

  const buttonClasses = darkMode
    ? "bg-purple-500 hover:bg-purple-600"
    : "bg-green-500 hover:bg-green-600";

  const linkBase = "font-bold text-sm px-3 py-1 rounded transition";
  const linkConnexion = darkMode
    ? `${linkBase} bg-purple-500 text-white hover:bg-purple-600`
    : `${linkBase} bg-green-500 text-white hover:bg-green-600`;
  const linkInscrire = darkMode
    ? `${linkBase} bg-purple-700 text-white hover:bg-purple-800`
    : `${linkBase} bg-green-700 text-white hover:bg-green-800`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 ${containerClasses}`}>
        <h3 className={`text-lg font-semibold text-center ${titleClasses}`}>{title}</h3>
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-3">
            <button onClick={handleNavigateToLogin} className={linkConnexion}>
              Connexion
            </button>
            <button onClick={handleNavigateToRegister} className={linkInscrire}>
              S'inscrire
            </button>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={onClose}
            className={`mt-4 px-4 py-2 ${buttonClasses} text-white rounded text-sm`}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
