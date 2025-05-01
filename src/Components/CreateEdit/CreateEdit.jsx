import Layout from "../Layout/Layout";
import CreateItem from "../CreateItem/CreateItem";
import { useEffect, useRef, useState } from "react";
import toggle from "../../Utils/toggle";
import ContainerList from "../ContainerList/ContainerList";
import ListItem from "../ListItem/ListItem";
import EditItem from "../EditItem/EditItem";
import { useNavigate } from "react-router-dom";
import removeZeros from "../../Utils/removeZeros";

import "./CreateEdit.css";

function CreateEdit({ name, backPath }) {



  const stateItemsInicial = {
    name: name || 'Escribe el nombre de tu receta',
    ingredients: [
      /*  {
        nombre: "Azucar",
        unidad_medida: "Libra",
        unidad_compra: 500,
        valor_compra: 2000,
        valor_gramo: null,
        cantidad_usada: 1735,
        valor_total: null,
      }, */
    ],
    packages: [
      /*  {
        nombre: "Frasco de vidrio",
        unidad_medida: "Caja",
        unidad_compra: 25,
        valor_compra: 15000,
        valor_gramo: null,
        cantidad_usada: 1735,
        valor_total: null,
      }, */
    ],
    results: {
      ingredients_cost: 0,
      packages_cost: 0,
      total_inputs: 0,
      work_cost: 0,
      total: 0,
      units_produced: 0,
      cost_by_unit: 0,
      price_by_unit: 0,
      utility: 0,
      sale_price: 0,
      total_utility: 0,
    },
  };

  const [item, setItem] = useState(stateItemsInicial);
  const [actualRecipe, setActualRecipe] = useState("");

  const [title, setTitle] = useState("");
  const [itemToEdit, setItemToEdit] = useState(null);

  const [showEditName, setShowEditName] = useState(false);

  const inputNProducts = useRef();
  const inputPrice = useRef();

  const navigate = useNavigate();

  function deleteIngredientLocalStorage(nombre) {
    const newItems = { ...item };
    newItems.ingredients = newItems.ingredients.filter(
      (item) => item.nombre !== nombre
    );

    newItems.results.cost_by_unit = 0;
    newItems.results.utility = 0;
    inputNProducts.current.value = 0;
    inputPrice.current.value = 0;

    setItem(newItems);
  }
  function deletePackageLocalStorage(nombre) {
    const newItems = { ...item };
    newItems.packages = newItems.packages.filter(
      (item) => item.nombre !== nombre
    );
    newItems.results.cost_by_unit = 0;
    newItems.results.utility = 0;
    inputNProducts.current.value = 0;
    inputPrice.current.value = 0;
    setItem(newItems);
  }

  const sumAllIngredients = () => {
    const total = item.ingredients.reduce(
      (acc, cur) => Number(acc) + Number(cur.valor_total),
      0
    );

    if (item.results.ingredients_cost != total) {
      const newItems = { ...item };
      newItems.results.ingredients_cost = total;
      setItem(newItems);
    }

    return total;
  };

  const sumAllPackages = () => {
    const total = item.packages.reduce(
      (acc, cur) => Number(acc) + Number(cur.valor_total),
      0
    );

    if (item.results.packages_cost != total) {
      const newItems = { ...item };
      newItems.results.packages_cost = total;
      setItem(newItems);
    }

    return total;
  };

  function sumInputs() {
    const total = item.results.ingredients_cost + item.results.packages_cost;

    if (item.results.total_inputs != total) {
      const newItems = { ...item };
      newItems.results.total_inputs = total;
      setItem(newItems);
    }
    return total;
  }

  function sumWorkCost() {
    if (item.results.total_inputs > 0) {
      const total = (item.results.total_inputs * 60) / 100;
      if (item.results.work_cost != total) {
        const newItems = { ...item };
        newItems.results.work_cost = total;
        setItem(newItems);
      }
      return total;
    }
  }

  function sumTotal() {
    if (item.results.total_inputs && item.results.work_cost) {
      const total = item.results.total_inputs + item.results.work_cost;
      if (item.results.total != total) {
        const newItems = { ...item };
        newItems.results.total = total;
        setItem(newItems);
      }
      return total;
    }
  }

  function calculateCost() {
    const value = inputNProducts.current.value;

    if (value == "" || value == 0) {
      if (item.results.cost_by_unit != value) {
        const newItems = { ...item };
        newItems.results.cost_by_unit = 0;
        setItem(newItems);
      }
    } else if (item.results.total && value) {
      const total = removeZeros(item.results.total / Number(value)); //
      if (item.results.cost_by_unit != total) {
        const newItems = { ...item };
        newItems.results.cost_by_unit = total;
        newItems.results.units_produced = Number(value);
        setItem(newItems);
      }
      return total;
    }
  }
  function calculateUtil(e) {
    if (e.target.value == "") {
      if (item.results.utility != e.target.value) {
        const newItems = { ...item };
        newItems.results.utility = e.target.value;
        return setItem(newItems);
      }
    } else if (item.results.cost_by_unit && e.target.value) {
      const total = parseInt(e.target.value) - item.results.cost_by_unit;
      if (item.results.utility != total) {
        const newItems = { ...item };
        newItems.results.utility = total;
        newItems.results.price_by_unit = parseInt(e.target.value);
        setItem(newItems);
      }
      return total;
    }
  }

  function calculateTotalUtil() {
    if (item.results.utility && item.results.units_produced) {
      const total = item.results.utility * item.results.units_produced;
      if (item.results.total_utility != total) {
        const newItems = { ...item };
        newItems.results.total_utility = total;
        setItem(newItems);
      }
      return total;
    }
  }

  async function save() {
    try {
      let list = await localStorage.getItem("listSave");

      if (!list) {
        localStorage.setItem("listSave", JSON.stringify([]));
        list = [];
      }
      const parsedList = JSON.parse(list);
      const itemExist = parsedList.findIndex(
        (itemList) => itemList.name === item.name
      );

      const $successMsg = document.getElementById("success-msg");

      if (actualRecipe === item.name) {
        console.log("el item es igual al actual item, puede ser guardado");
        // console.log({ parsedList });
        item.id = crypto.randomUUID();


        console.log(item)

        // parsedList[item] = { ...parsedList[item], ...item };
        parsedList.find((el) => {
          if (el.name === item.name) {
            el.ingredients = item.ingredients;
            el.packages = item.packages;
            el.results = item.results;
          }
        });

        $successMsg.classList.toggle("inactive");
        setTimeout(() => {
          $successMsg.classList.toggle("inactive");
        }, 1000);
      } else if (itemExist === -1) {
        // console.log({ parsedList });
        console.log("el item no existe, puede ser guardado");
        item.id = crypto.randomUUID();


        // console.log(item)
        parsedList.push(item);

        setActualRecipe(item.name);

        $successMsg.classList.toggle("inactive");
        setTimeout(() => {
          $successMsg.classList.toggle("inactive");
        }, 1000);
      } else {
        console.log("el item existe, NO puede ser guardado");
        // parsedList[itemExist] = {
        //   ...parsedList[itemExist],
        //   ...item,
        // };
        console.log(parsedList);
        document.getElementById("error-msg").classList.toggle("inactive");
        setTimeout(() => {
          document.getElementById("error-msg").classList.toggle("inactive");

        }, 3000)

      }

      localStorage.setItem("listSave", JSON.stringify(parsedList));

    } catch (err) {
      console.error("hubo un error en useLocalStorage CreateEdit.jsx", err);
    }
  }


  useEffect(() => {
    let listLs = localStorage.getItem("listSave");
    if (!listLs) {
      return console.log("no hay lista en  CreateEdit.jsx useEffect");
    }
    const parsedList = JSON.parse(listLs);

    const itemsFromList = parsedList.find(
      (itemList) => itemList.name === stateItemsInicial.name
    );

    if (itemsFromList) {
      return setItem(itemsFromList);
    }

  }, []);

  useEffect(()=> {

    function handleClickOutside(e) {
      const input = document.getElementById('recipe-title-input');
      const editBtn = document.getElementById('edit-name-btn');
  
      if (!input || !editBtn) return;
  
      if (!input.contains(e.target) && !editBtn.contains(e.target)) {
        setShowEditName(false);
      }
    }
  
    document.addEventListener('click', handleClickOutside);
  
    // Limpieza del listener al desmontar el componente
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[setShowEditName])

  useEffect(() => {
    calculateTotalUtil();
    calculateCost();
  }, [item]);

  return (
    <>
      <Layout>
        <div className="flex gap-2 overflow-y-auto justify- px-4 w-full" >
          <div className="w-full">
            <h2 id="recipe-title" className={`${showEditName === true ? 'inactive' : ''} text-2xl`}>
              {item.name || 'Escribe el nombre de tu receta'}
            </h2>
            <input id="recipe-title-input" className={`${showEditName === false ? 'inactive' : ''} text-[var(--black)] w-full p-2 px-4 outline-none`} type="text" placeholder="Escribe el nombre de tu receta" />

          </div>
          <button
            id="edit-name-btn"
            className="border-none outline-none"
            onClick={(e) => {
              setShowEditName(prev => !prev);
              const $input = document.getElementById("recipe-title-input");

              if (!e.currentTarget.querySelector('#icon-edit').classList.contains('inactive')) {
                console.log('click edit');
                $input.classList.toggle('inactive');
                $input.focus();
              }
              if (!e.currentTarget.querySelector('#icon-check').classList.contains('inactive')) {
                console.log('click check');
                console.log(
                  $input.value
                )
                setItem((prev) => {
                  return {
                    ...prev,
                    name: $input.value
                  }
                })

              }

            }}
          >
            <svg id="icon-edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${showEditName === true ? 'inactive' : ''} icon icon-tabler icons-tabler-outline icon-tabler-edit`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
            <svg id="icon-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${showEditName === false ? 'inactive' : ''} icon icon-tabler icons-tabler-outline icon-tabler-check`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
          </button>

        </div>
        <hr className="my-4 border-gray-700" />
        <button
          onClick={() => {
            toggle(".create-ingredient", "active");
            setTitle("Ingrediente");
          }}
          className="add-button absolute  bottom-4 right-1 border-blue px-4 py-2 rounded-full w-18 h-12 flex item-center"
        >
          <p>Ingrediente</p>
          <span className="ml-1 font-black text-2xl">+</span>
        </button>
        <button
          onClick={() => {
            toggle(".create-ingredient", "active");
            setTitle("Empaque");
          }}
          className="add-button absolute bottom-4  left-1 border-blue px-4 py-2 rounded-full w-18 h-12 flex item-center"
        >
          Empaque <span className="ml-1 font-black text-2xl">+</span>
        </button>
        <button
          onClick={() => (navigate(backPath || "/home"))}
          className="bg-rose-600 absolute left-0 top-56 px-3 py-1  rounded-r-lg border-none"
        >
          Volver
        </button>



        <CreateItem
          title={title}
          setTitle={setTitle}
          item={item}
          setItem={setItem}
          inputNProducts={inputNProducts}
          inputPrice={inputPrice}
        />
        <EditItem
          itemToEdit={itemToEdit}
          title={title}
          setTitle={setTitle}
          item={item}
          setItem={setItem}
        />
        <ContainerList title="Ingredientes">
          {item.ingredients?.map((ingredient) => (
            <ListItem
              setItemToEdit={setItemToEdit}
              key={ingredient.id}
              item={ingredient}
              titleList={"Ingredientes"}
              deleteItemLocalStorage={deleteIngredientLocalStorage}
            />
          ))}
        </ContainerList>
        <ContainerList title="Empaques">
          {item.packages?.map((pack) => (
            <ListItem
              setItemToEdit={setItemToEdit}
              key={pack.id}
              item={pack}
              titleList={"Empaques"}
              deleteItemLocalStorage={deletePackageLocalStorage}
            />
          ))}
        </ContainerList>
        <ContainerList title="Resultados">
          <article className="border-blue p-4 rounded-lg item-container mb-4">
            <table className="w-full mb-2">
              <tbody>
                <tr>
                  <td>Coste de ingredientes: </td>
                  <td>$ {sumAllIngredients() | "0"}</td>
                </tr>
                <tr>
                  <td>Coste de empaques y demas:</td>
                  <td>$ {sumAllPackages() | "0"}</td>
                </tr>
                <tr>
                  <td>Total de insumos: </td>
                  <td>$ {sumInputs() | "0"}</td>
                </tr>
                <tr>
                  <td>60% de trabajo: </td>
                  <td>$ {sumWorkCost() | "0"}</td>
                </tr>
                <tr>
                  <td>Total: </td>
                  <td>$ {sumTotal() | "0"}</td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="num-products">
                      ¿Cuantas unidades salieron?
                    </label>
                  </td>
                  <td className="">
                    <button
                      onClick={() => {
                        if (inputNProducts.current.value > 0) {
                          const newItems = { ...item };
                          newItems.results.units_produced =
                            parseInt(inputNProducts.current.value) - 1;
                          setItem(newItems);
                          calculateCost();
                        } else {
                          return;
                        }
                      }}
                      className="w-8 mr-1 rounded-lg font-bold"
                    >
                      -
                    </button>

                    <input
                      ref={inputNProducts}
                      id="num-products"
                      className="w-10 text-sm text-center  text-black"
                      placeholder="Num. productos"
                      onClick={(e) => {
                        const length = e.target.value.length;
                        e.target.setSelectionRange(length, length);
                      }}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        calculateCost();
                        console.log(e);
                        const newItems = { ...item };
                        newItems.results.units_produced = e.target.value;
                        setItem(newItems);
                      }}
                      value={item.results.units_produced}
                    />
                    <button
                      onClick={() => {
                        if (inputNProducts.current.value == 0) {
                          const newItems = { ...item };
                          newItems.results.units_produced =
                            newItems.results.units_produced + 1;
                          setItem(newItems);
                          calculateCost();
                        } else {
                          const newItems = { ...item };
                          newItems.results.units_produced =
                            parseInt(inputNProducts.current.value) + 1;
                          setItem(newItems);
                          calculateCost();
                        }
                      }}
                      className="w-8 ml-1 rounded-lg font-bold"
                    >
                      +
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Costo por unidad:</td>
                  <td>${item.results.cost_by_unit}</td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="price">¿Que precio pondras?</label>
                  </td>
                  <td>
                    <input
                      ref={inputPrice}
                      id="price"
                      className="w-full text-sm text-center text-black"
                      type="number"
                      placeholder="Precio de venta"
                      onChange={(e) => {
                        const newItems = { ...item };
                        newItems.results.sale_price = parseInt(e.target.value);
                        setItem(newItems);

                        calculateUtil(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Utilidad por unidad:</td>
                  <td>$ {item.results.utility | 0}</td>
                </tr>
                <tr>
                  <td>Utilidad total: </td>
                  <td>$ {item.results.total_utility | 0}</td>
                </tr>
              </tbody>
            </table>
          </article>
          <button
            onClick={() => {
              save();
            }}
            id="save-btn"
            className="main-button add-button border-blue px-4 py-2 rounded-full"
          >
            Guardar Costeo
          </button>
        </ContainerList>
        {
          <output id="success-msg" className="inactive bg-green-700 px-2 py-1 absolute  bottom-12 -translate-x-1/2 rounded-xl ">
            Guardado con exito !
          </output>

        }
        {
          <output id="error-msg" className="absolute  bottom-12 -translate-x-1/2 rounded-xl   bg-red-700 px-2 py-1 inactive">
            Ya existe un producto con ese nombre
          </output>
        }
      </Layout >
    </>
  );
}

export { CreateEdit };
