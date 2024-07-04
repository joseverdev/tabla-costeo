import EditIcon from "../../Icons/EditIcon";
import TrashIcon from "../../Icons/TrashIcon";
import "./IngredientItem.css";
import toggle from "../../Utils/toggle";

export default function ListItem({
  item,
  setItemToEdit,
  deleteItemLocalStorage,
  titleList,
}) {
  function removeZeros(num) {
    let number = String(num);
    let res = number.slice(-3);

    if (res === ".00") {
      return number.slice(0, -3);
    }

    return number;
  }

  return (
    <article className="border-blue p-4 rounded-lg item-container mb-4">
      <h3 className="p-1 title">{item ? item.nombre : "Sin titulo"}</h3>
      <table className="w-full mb-2">
        <tbody>
          <tr>
            <td>Unidad de medida:</td>
            <td>{item ? item.unidad_medida : "Sin unidad"}</td>
          </tr>
          <tr>
            <td>Unidad de compra:</td>
            <td>{item ? item.unidad_compra : "Sin"} gr</td>
          </tr>
          <tr>
            <td>Valor de compra:</td>
            <td>$ {item ? item.valor_compra : "Sin valor"}</td>
          </tr>
          <tr>
            <td>
              Valor por {titleList == "Ingredientes" ? "gr/ml" : "unidad"}:
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
        <button onClick={() => deleteItemLocalStorage(item.nombre)}>
          <TrashIcon fill="#e63946" />
        </button>
        <button
          onClick={() => {
            toggle(".edit-ingredient", "active");
            setItemToEdit(item);
            // console.log(itemToEdit);
          }}
        >
          <EditIcon className="inline" fill="#06d6a0" />
        </button>
      </div>
    </article>
  );
}
