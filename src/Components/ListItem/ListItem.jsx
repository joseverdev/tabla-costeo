import EditIcon from "../../Icons/EditIcon";
import TrashIcon from "../../Icons/TrashIcon";
import "./IngredientItem.css";
import toggle from "../../Utils/toggle";
import removeZeros from "../../Utils/removeZeros";

export default function ListItem({
  item,
  setItemToEdit,
  deleteItemLocalStorage,
  titleList,
}) {
  return (
    <article className="border-blue p-4 rounded-lg item-container mb-4">
      <h3 className="p-1 title">{item ? item.nombre : "Sin titulo"}</h3>
      <table className="w-full mb-2">
        <tbody>
          <tr>
            <td>Compra en gr/ml:</td>
            <td>{item ? item.unidad_compra : "Sin"} gr</td>
          </tr>
          <tr>
            <td>Precio:</td>
            <td>$ {item ? item.valor_compra : "Sin valor"}</td>
          </tr>
          <tr>
            <td>
              Precio por {titleList == "Ingredientes" ? "gr/ml" : "unidad"}:
            </td>
            <td>$ {item ? item.valor_gr_ml : "Sin valor"}</td>
          </tr>
          <tr>
            <td>Cantidada usada:</td>
            <td>
              {item ? item.cantidad_usada : "Sin cantidad"}{" "}
              {titleList === "Ingredientes" ? "gr/ml" : ""}
            </td>
          </tr>
          <tr>
            <td>
              <b>Valor total:</b>
            </td>
            <td>
              <b>$ {item ? removeZeros(item.valor_total) : "Sin cantidad"}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between">
        <button
          className="border-none"
          onClick={() => deleteItemLocalStorage(item.nombre)}
        >
          <TrashIcon fill="#e63946" />
        </button>
        <button
          className="border-none"
          onClick={() => {
            toggle(".edit-ingredient", "active");
            setItemToEdit(item);
          }}
        >
          <EditIcon className="inline" fill="#06d6a0" />
        </button>
      </div>
    </article>
  );
}
