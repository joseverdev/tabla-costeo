import toggle from "../../Utils/toggle";
import "./CreateItem.css";

export default function CreateItem({
  items,
  setItems,
  title,
  inputNProducts,
  inputPrice,
}) {
  // console.log(inputNProducts.current.value);
  // console.log(inputPrice.current.value);
  function saveData(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    data.valor_gr_ml =
      parseInt(data.valor_compra) / parseInt(data.unidad_compra);
    data.valor_total =
      parseInt(data.cantidad_usada) * parseInt(data.valor_gr_ml);

    if (title === "Ingrediente") {
      const newItems = { ...items };
      newItems.ingredients = [...newItems.ingredients, data];
      newItems.results.cost_by_unit = 0;
      newItems.results.utility = 0;
      setItems(newItems);
    } else if (title === "Empaque") {
      const newItems = { ...items };
      newItems.packages = [...items.packages, data];
      newItems.results.cost_by_unit = 0;
      newItems.results.utility = 0;

      setItems(newItems);
    }

    inputNProducts.current.value = 0;
    inputPrice.current.value = 0;
    //e.target.reset();
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
            placeholder="Azucar"
            id="nombre"
            name="nombre"
            type="text"
            required
          />
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
            placeholder="Libra"
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
            placeholder="500"
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
            placeholder="1735"
            id="cantidad_usada"
            name="cantidad_usada"
            type="number"
            required
          />
          <p className="text-sm text-red-500 inactive">
            Por favor rellene este campo
          </p>
        </div>

        <button
          onClick={() => toggle(".create-ingredient", "active")}
          className="add-button border-blue px-4 py-2 rounded-lg"
        >
          Agregar
        </button>
        <button
          onClick={() => toggle(".create-ingredient", "active")}
          className="close-btn font-black"
        >
          X
        </button>
      </form>
    </div>
  );
}
