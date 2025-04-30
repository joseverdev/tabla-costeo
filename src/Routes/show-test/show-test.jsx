import { useLocation, useNavigate } from "react-router-dom";
import { CreateEditTest } from "../../Components/CreateEditTest/CreateEditTest";
import { useEffect } from "react";

function ShowTest(){

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
        <CreateEditTest
            name={item.name}
            backPath='/save-list'
        />
    );
}

export { ShowTest };