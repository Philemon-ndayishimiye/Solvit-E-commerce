import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="w-full bg-amber-300 py-5">
      <div>
        <Link to="/category">
          <h1>Categories</h1>
        </Link>
      </div>
    </div>
  );
}
