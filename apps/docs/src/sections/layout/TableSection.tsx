import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Badge,
} from "@cui/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TableSection() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Table</h1>
        <p className="text-muted-foreground text-sm mt-1">
          A responsive, semantic table component for displaying rich structured data with cell formatting.
        </p>
      </div>

      {/* Live Preview Card */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Recent Invoices</h3>
            <p className="text-xs text-muted-foreground">Monthly billing breakdown for cloud nodes.</p>
          </div>
          <Badge variant="outline" size="sm">4 Total Invoices</Badge>
        </div>

        <Table>
          <TableCaption>A list of recent payment invoices and billing status.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: "INV-001", name: "Sarah Connor", email: "sarah@sky.net", status: "Paid", method: "Credit Card", amount: "$250.00", variant: "success" as const },
              { id: "INV-002", name: "Neo Anderson", email: "neo@matrix.io", status: "Pending", method: "PayPal", amount: "$150.00", variant: "warning" as const },
              { id: "INV-003", name: "Rick Deckard", email: "rick@tyrell.corp", status: "Unpaid", method: "Bank Transfer", amount: "$350.00", variant: "destructive" as const },
              { id: "INV-004", name: "Ellen Ripley", email: "ripley@weyland.co", status: "Paid", method: "Credit Card", amount: "$450.00", variant: "success" as const },
            ].map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-mono text-xs font-semibold">{row.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold text-xs leading-none">{row.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{row.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={row.variant} size="xs">{row.status}</Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{row.method}</TableCell>
                <TableCell className="text-right font-mono text-xs font-bold">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Paid</TableCell>
              <TableCell className="text-right font-mono font-bold">$1,200.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Code Block */}
      <CodeBlock
        id="code-table"
        reactCode={`import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@cui/react";

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV-001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`}
        vueCode={`<script setup>
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@cui/vue";
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">INV-001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell class="text-right">$250.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>`}
      />

      <ComponentDocDetails
        componentName="Table"
        anatomy={[
          "Table",
          "TableHeader",
          "TableBody",
          "TableFooter",
          "TableRow",
          "TableHead",
          "TableCell",
          "TableCaption",
        ]}
        props={[
          {
            name: "className",
            type: "string",
            default: "undefined",
            description: "Additional CSS classes applied to table elements.",
          },
        ]}
        accessibility={{
          aria: [
            "Semantic HTML table elements (table, thead, tbody, tfoot, tr, th, td, caption).",
            "Automatic overflow wrapper ensures responsive horizontal scrolling on small screens.",
            "TableHead has scope='col' for screen reader tabular navigation.",
          ],
        }}
      />
    </div>
  );
}
