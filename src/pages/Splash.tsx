import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// using project logo image on splash

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero">
      <div className="animate-pulse">
        <div className="flex items-center justify-center w-28 h-28 rounded-full bg-white mb-8">
          <img src="/logo.png" alt="Nzuri Mobiles" className="w-full h-full object-contain p-2" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
        Nzuri Mobiles
      </h1>
      <p className="text-primary-foreground/80 text-lg">
        Your Trusted Mobile Service Partner
      </p>
    </div>
  );
};

export default Splash;
