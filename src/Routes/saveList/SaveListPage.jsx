import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import ArrowRight from "../../Icons/ArrowRight";

import "./SaveList.css";
import { useNavigate } from "react-router-dom";
import TrashIcon from "../../Icons/TrashIcon";

function SaveListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const [itemToDelete, setItemToDelete] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);


  function toProduct(e, item) {
    e.preventDefault();
    const $item = e.currentTarget.parentElement;
    $item.classList.add("button-animation");
    navigate("/show", {
      state: { name: item.name },
    });
  }

  function showDeleteConfirmation(item) {
    setShowConfirmation(true);
    setItemToDelete(item);
  }

  function deleteItemFromLocalStorage(itemList) {
    // setItemToDelete(id);

    const list = localStorage.getItem("listSave");
    if (!list) {
      return console.error(
        "No se encuentra informacion en el LocalStorage, en SaveListPage"
      );
    }
    const parsedList = JSON.parse(list);
    const newList = parsedList.filter((item) => item.id !== itemList.id);
    localStorage.setItem("listSave", JSON.stringify(newList));
    setData(newList);
    setShowConfirmation(false);
  }

  function cancelBtn(e) {
    const $btn = e.currentTarget;
    $btn.classList.add("cancel-btn");
    setShowConfirmation(false);

  }

  function deleteBtn(e, item) {
    console.log("delete");

    const $btn = e.currentTarget;
    $btn.classList.add("delete-confirmation-btn-animation");

    deleteItemFromLocalStorage(item);
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
        {showConfirmation && (
          <section className="container-show-confirmation">
            <article className="modal-show-confirmation w-72 px-4 py-8 rounded-md">
              <p className="mb-4">
                ¿Estas seguro de eliminar {itemToDelete.name}?
              </p>
              <div className="button-container flex justify-center gap-4">
                <button
                  onClick={(e) => cancelBtn(e)}
                  className="main-button rounded-md px-4 py-1 "
                >
                  Cancelar
                </button>
                <button
                  onClick={(e) => deleteBtn(e, itemToDelete)}
                  className="delete-confirmation-btn  border-none rounded-md px-4 py-1"
                >
                  Eliminar
                </button>
              </div>
            </article>
          </section>
        )}

        <section className="saveList-container flex-col gap-4 w-full m-auto">
          <h2 className="text-2xl text-center font-medium py-4">
            Lista de Costeos Guardados
          </h2>
          <ul className="w-full divide-y divide-slate-700 list-container rounded-md py-4 ">
            {data?.length > 0 ? (
              data.map((item) => (
                <li
                  className=" hover:cursor-pointer  flex text-left"
                  key={item.id}
                >
                  <button className="delete border-none hover:bg-red-50 w-20"
                    onClick={() => showDeleteConfirmation(item)}

                  >
                    <TrashIcon
                    className="mx-auto"
                      fill="#e63946"
                    />
                  </button>
                  <button
                    onClick={(e) => toProduct(e, item)}
                    className="main-button border-none w-full py-4 px-6"
                  >

                    <a
                      className=" flex  items-center grow"
                    >
                      <p className="">{item.name || "sin titulo"}</p>
                      <ArrowRight fill="var(--blue)" className="ml-auto w-12" />
                    </a>
                  </button>
                </li>
              ))
            ) : (
              <p>No hay productos guardados</p>
            )}
          </ul>
          <button
            type="button"
            className="main-button outline-blue-500 w-16  flex justify-center py-2 border  rounded-l-md self-start"
            onClick={() => { window.location.hash = "#/home" }}
          >
            <ArrowRight left={"true"} fill="#00adb5" />
          </button>
        </section>
      </Layout>
    </>
  );
}

export { SaveListPage };
