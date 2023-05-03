import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./routes/home/home.components.jsx";
import Navigation from "./components/navigation-bar/navigation-bar.component.jsx";
import Authentication from "./routes/authentication/authentication.component.jsx";

const Shop = () => {
  return (
    <div>
      <h1> I am the Shop part of the Website</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;