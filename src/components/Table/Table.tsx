"use client"

import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type TTableProps = {
  headers: string[]
  values: (string | React.ReactNode)[][]
}

function TableComponent(
    {
        headers,
        values
    }: TTableProps
) {
  return (
    <ShadTable>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className="text-white text-lg">{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {values.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex} className="font-semibold text-white">{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </ShadTable>
  )
}

export {
  TableComponent as Table
}