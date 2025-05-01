import { useLocation, useNavigate } from "react-router-dom";
import { CreateEdit } from "../../Components/CreateEdit/CreateEdit";
import { useEffect } from "react";

function ShowPage(){

    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state;

    useEffect(() => {
        if (!item) {
          navigate("/home"); // redirige si no hay item
        }
      }, [item, navigate]);


      if (!item) {
        return null; // o puedes mostrar un mensaje de error
      }

    return (
        <CreateEdit
            name={item.name}
            backPath='/save-list'
        />
    );
}

export { ShowPage };