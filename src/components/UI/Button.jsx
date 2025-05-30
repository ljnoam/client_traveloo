const Button = ({ children, onClick, type = "primary", className = "" }) => {
    const base = "px-4 py-2 rounded font-medium transition";
    const styles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      danger: "bg-red-600 text-white hover:bg-red-700",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    };
  
    return (
      <button onClick={onClick} className={`${base} ${styles[type]} ${className}`}>
        {children}
      </button>
    );
  };
  
  export default Button;
  