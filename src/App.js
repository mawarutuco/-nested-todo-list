import "./App.css";
import Index from "./ToDoList/Index";
import ChangeLanguage from "./i18n/ChangeLanguage";
import Usage from "./ToDoList/Usage";

function App() {
  return (
    <div
      style={{
        background: "#e0eae7",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <ChangeLanguage />
      <Index />
      <Usage />
    </div>
  );
}

export default App;
