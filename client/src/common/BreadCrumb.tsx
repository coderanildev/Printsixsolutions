import React from "react";
import { useLocation, Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { colors } from "@mui/material";

export default function BreadCrumb() {
  const location = useLocation();
  const pathArr = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="my-3">
      <ol className="breadcrumb m-0 p-0" style={{ background: "transparent" }}>
        <li className="" >
          <Link to="/" style={{color:"#fc9b04"}}>
            Home
          </Link>
        </li>
        {pathArr.map((item, index) => {
          const path = "/" + pathArr.slice(0, index + 1).join("/");
          const isLast = index === pathArr.length - 1;
          return (
            <li
              key={index}
              className={`${
                isLast ? "active text-white" : ""
              }`}
              aria-current={isLast ? "page" : undefined}
            >
              <ChevronRightIcon fontSize="small" className="mx-1 text-muted"  />
              {isLast ? (
                <span className="text-white text-capitalize">{item}</span>
              ) : (
                <Link
                  to={path}
                  className="text-decoration-none text-capitalize text-primary"
                >
                  {item}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
