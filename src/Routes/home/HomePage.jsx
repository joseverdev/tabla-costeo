import React, { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useAnimateButtons } from "../useAnimateButtons";

function HomePage() {
  const { navigateToView } = useAnimateButtons();

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

            <section className=" bg-slate-200 w-80 rounded-xl  m-auto p-4">
              <div className=" text-left space-y-4 flex items-center gap-2">
                <p className="text-lg">🖊️</p>
                <p className="text-black ">
                  Crea la lista de ingredientes que se necesitaron en la
                  elaboración de un producto, y calcularé los costos por ti
                </p>
              </div>
            </section>
            <section>
              <button
                className="main-button block border p-5 w-full rounded-lg mb-4 text-lg"
                onClick={(e) => navigateToView(e, "/product-name")}
              >
                Crear una nuevo costeo
              </button>
              <button
                className="main-button block border p-5 w-full rounded-lg mb-4 text-lg"
                onClick={(e) => navigateToView(e, "/save-list")}
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
