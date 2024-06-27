import React from "react";

export default function Table() {
  return (
    <div className="border-blue p-4 rounded-lg item-container mb-4">
      <h3 className="p-1 title">Total de ingredientes</h3>
      <table className="w-full">
        <tbody>
          <tr>
            <td>Unidad de medida:</td>
            <td>{ingredient.unidad_medida}</td>
          </tr>
          <tr>
            <td>Unidad de compra:</td>
            <td>{ingredient.unidad_compra} gr</td>
          </tr>
          <tr>
            <td>Valor de compra:</td>
            <td>$ {ingredient.valor_compra}</td>
          </tr>
          <tr>
            <td>Valor por gr/ml:</td>
            <td>$ {ingredient.valor_gramo}</td>
          </tr>
          <tr>
            <td>Cantidada usada:</td>
            <td>{ingredient.cantidad_usada} gr</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between">
        <button onClick={() => deleteItemLocalStorage(ingredient.nombre)}>
          <TrashIcon fill="#e63946" />
        </button>
        <button onClick={editItem}>
          <EditIcon className="inline" fill="#06d6a0" />
        </button>
      </div>
    </div>
  );
}
