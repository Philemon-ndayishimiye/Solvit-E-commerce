import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import type { Login } from "../type/Login";
import api from "../app/api/api";
import { useNavigate } from "react-router-dom";

export default function LoginRight() {
  const Navigate = useNavigate();
  const [form, setForm] = useState<Login>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello world");

    try {
      const res = await api.post<Login>(
        "https://dummyjson.com/auth/login",
        {
          username: form.username,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        Navigate("/");
      } else {
        alert("incorrect username or password");
      }

      const Token = res.data.accessToken;
      localStorage.setItem("token", JSON.stringify(Token));
    } catch (error: any) {
      alert(`incorrect credentials`);
      console.error("Login error:", error.response?.data || error.message);
      console.error(error);
    }
  };

  return (
    <div className=" px-5">
      <div className="mb-[40px]">
        <h1 className="font-bold text-3xl py-3">Log in</h1>
        <p className="text-xm">Please fill your Information Below </p>
      </div>

      <div>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div className="border-b w-[320px]">
            <Input
              type="text"
              placeholder="Exapmle@gmail.com"
              name="username"
              onChange={handleChange}
              value={form.username}
              variant="primary"
            />
          </div>

          <div className="border-b w-[320px]">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={form.password}
              variant="primary"
            />
          </div>

          <div className="py-[20px]">
            <Button label="Login" variant="primary" type="submit" />
          </div>
        </form>
      </div>

      <div className="flex gap-[80px] my-[20px]">
        <div className="flex gap-4">
          <input type="checkbox" />
          <h1>Remember me</h1>
        </div>

        <div>
          <h1 className="text-sm cursor-pointer border-b">Forgot Password</h1>
        </div>
      </div>
    </div>
  );
}
