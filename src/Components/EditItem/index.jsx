import toggle from "../../Utils/toggle";
import "../CreateItem/CreateItem.css";

export default function EditItem({ items, itemToEdit, setItems }) {
  function editItem(e) {
    e.preventDefault();
    toggle(".edit-ingredient", "active");
    const newItems = { ...items };

    if (itemToEdit.type === "Ingrediente") {
      const data = Object.fromEntries(new FormData(e.target));
      data.valor_gr_ml = Number(data.valor_compra) / Number(data.unidad_compra);
      data.valor_total = Number(data.cantidad_usada) * Number(data.valor_gr_ml);
      const newItem = { ...itemToEdit, ...data };
      const actualItem = newItems.ingredients.findIndex(
        (item) => item.id === itemToEdit.id
      );

      newItems.ingredients[actualItem] = newItem;

      return setItems(newItems);
    }
    if (itemToEdit.type === "Empaque") {
      const data = Object.fromEntries(new FormData(e.target));
      data.valor_gr_ml = (
        Number(data.valor_compra) / Number(data.unidad_compra)
      ).toFixed(2);
      data.valor_total = (
        Number(data.cantidad_usada) * Number(data.valor_gr_ml)
      ).toFixed(2);
      const newItem = { ...itemToEdit, ...data };
      const actualItem = newItems.packages.findIndex(
        (item) => item.id === itemToEdit.id
      );

      newItems.packages[actualItem] = newItem;
      e.target.reset();
      return setItems(newItems);
    }
  }

  return (
    <div className="edit-ingredient ">
      <form
        onSubmit={(e) => {
          editItem(e);
        }}
        id="create-form"
        className="relative create-form min-w-42 border-blue rounded p-8 flex flex-col gap-4"
      >
        <h3 className="text-xl">
          {itemToEdit?.type === "Ingrediente"
            ? "Editar Ingrediente"
            : "Editar Empaque"}
        </h3>
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
            defaultValue={itemToEdit?.nombre}
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
            defaultValue={itemToEdit?.unidad_medida}
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
            defaultValue={itemToEdit?.unidad_compra}
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
            defaultValue={itemToEdit?.valor_compra}
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
            placeholder="200"
            id="cantidad_usada"
            name="cantidad_usada"
            type="number"
            defaultValue={itemToEdit?.cantidad_usada}
            required
          />
          <p className="text-sm text-red-500 inactive">
            Por favor rellene este campo
          </p>
        </div>

        <button className="add-button border-blue px-4 py-2 rounded-lg">
          Editar
        </button>
        <button
          type="button"
          onClick={() => toggle(".edit-ingredient", "active")}
          className="close-btn font-black"
        >
          X
        </button>
      </form>
    </div>
  );
}
