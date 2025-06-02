import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Supabase tente de restaurer la session automatiquement via l'URL
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          toast.error("Erreur lors de la connexion après confirmation.");
          return navigate("/login"); // ou une autre page de fallback
        }

        toast.success("🎉 Compte confirmé, bienvenue !");
        navigate("/profile");
      } catch (err) {
        console.error("Erreur lors de la récupération de session :", err);
        toast.error("Une erreur inattendue est survenue.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          {loading ? "Connexion en cours..." : "Redirection..."}
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
