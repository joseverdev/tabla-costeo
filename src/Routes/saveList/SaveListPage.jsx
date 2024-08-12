import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import DownIcon from "../../Icons/DownIcon";
import ArrowRight from "../../Icons/ArrowRight";

import "./SaveList.css";
import { useNavigate } from "react-router-dom";
import TrashIcon from "../../Icons/TrashIcon";
import { useAnimateButtons } from "../useAnimateButtons";

function SaveListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const { navigateToView } = useAnimateButtons();

  function toProduct(e, item) {
    e.preventDefault();
    const $item = e.currentTarget.parentElement;
    $item.classList.add("button-animation");
    $item.addEventListener(
      "transitionend",
      () => {
        $item.classList.remove("button-animation");
        navigate("/show-save", {
          state: { item },
        });
      },
      { once: true }
    );
  }

  function deleteItemFromLocalStorage(id) {
    console.log(id);
    const list = localStorage.getItem("listSave");
    if (!list) {
      return console.error(
        "No se encuentra informacion en el LocalStorage, en SaveListPage"
      );
    }
    const parsedList = JSON.parse(list);
    const newList = parsedList.filter((item) => item.id !== id);
    localStorage.setItem("listSave", JSON.stringify(newList));
    setData(newList);
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
                <li
                  className="main-button p-4 flex gap-10 text-left"
                  key={item.id}
                >
                  <button className="delete border-none">
                    <TrashIcon
                      fill="#e63946"
                      onClick={() => deleteItemFromLocalStorage(item.id)}
                    />
                  </button>

                  <a
                    className=" flex  items-center grow"
                    onClick={(e) => toProduct(e, item)}
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
            className="main-button outline-blue-500 w-16  flex justify-center py-2 border  rounded-l-md self-start"
            onClick={(e) => navigateToView(e, "/")}
          >
            <ArrowRight left={"true"} fill="#00adb5" />
          </button>
        </section>
      </Layout>
    </>
  );
}

export { SaveListPage };
