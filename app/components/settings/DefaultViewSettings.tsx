import { useContext } from "react";
import { ViewContext } from "../../context/ViewContext";
import type { Views } from "~/types/Views";
import { updateView } from "~/services/localStorageService";

export default function DefaultViewSettings() {
  const setView = useContext(ViewContext).setView;

  function handleBtnClick(value: Views) {
    setView(value);
    updateView(value);
  }

  return (
    <section>
      <h4>Default View</h4>
      <p>Choose your default tasks view</p>
      <div>
        <button onClick={() => handleBtnClick("List")}>List View</button>
        <button onClick={() => handleBtnClick("Board")}>Board View</button>
      </div>
    </section>
  );
}
