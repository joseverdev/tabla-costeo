import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import ArrowRight from "../../Icons/ArrowRight";
import { useNavigate } from "react-router-dom";

function ProductNamePage() {
  const [errorMsg, setErrorMsg] = useState("Error");

  function saveNameproduct(e) {
    e.preventDefault();
    const name = e.target.nameProduct.value;

    const $submitBtn = e.target.querySelector("#submit-btn");

    $submitBtn.classList.add("button-animation");
    $submitBtn.addEventListener(
      "transitionend",
      () => {
        $submitBtn.classList.remove("button-animation");

        if (!name) {
          setErrorMsg("Por favor escribe un nombre");
          document.querySelector(".error").classList.remove("inactive");
        } else {
          document.querySelector(".error").classList.add("inactive");
          let list = localStorage.getItem("listSave");
          if (!list) {
            localStorage.setItem("listSave", JSON.stringify([]));
            list = [];
          }
          const parsedList = JSON.parse(list);

          const item = parsedList.some((item) => item.name === name);

          if (!item) {
            navigate("/create", {
              state: { nameProduct: name },
            });

            return;
          } else {
            setErrorMsg(
              "Ya existe un elemento guardado con este nombre, por favor escribe otro"
            );

            document.querySelector(".error").classList.remove("inactive");
          }
        }
      },
      { once: true }
    );
  }

  const navigate = useNavigate();

  // const { navigateToView } = useAnimateButtons();

  return (
    <>
      <Layout>
        <section className="center-container">
          <form
            onSubmit={saveNameproduct}
            className="w-72 flex flex-col place-content-center"
          >
            <label className="text-2xl mb-8" htmlFor="nameProduct">
              Nombre de tu receta
            </label>
            <div className="mb-8">
              <input
                className="outline-green-500 px-4 text-sm py-6 rounded-md text-black  w-full "
                id="nameProduct"
                type="text"
                placeholder="Escribe el nombre de tu receta"
                name="nameProduct"
              />
              <p className="text-rose-400 mt-4 font-bold error inactive">
                {errorMsg}
              </p>
            </div>

            <div className="button-container flex justify-between">
              <button
                className="main-button outline-blue-500 self-end text-lg px-8 py-3 border rounded-l-lg"
                type="button"
                onClick={()=> {window.location.hash = "#/home"}}
              >
                <ArrowRight left={"true"} fill="#00adb5" />
              </button>
              <button
                id="submit-btn"
                className="main-button outline-blue-500 self-end text-lg px-8 py-3 border rounded-r-lg"
              >
                <ArrowRight fill="#00adb5" />
              </button>
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
}

export { ProductNamePage };
