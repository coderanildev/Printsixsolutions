import React, { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

interface PaginateProps {
  totalPages: number;
}

  const Paginate: React.FC<PaginateProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(isNaN(page) || page < 1 ? 1 : page);
  }, [searchParams]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      next.set("page", value.toString());
      return next;
    });
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              borderColor: "white",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default Paginate;
