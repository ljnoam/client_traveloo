const Notification = ({ type = "success", message }) => {
    const colors = {
      success: "bg-green-100 text-green-800 border-green-300",
      error: "bg-red-100 text-red-800 border-red-300",
      info: "bg-blue-100 text-blue-800 border-blue-300",
    };
  
    return (
      <div className={`p-4 border rounded-lg text-sm ${colors[type]} mb-4`}>
        {message}
      </div>
    );
  };
  
  export default Notification;
  