import { Routes, Route } from "react-router-dom";
import {
  Welcome,
  Home,
  ModelSimulation,
  About,
  SimulationRecords,
  SimulationResult,
  SavedSimulationRecord,
} from "@/components/pages";
import AppLayout from "@/app/AppLayout";
import PageNotFound from "@/app/PageNotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route element={<AppLayout />}>
        <Route path="/model" index element={<Home />} />
        <Route path="/model/:name" element={<ModelSimulation />} />
        <Route path="/model/:name/result/:id" element={<SimulationResult />} />
        <Route path="/about" element={<About />} />
        <Route path="/records" element={<SimulationRecords />}>
          <Route path="/records/:id" element={<SavedSimulationRecord />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
