import { usePagination } from "@/hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type NumberedPaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onPageChange: (page: number) => void;
  cardsRef: React.RefObject<HTMLDivElement>;
};

function UiPagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  onPageChange,
  cardsRef,
}: NumberedPaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  const handlePageChange = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="aria-disabled:opacity-50 aria-disabled:pointer-events-none"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1)(e);
              cardsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page)(e);
                cardsRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className="aria-disabled:opacity-50 aria-disabled:pointer-events-none"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1)(e);
              cardsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default UiPagination;
