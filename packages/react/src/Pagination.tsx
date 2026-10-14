import * as React from "react";
import {
  paginationVariants,
  paginationContentVariants,
  paginationItemVariants,
  paginationButtonVariants,
  cn,
} from "@cui-universal/theme";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage = 1,
      totalPages = 1,
      onPageChange,
      className,
      showFirstLast = false,
    },
    ref
  ) => {
    const pages = React.useMemo(() => {
      const result: (number | "ellipsis")[] = [];
      const delta = 1;

      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) result.push(i);
        return result;
      }

      result.push(1);
      if (currentPage - delta > 2) {
        result.push("ellipsis");
      }

      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      for (let i = start; i <= end; i++) {
        result.push(i);
      }

      if (currentPage + delta < totalPages - 1) {
        result.push("ellipsis");
      }
      result.push(totalPages);

      return result;
    }, [currentPage, totalPages]);

    const setPage = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        if (onPageChange) onPageChange(page);
      }
    };

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="pagination"
        className={cn(paginationVariants(), className)}
      >
        <ul className={paginationContentVariants()}>
          <li className={paginationItemVariants()}>
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
              aria-label="Go to previous page"
              className={paginationButtonVariants({ disabled: currentPage <= 1 })}
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </button>
          </li>

          {pages.map((p, idx) => (
            <li key={idx} className={paginationItemVariants()}>
              {p === "ellipsis" ? (
                <span className="h-8 w-8 flex items-center justify-center text-muted-foreground select-none">
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setPage(p)}
                  aria-current={p === currentPage ? "page" : undefined}
                  className={paginationButtonVariants({ active: p === currentPage })}
                >
                  {p}
                </button>
              )}
            </li>
          ))}

          <li className={paginationItemVariants()}>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
              aria-label="Go to next page"
              className={paginationButtonVariants({ disabled: currentPage >= totalPages })}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </button>
          </li>
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";
