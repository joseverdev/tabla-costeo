import DownIcon from "../../Icons/DownIcon";
import toggle from "../../Utils/toggle";
import "./Ingredientes.css";

export default function ContainerList({ children, title }) {
  return (
    <>
      <div className="ingredient-container">
        <h2 className="text-xl mb-4">
          <button
            className="flex m-auto items-center"
            onClick={() => {
              toggle(`.${title}`, "inactive");
              toggle(`.down-icon-${title}`, "rotate");
            }}
          >
            <DownIcon
              className={`down-icon-${title} inline mr-1`}
              fill="#00adb5"
            />
            {title}
          </button>
        </h2>
        <section className={`list-items m-4 ${title}`}>{children}</section>
      </div>
    </>
  );
}
