import { useEffect } from "react";
import EditIcon from "../../Icons/EditIcon";
import TrashIcon from "../../Icons/TrashIcon";
import "./IngredientItem.css";

export default function ListItem({ item, deleteItemLocalStorage, title }) {
  function editItem() {
    console.log("edit");
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
              {" "}
              Valor por {title == "Ingredientes" ? "gr/ml" : "empaque/unidad"}:
            </td>
            <td>$ {item ? item.valor_gr_ml : "Sin valor"}</td>
          </tr>
          <tr>
            <td>Cantidada usada:</td>
            <td>{item ? item.cantidad_usada : "Sin cantidad"} gr</td>
          </tr>
          <tr>
            <td>
              <b>Valor total:</b>
            </td>
            <td>
              <b>{item ? item.valor_total : "Sin cantidad"}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between">
        <button onClick={() => deleteItemLocalStorage(item.nombre)}>
          <TrashIcon fill="#e63946" />
        </button>
        <button onClick={editItem}>
          <EditIcon className="inline" fill="#06d6a0" />
        </button>
      </div>
    </article>
  );
}
