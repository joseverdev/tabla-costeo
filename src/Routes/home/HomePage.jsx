import React, { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";

function HomePage() {

  useEffect(() => {
    const listSave = localStorage.getItem("listSave");
    if (!listSave) {
      localStorage.setItem("listSave", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <Layout className="">
        <section className="center-container">
          <section className="flex flex-col gap-10">
            <h1 className="text-2xl font-medium ">Costeo de Productos</h1>

            <section className=" bg-slate-200  rounded-xl  m-auto py-4 px-2">
              <div className=" text-left space-y-4 flex items-center gap-2">
                <p className="text-lg">🖊️</p>
                <p className="text-black ">
                  Registra los ingredientes utilizados en la elaboración de un producto y obtén un cálculo detallado de los costos asociados.
                </p>
              </div>
            </section>
            <section>
              <button
                className="main-button block border p-5 w-full rounded-lg mb-4 text-lg"
                onClick={() => (window.location.hash = "#/create-test")}
              >
                Crear una nuevo costeo
              </button>
              <button
                className="main-button block border p-5 w-full rounded-lg mb-4 text-lg"
                onClick={() => (window.location.hash = "#/save-list")}
              >
                Costeos guardados
              </button>
            </section>
          </section>
        </section>
      </Layout>
    </>
  );
}

export { HomePage };
