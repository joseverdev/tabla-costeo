import "./App.css";
import Layout from "../../Components/Layout";
import CreateItem from "../../Components/CreateItem";
import { useEffect, useRef, useState } from "react";
import toggle from "../../Utils/toggle";
import ContainerList from "../../Components/ContainerList";
import ListItem from "../../Components/ListItem";

const ingredientsList = [
  {
    nombre: "Azucar",
    unidad_medida: "Libra",
    unidad_compra: 500,
    valor_compra: 2000,
    valor_gramo: 4,
    cantidad_usada: 1735,
  },
];

function App() {
  const [items, setItems] = useState({
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
    },
  });

  const [title, setTitle] = useState("");
  const [nProducts, setNProducts] = useState(null);

  /*   const [results, setResults] = useState({
    ingredients_cost: 0,
    packages_cost: 0,
    total_inputs: 0,
    work_cost: 0,
    total: 0,
    units_produced: 0,
    cost_by_Unit: 0,
    price_by_unit: 0,
    utility: 0,
  }); */

  const inputNProducts = useRef();
  const inputPrice = useRef();

  function deleteIngredientLocalStorage(nombre) {
    const newItems = { ...items };
    newItems.ingredients = newItems.ingredients.filter(
      (item) => item.nombre !== nombre
    );

    newItems.results.cost_by_unit = 0;
    newItems.results.utility = 0;
    inputNProducts.current.value = 0;
    inputPrice.current.value = 0;

    setItems(newItems);
  }
  function deletePackageLocalStorage(nombre) {
    const newItems = { ...items };
    newItems.packages = newItems.packages.filter(
      (item) => item.nombre !== nombre
    );
    newItems.results.cost_by_unit = 0;
    newItems.results.utility = 0;
    inputNProducts.current.value = 0;
    inputPrice.current.value = 0;
    setItems(newItems);
  }

  const sumAllIngredients = () => {
    const total = items.ingredients.reduce(
      (acc, cur) => acc + cur.valor_total,
      0
    );

    if (items.results.ingredients_cost != total) {
      const newItems = { ...items };
      newItems.results.ingredients_cost = total;
      setItems(newItems);
    }

    return total;
  };

  const sumAllPackages = () => {
    const total = items.packages.reduce((acc, cur) => acc + cur.valor_total, 0);

    if (items.results.packages_cost != total) {
      const newItems = { ...items };
      newItems.results.packages_cost = total;
      setItems(newItems);
    }

    return total;
  };

  function sumInputs() {
    const total = items.results.ingredients_cost + items.results.packages_cost;

    if (items.results.total_inputs != total) {
      const newItems = { ...items };
      newItems.results.total_inputs = total;
      setItems(newItems);
    }
    return total;
  }

  function sumWorkCost() {
    if (items.results.total_inputs > 0) {
      const total = (items.results.total_inputs * 60) / 100;
      if (items.results.work_cost != total) {
        const newItems = { ...items };
        newItems.results.work_cost = total;
        setItems(newItems);
      }
      return total;
    }
  }

  function sumTotal() {
    if (items.results.total_inputs && items.results.work_cost) {
      const total = items.results.total_inputs + items.results.work_cost;
      if (items.results.total != total) {
        const newItems = { ...items };
        newItems.results.total = total;
        setItems(newItems);
      }
      return total;
    }
  }

  function calculateCost(e) {
    if (e.target.value == "") {
      if (items.results.cost_by_unit != e.target.value) {
        const newItems = { ...items };
        newItems.results.cost_by_unit = 0;
        return setItems(newItems);
      }
    } else if (items.results.total && e.target.value) {
      const total = items.results.total / parseInt(e.target.value);
      if (items.results.cost_by_unit != total) {
        const newItems = { ...items };
        newItems.results.cost_by_unit = total;
        newItems.results.units_produced = parseInt(e.target.value);
        setItems(newItems);
      }
      return total;
    }
  }
  function calculateUtil(e) {
    if (e.target.value == "") {
      if (items.results.utility != e.target.value) {
        const newItems = { ...items };
        newItems.results.utility = e.target.value;
        return setItems(newItems);
      }
    } else if (items.results.cost_by_unit && e.target.value) {
      const total = parseInt(e.target.value) - items.results.cost_by_unit;
      if (items.results.utility != total) {
        const newItems = { ...items };
        newItems.results.utility = total;
        newItems.results.price_by_unit = parseInt(e.target.value);
        setItems(newItems);
      }
      return total;
    }
  }

  useEffect(() => {
    const itemsLS = localStorage.getItem("items");
    const parseItems = JSON.parse(itemsLS);
    if (parseItems) {
      parseItems.results.cost_by_unit = 0;
      parseItems.results.utility = 0;
      setItems(parseItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <Layout>
        <button
          onClick={() => {
            toggle(".create-ingredient", "active");
            setTitle("Ingrediente");
          }}
          className="add-button fixed bottom-4 right-1 border-blue px-4 py-2 rounded-full w-18 h-12 flex items-center"
        >
          <p>Ingrediente</p>
          <span className="ml-1 font-black text-2xl">+</span>
        </button>
        <button
          onClick={() => {
            toggle(".create-ingredient", "active");
            setTitle("Empaque");
          }}
          className="add-button fixed bottom-4 left-1 border-blue px-4 py-2 rounded-full w-18 h-12 flex items-center"
        >
          Empaque <span className="ml-1 font-black text-2xl">+</span>
        </button>
        <CreateItem
          title={title}
          setTitle={setTitle}
          items={items}
          setItems={setItems}
          inputNProducts={inputNProducts}
          inputPrice={inputPrice}
        />
        <h1 className="text-2xl font-medium mb-4">Costeo de Productos</h1>
        <ContainerList title="Ingredientes">
          {items.ingredients?.map((ingredient) => (
            <ListItem
              key={ingredient.nombre}
              item={ingredient}
              title={"Ingredientes"}
              deleteItemLocalStorage={deleteIngredientLocalStorage}
            />
          ))}
        </ContainerList>
        <ContainerList title="Empaques">
          {items.packages?.map((pack) => (
            <ListItem
              key={pack.nombre}
              item={pack}
              title={"Empaques"}
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
                    <label htmlFor="num-products">Unidades producidas:</label>
                  </td>
                  <td>
                    <input
                      ref={inputNProducts}
                      id="num-products"
                      className="w-full text-sm text-center text-black"
                      type="number"
                      placeholder="Num. productos"
                      onChange={calculateCost}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Costo por unidad:</td>
                  <td>${items.results.cost_by_unit}</td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="price">Precio por unidad:</label>
                  </td>
                  <td>
                    <input
                      ref={inputPrice}
                      id="price"
                      className="w-full text-sm text-center text-black"
                      type="number"
                      placeholder="Precio de venta"
                      onChange={calculateUtil}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Utilidad por unidad:</td>
                  <td>$ {items.results.utility | 0}</td>
                </tr>
              </tbody>
            </table>
          </article>
        </ContainerList>
      </Layout>
    </>
  );
}

export default App;
