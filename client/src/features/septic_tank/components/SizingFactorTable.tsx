import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { type SizingFactorRow } from "@/features/septic_tank/constants/sizingFactor";
import { sizingFactor as data } from "@/features/septic_tank/constants/sizingFactor";

const columnHelper = createColumnHelper<SizingFactorRow>();

const columns = [
  {
    header: "Number of years between desludging",
    columns: [
      columnHelper.accessor("years", {
        header: "",
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: "Sizing Factor Value at Ambient Temperature",
    columns: [
      columnHelper.accessor("tempAbove20", {
        header: "> 20°C (throughout year)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("tempAbove10", {
        header: "> 10°C (throughout year)",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("tempBelow10", {
        header: "< 10°C (during winter)",
        cell: (info) => info.getValue(),
      }),
    ],
  },
];

const SizingFactorTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h3 className="my-2 font-semibold tracking-wider">
        Sizing Factor for determining volume for sludge storage
      </h3>

      <table className="border-collapse border w-full text-center">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-2"
                  colSpan={header.colSpan}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2 ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizingFactorTable;
