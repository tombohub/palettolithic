import React from "react";

import _ from "lodash";
import { Link } from "react-router-dom";

function DownloadBox(props) {
  if (_.isEmpty(props.palette)) return "lokoko";
  return (
    <div>
      <Link to="/tailwindcss">Tailwindcss</Link>
    </div>
  );
}

export default DownloadBox;
