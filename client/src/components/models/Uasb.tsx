import TextHeader from "@/components/static/TextHeader";

import Diagram from "@/features/uasb/components/Diagram";

import NumberInput from "../ui/NumberInput";
import { useState } from "react";

const UasbSimulation = () => {
  const [loadingRate, setLoadingRate] = useState("");
  const [tkn, setTkn] = useState("45.30");

  return (
    <section className="w-full h-full flex flex-col gap-2">
      <TextHeader
        text="UASB (Upflow Anaerobic Sludge Blanket) Reactor"
        withLine
      />
      <div className="flex flex-col gap-4 text-balance xl:w-[90%]">
        <p className="text-balance leading-relaxed">
          The Upflow Anaerobic Sludge Blanket (UASB) reactor is a high-rate
          anaerobic treatment system where wastewater flows upward through a
          dense blanket of microbial sludge. This process efficiently converts
          organic pollutants into biogas (methane and carbon dioxide), making it
          a sustainable treatment option.
        </p>
      </div>

      <NumberInput
        label="Loading Rate"
        value={loadingRate}
        unit="m³/day"
        onChange={setLoadingRate}
        decimals={0}
        max={500}
        disabled={false}
      />

      <NumberInput
        label="Total Kjeldahl Nitrogen (TKN)"
        value={tkn}
        unit="mg/L"
        onChange={setTkn}
        disabled={false}
      />

      <Diagram />
    </section>
  );
};

export default UasbSimulation;
