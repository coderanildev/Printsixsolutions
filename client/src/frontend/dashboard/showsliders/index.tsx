import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { MenuItem } from "@mui/material";


import {
  useGetAllSlidersQuery,
  useDeleteSliderMutation,
} from "../../../redux/services/slider";

const ShowSliders: React.FC = () => {
  const navigate = useNavigate();

  // Fetch sliders
  const { data: slidersData, isLoading, isError } = useGetAllSlidersQuery();
console.log('data check',slidersData);
  // Delete slider
  const [deleteSlider] = useDeleteSliderMutation();

  const handleDeleteClick = useCallback(
    async (id: string) => {
      try {
        await deleteSlider(id).unwrap();
      } catch (error) {
        console.error("Delete slider error: ", error);
      }
    },
    [deleteSlider]
  );

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      handleDeleteClick(id);
    }
  };

  // TABLE COLUMNS — FOR SLIDER
 const columns = useMemo<MRT_ColumnDef<any>[]>(
  () => [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "shortDescription",
      header: "Short Description",  
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "imageUrl",
      header: "Image",
      Cell: ({ cell }) => {
        const imageUrl = cell.getValue();
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Slider"
            style={{
              width: 90,
              height: 60,
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          <span style={{ color: "gray", fontStyle: "italic" }}>No Image</span>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Active",
      Cell: ({ cell }) =>
        cell.getValue() ? (
          <span style={{ color: "green", fontWeight: "bold" }}>Yes</span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>No</span>
        ),
    },
  ],
  []
);


  // MATERIAL TABLE
  const table = useMaterialReactTable({
    columns,
    data: slidersData?.sliders || [],
    enableRowActions: true,
    positionActionsColumn: "last",

    renderTopToolbarCustomActions: () => (
      <button
        onClick={() => navigate("/dashboard/add-slider")}
        className="add-new-button"
      >
        + Add New Slider
      </button>
    ),

    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="edit"
        onClick={() => navigate(`/dashboard/edit-slider/${row.original._id}`)}
      >
        Edit
      </MenuItem>,

      <MenuItem
        key="delete"
        onClick={() => handleDeleteConfirmation(row.original._id)}
      >
        Delete
      </MenuItem>,
    ],
  });

  // LOADING / ERROR
  if (isLoading) return <p>Loading sliders...</p>;
  if (isError) return <p>Error fetching sliders.</p>;

  return <MaterialReactTable table={table} />;
};

export default ShowSliders;
