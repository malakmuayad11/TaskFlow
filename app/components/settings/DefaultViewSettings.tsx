import { useContext } from "react";
import { ViewContext } from "../../context/ViewContext";

export default function DefaultViewSettings() {
  const setView = useContext(ViewContext).setView;

  return (
    <section>
      <h4>Default View</h4>
      <p>Choose your default tasks view</p>
      <div>
        <button onClick={() => setView("List")}>List View</button>
        <button onClick={() => setView("Board")}>Board View</button>
      </div>
    </section>
  );
}
