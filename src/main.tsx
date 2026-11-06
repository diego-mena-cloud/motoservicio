import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header/Header";
import Form from "./Orders/Form/Form";
import Map from "./Orders/Map/Map";
import List from "./Orders/List/List";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <Header />
    </div>
    <div>
      <Form />
    </div>
    <div>
      <Map />
    </div>
    <div>
      <List />
    </div>
  </StrictMode>,
);
