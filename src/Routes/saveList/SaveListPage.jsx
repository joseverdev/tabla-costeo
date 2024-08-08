import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import DownIcon from "../../Icons/DownIcon";
import ArrowRight from "../../Icons/ArrowRight";

import "./SaveList.css";
import { useNavigate } from "react-router-dom";

function SaveListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState();

  function toProduct(item) {
    navigate("/show-save", {
      state: { item },
    });
  }

  useEffect(() => {
    const getData = () => {
      const dataLS = localStorage.getItem("listSave");
      if (dataLS) {
        setData(JSON.parse(dataLS));
      }
    };

    getData();
  }, []);

  return (
    <>
      <Layout paddingBottom="false">
        <section className="saveList-container flex-col gap-4 w-80 m-auto">
          <h2 className="text-2xl text-center font-medium py-4">
            Lista de Costeos Guardados
          </h2>
          <ul className="w-full divide-y divide-slate-700 list-container rounded-md py-4">
            {data ? (
              data.map((item) => (
                <li className=" p-4 " key={item.id}>
                  <a
                    className="flex  items-center "
                    onClick={() => toProduct(item)}
                  >
                    <p className="">{item.name || "sin titulo"}</p>
                    <ArrowRight fill="var(--blue)" className="ml-auto w-12" />
                  </a>
                </li>
              ))
            ) : (
              <p>No hay productos guardados</p>
            )}

            {/*  <li className=" p-4 ">
              <a className="flex justify-start items-center ">
                <p className="">
                  Vino de cafe con cereales y cerezas de calidad
                </p>
                <ArrowRight fill="var(--blue)" className="ml-auto w-12" />
              </a>
            </li> */}
          </ul>
          <button
            type="button"
            className="outline-blue-500 w-16  flex justify-center py-2 border  rounded-l-md self-start"
            onClick={() => navigate("/")}
          >
            <ArrowRight left={"true"} fill="#00adb5" />
          </button>
        </section>
      </Layout>
    </>
  );
}

export { SaveListPage };
