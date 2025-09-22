import { Routes, Route } from "react-router-dom";
import {
  Welcome,
  ModelSimulation,
  About,
  Documentation,
} from "@/components/pages";
import AppLayout from "@/app/AppLayout";
import PageNotFound from "@/app/PageNotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/model" element={<AppLayout />}>
        <Route path="/model/:name" element={<ModelSimulation />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/docs" element={<Documentation />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
