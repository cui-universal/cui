import React, { useState } from "react";
import { Pagination } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function PaginationSection() {
  const [currentPage, setCurrentPage] = useState(3);
  const [totalPages, setTotalPages] = useState(12);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Pagination</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Smart page navigation with ellipsis compression for large datasets and boundary controls.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex flex-col items-center justify-center bg-secondary/15 gap-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <p className="text-xs text-muted-foreground font-mono">
            Active: <span className="font-bold text-primary">Page {currentPage}</span> of {totalPages}
          </p>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-pgTotal" className="font-semibold text-muted-foreground block mb-1">Total Pages</label>
            <PlaygroundSelect
              id="ctl-pgTotal"
              value={String(totalPages)}
              onValueChange={(p) => {
                const num = Number(p);
                setTotalPages(num);
                if (currentPage > num) setCurrentPage(num);
              }}
              options={[
                { value: "5", label: "5 Pages" },
                { value: "10", label: "10 Pages" },
                { value: "12", label: "12 Pages (Default)" },
                { value: "20", label: "20 Pages" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-pgJump" className="font-semibold text-muted-foreground block mb-1">Jump to Page</label>
            <PlaygroundSelect
              id="ctl-pgJump"
              value={String(currentPage)}
              onValueChange={(p) => setCurrentPage(Number(p))}
              options={Array.from({ length: Math.min(totalPages, 10) }, (_, i) => ({
                value: String(i + 1),
                label: `Page ${i + 1}`,
              }))}
            />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-pagination"
        reactCode={`import { useState } from "react";
import { Pagination } from "@cui-universal/react";

export function PaginationDemo() {
  const [page, setPage] = useState(${currentPage});

  return (
    <Pagination
      currentPage={page}
      totalPages={${totalPages}}
      onPageChange={setPage}
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { Pagination } from "@cui-universal/vue";

const page = ref(${currentPage});
</script>

<template>
  <Pagination
    v-model="page"
    :total-pages="${totalPages}"
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
