import { DataGrid } from "@mui/x-data-grid";
import "../styles/adminmain.css";
import { NavLink, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminTable({ column }) {
  const params = useLocation().pathname.split("/")[2];
  const { data, loading } = useFetch(`/${params}/getall${params}s`);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(data);
  }, [data]);

  const deleteRow = async (id) => {
    try {
      await toast.promise(
        axios.delete(`/${params}/delete${params}/${id}`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        {
          pending: "Deleting...",
          success: "Deleted successfully",
          error: "Unable to delete",
          loading: "Deleting...",
        }
      );
      setList(list.filter((ele) => ele._id !== id));
    } catch (error) {
      return error;
    }
  };

  const actionCol = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              deleteRow(params.row._id);
            }}
            className="btn del-btn"
          >
            delete
          </button>
        );
      },
    },
  ];

  return (
    <>
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <div className="dashboard-main-container">
          <div className="main-container-top">
            <h2>{params}s</h2>
            <NavLink to={`/dashboard/new${params}`} className="btn">
              Add New
            </NavLink>
          </div>
          <div style={{ height: 650, width: "100%" }}>
            <DataGrid
              rows={list}
              columns={column.concat(actionCol)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          </div>
        </div>
      )}
    </>
  );
}
