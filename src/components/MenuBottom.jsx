import React from "react";
import { AiFillGithub } from "react-icons/ai";

export default function MenuBottom() {
  return (
    <>
      Hire me:
      <br />
      <AiFillGithub className="inline" />{" "}
      <a href="https://github.com/tombohub/palettolithic" className="underline">
        {" "}
        Github
      </a>
    </>
  );
}
