import React, { useState } from "react";
import { Pagination } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function PaginationSection() {
  const [currentPage, setCurrentPage] = useState(3);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Pagination</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Smart page navigation with ellipsis compression for large datasets and boundary controls.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-6 shadow-sm">
        <div className="text-center space-y-4">
          <Pagination
            currentPage={currentPage}
            totalPages={12}
            onPageChange={setCurrentPage}
          />
          <p className="text-xs text-muted-foreground font-mono">
            Active: <span className="font-bold text-primary">Page {currentPage}</span> of 12
          </p>
        </div>
      </div>

      <CodeBlock
        id="code-pagination"
        reactCode={`import { useState } from "react";
import { Pagination } from "@cui-universal/react";

export function PaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { Pagination } from "@cui-universal/vue";

const page = ref(1);
</script>

<template>
  <Pagination
    v-model="page"
    :total-pages="10"
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="Pagination"
        anatomy={["Pagination", "PaginationContent", "PaginationItem", "PaginationButton"]}
        props={[
          {
            name: "currentPage / v-model",
            type: "number",
            default: "1",
            description: "1-indexed active page number.",
          },
          {
            name: "totalPages",
            type: "number",
            default: "1",
            description: "Total page count calculated from total items.",
          },
          {
            name: "onPageChange",
            type: "(page: number) => void",
            default: "undefined",
            description: "Callback fired when a page button or navigation control is clicked.",
          },
        ]}
        accessibility={{
          aria: [
            "Encapsulated in a <nav role='navigation' aria-label='pagination'> landmark.",
            "Active page button marks aria-current='page'.",
          ],
        }}
      />
    </div>
  );
}
