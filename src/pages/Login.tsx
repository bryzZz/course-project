/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Input, Loading } from "components/UI";
import { useUserStore } from "hooks";
import { LoginData } from "types/api";

export const Login: React.FC = () => {
  const { login, status } = useUserStore((state) => ({
    login: state.login,
    status: state.status,
  }));

  const { register, handleSubmit } = useForm<LoginData>();

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <div className="flex flex-col items-center gap-4 px-4 pt-40">
      <h2 className="text-2xl font-semibold">Login</h2>
      <div className="w-full max-w-md overflow-hidden rounded-2xl py-6 px-8 shadow-2xl">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="a@mail.ru"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="******"
            {...register("password", { required: true })}
          />
          <button className="btn w-full rounded-full" type="submit">
            <Loading loading={status === "loading"} type="dots">
              Log In
            </Loading>
          </button>
        </form>
      </div>
      <Link to="/register" className="link-hover link">
        Don&apos;t have an account?
      </Link>
    </div>
  );
};
