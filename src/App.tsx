import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages";
import NotFound from "./pages/404";
import Lookup from "./pages/lookup";
import AddressLookup from "./pages/lookup/address";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="lookup" element={<Lookup />}>
              <Route path=":address" element={<AddressLookup />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
