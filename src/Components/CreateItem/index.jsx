import { useRef } from "react";
import toggle from "../../Utils/toggle";
import "./CreateItem.css";

export default function CreateItem({
  items,
  setItems,
  title,
  inputNProducts,
  inputPrice,
}) {
  const pError = useRef(null);

  function saveData(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    data.valor_gr_ml = (
      Number(data.valor_compra) / Number(data.unidad_compra)
    ).toFixed(2);
    data.valor_total = (
      Number(data.cantidad_usada) * Number(data.valor_gr_ml)
    ).toFixed(2);
    data.id = Date.now();

    if (title === "Ingrediente") {
      data.type = "Ingrediente";

      const alreadyItem = items.ingredients.find(
        (item) => item.nombre === data.nombre
      );

      if (alreadyItem) {
        return pError.current.classList.remove("inactive");
      }
      toggle(".create-ingredient", "active");
      pError.current.classList.add("inactive");

      const newItems = { ...items };
      newItems.ingredients = [...newItems.ingredients, data];
      newItems.results.cost_by_unit = 0;
      newItems.results.utility = 0;
      setItems(newItems);
    } else if (title === "Empaque") {
      data.type = "Empaque";
      const newItems = { ...items };
      newItems.packages = [...items.packages, data];
      newItems.results.cost_by_unit = 0;
      newItems.results.utility = 0;

      setItems(newItems);
    }

    inputNProducts.current.value = 0;
    inputPrice.current.value = 0;
    e.target.reset();
  }

  function validateInput(e) {
    const input = e.target.value;

    if (!/^\d*\.?\d*$/.test(input)) {
      e.target.value = input.slice(0, -1); // Remover el último carácter inválido
    }
  }

  return (
    <div className="create-ingredient ">
      <form
        onSubmit={(e) => {
          saveData(e);
        }}
        id="create-form"
        className="relative create-form min-w-42 border-blue rounded p-8 flex flex-col gap-4"
      >
        <h3 className="text-xl">{title}</h3>
        <div className="input-container">
          <label htmlFor="nombre" className="text-left block">
            Nombre:
          </label>
          <input
            className="w-52 rounded-sm color-black p-1"
            placeholder={
              title === "Ingrediente" ? "Azucar" : "Frascos de vidrio"
            }
            id="nombre"
            name="nombre"
            type="text"
            required
          />
          <p ref={pError} className="text-sm text-red-500 inactive">
            Ya has agregado este ingrediente
          </p>
          <p className="text-sm text-red-500 inactive">
            Por favor rellene este campo
          </p>
        </div>
        <div className="input-container">
          <label htmlFor="unidad_medida" className="text-left block">
            Unidad de medida:
          </label>
          <input
            className="w-52 rounded-sm color-black p-1"
            placeholder={title === "Ingrediente" ? "Libra" : "Caja"}
            id="unidad_medida"
            name="unidad_medida"
            type="text"
            required
          />
          <p className="text-sm text-red-500 inactive">
            Por favor rellene este campo
          </p>
        </div>
        <div className="input-container">
          <label htmlFor="unidad_compra" className="text-left block">
            Unidad de compra:
          </label>
          <input
            className="w-52 rounded-sm color-black p-1"
            placeholder={title === "Ingrediente" ? "500" : "20"}
            id="unidad_compra"
            name="unidad_compra"
            type="number"
            required
          />
          <p className="text-sm text-red-500 inactive">
            Por favor rellene este campo
          </p>
        </div>
        <div className="input-container">
          <label htmlFor="valor_compra" className="text-left block">
            Valor de compra:
          </label>
          <input
            className="w-52 rounded-sm color-black p-1"
            placeholder="2500"
            id="valor_compra"
            name="valor_compra"
            type="number"
            required
          />
          <p className="text-sm text-red-500 inactive">
            Por favor rellene este campo
          </p>
        </div>

        <div className="input-container">
          <label htmlFor="cantidad_usada" className="text-left block">
            Cantidad usada:
          </label>
          <input
            className="w-52 rounded-sm color-black p-1"
            placeholder={title === "Ingrediente" ? "200" : "15"}
            id="cantidad_usada"
            name="cantidad_usada"
            onChange={validateInput}
            required
          />
          <p className="text-sm text-red-500 inactive">
            Por favor rellene este campo
          </p>
        </div>

        <button
          // onClick={() => toggle(".create-ingredient", "active")}
          className="add-button border-blue px-4 py-2 rounded-lg"
        >
          Agregar
        </button>
        <button
          type="button"
          onClick={() => toggle(".create-ingredient", "active")}
          className="close-btn font-black"
        >
          X
        </button>
      </form>
    </div>
  );
}
