import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MenuItem } from "@mui/material";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../../../redux/services/order";

const AdminOrders = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  const [deleteOrder] = useDeleteOrderMutation();

  // Delete order
  const handleDeleteOrder = useCallback(
    async (id: string) => {
      try {
        await deleteOrder(id).unwrap();
        alert("Order Deleted Successfully");
      } catch (error) {
        console.error("Order delete error:", error);
      }
    },
    [deleteOrder]
  );

  const confirmDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      handleDeleteOrder(id);
    }
  };

  // Table Columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Order ID",
        size: 180,
      },
      {
        accessorKey: "userId.name",
        header: "Customer",
        size: 150,
        Cell: ({ row }) => (
          <span>{row.original.userId?.name || "N/A"}</span>
        ),
      },
      {
        accessorKey: "orderStatus",
        header: "Status",
        size: 100,
        Cell: ({ cell }) => {
          const val = cell.getValue();
          return (
            <span
              style={{
                color:
                  val === "DELIVERED"
                    ? "lightgreen"
                    : val === "CANCELLED"
                    ? "red"
                    : "#fc9b04",
                fontWeight: "bold",
              }}
            >
              {val}
            </span>
          );
        },
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment",
        size: 100,
      },
      {
        accessorKey: "totalAmount",
        header: "Total (₹)",
        size: 100,
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        size: 120,
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data?.orders || [],
    enableRowActions: true,
    positionActionsColumn: "last",

    renderTopToolbarCustomActions: () => (
      <h3 style={{ marginLeft: "10px" }}>All Orders</h3>
    ),

    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="view"
        onClick={() =>
          navigate(`/dashboard/order-details/${row.original._id}`)
        }
      >
        View
      </MenuItem>,

      <MenuItem
        key="delete"
        onClick={() => confirmDelete(row.original._id)}
        sx={{ color: "red" }}
      >
        Delete
      </MenuItem>,
    ],
  });

  if (isLoading) return <p>Loading orders…</p>;
  if (isError) return <p>Error loading orders.</p>;

  return <MaterialReactTable table={table} />;
};

export default AdminOrders;
