import type {
  GetUserResponse,
  LoginResponse,
  SignupResponse,
  LoginUserInput,
  CreateNewUserInput,
} from "./types";

import { useMutation, useQuery } from "@apollo/client/react";
import Cookies from "js-cookie";

import { GET_USER } from "./queries";
import { LOGIN_USER, CREATE_USER } from "./mutations";

export const useGetUser = (id: string) => {
  return useQuery<GetUserResponse>(GET_USER, {
    variables: { id },
    skip: !id,
  });
};

export const useLogin = () => {
  const [loginMutation, { data, loading, error }] =
    useMutation<LoginResponse>(LOGIN_USER);

  const login = async (loginUserInput: LoginUserInput) => {
    const result = await loginMutation({
      variables: { loginUserInput },
    });

    if (result.data?.loginUser?.accessToken) {
      Cookies.set("accessToken", result.data.loginUser.accessToken);
      Cookies.set("refreshToken", result.data.loginUser.refreshToken);
    }

    return result;
  };

  return { login, data, loading, error };
};

export const useSignup = () => {
  const [signupMutation, { data, loading, error }] =
    useMutation<SignupResponse>(CREATE_USER);

  const signup = async (CreateNewUserInput: CreateNewUserInput) => {
    const result = await signupMutation({
      variables: { CreateNewUserInput },
    });

    if (result.data?.createUser?.accessToken) {
      Cookies.set("accessToken", result.data.createUser.accessToken);
      Cookies.set("refreshToken", result.data.createUser.refreshToken);
    }

    return result;
  };

  return { signup, data, loading, error };
};
