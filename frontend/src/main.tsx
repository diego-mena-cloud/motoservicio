import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header/Header";
import Form from "./Orders/Form/Form";
import Map from "./Orders/Map/Map";
import List from "./Orders/List/List";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased selection:bg-orange-100">
      <Header />
      <main className="flex-1 w-full max-w-md mx-auto px-5 py-6 flex flex-col gap-6 pb-24">
        <Form />
        <Map />
        <List />
      </main>
    </div>
  </StrictMode>,
);
