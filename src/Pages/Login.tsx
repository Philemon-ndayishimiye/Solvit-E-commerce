import React from "react";
import Navigation from "../Component/Navigation";
import LoginRight from "../Component/LoginRight";
import LeftLogin from "../Component/LeftLogin";

export default function Login() {
  return (
    <div>
      <div>
        <Navigation />
      </div>

      <div className="flex justify-center mt-[50px]">
        <div className="border flex gap-[20px] ">
          <div>
            <LeftLogin />
          </div>
          <div>
            <LoginRight />
          </div>
        </div>
      </div>
    </div>
  );
}
