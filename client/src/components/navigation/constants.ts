import { FileText, Info, Home } from "lucide-react";

const sidebarItems = [
  {
    id: 1,
    name: "Home",
    icon: Home,
    link: "/model",
  },
  {
    id: 2,
    name: "About",
    icon: Info,
    link: "/about",
  },
  {
    id: 3,
    name: "Records",
    icon: FileText,
    link: "/records",
  },
];

const modelItems = [
  {
    id: 1,
    name: "MBBR",
    link: "/model/mbbr",
  },
  {
    id: 2,
    name: "AD",
    link: "/model/ad",
  },
  {
    id: 3,
    name: "Septic Tank",
    link: "/model/septic-tank",
  },
  {
    id: 4,
    name: "UASB",
    link: "/model/uasb",
  },
];

export { sidebarItems, modelItems };
