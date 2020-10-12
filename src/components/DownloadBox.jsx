import React from "react";

import _ from "lodash";
import { Link } from "react-router-dom";

function DownloadBox(props) {
  if (_.isEmpty(props.palette)) return "lokoko";
  return (
    <div>
      <Link to="/tailwindcss">
        <button className="hover:font-semibold text-lg text-gray-800">
          Download for Tailwindcss
        </button>
      </Link>
    </div>
  );
}

export default DownloadBox;
