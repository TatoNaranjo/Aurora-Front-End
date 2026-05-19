import { Button } from "@/components/ui";
import PhoneCheck from "@assets/images/phone_check.svg"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ActivateAccount = ({ delay = 5000, to = '/'}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(to, { replace: true});
    }, delay);
    return () => clearTimeout(timer);
  }, [navigate, to, delay]);
  return (
    <div className="max-w-[473px] xl:h-[502px] rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center px-10 pt-8 gap-5 mx-auto">
      <h3 className="text-center justify-center text-foreground text-3xl font-bold">Activa tu cuenta</h3>
      <p className="text-muted-foreground text-sm font-bold">¡Te damos la bienvenida a AURORA!</p>
      <p className="text-muted-foreground text-sm font-normal">En estos momentos te estamos redirigiendo a la pagina principal.</p>
      <p className="text-foreground text-[10px] font-normal">Si no se te ha redireccionado a la pagina de inicio haz <Button variant={"link"} size={"xs"} onClick={() => navigate(to, { replace: true })}>CLICK AQUÍ</Button></p>
      <img src={PhoneCheck} alt="account created illustration"  className="w-64 h-64"/>
    </div>
  );
}
