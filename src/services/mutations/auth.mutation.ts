import { UpdatePasswordType } from './../../types/index';
import axios from "../axios";
import urls from "../urls";
import { useMutation } from "@tanstack/react-query";

import { LoginType, ResetPasswordType, SignUpType } from "@/types/auth";

export const useLoginMutation = () =>
  useMutation(["login"], async (login: LoginType) => {
    const res = await axios.post(urls.loginUrl, login);
    return res.data;
  });

export const useSignupMutation = () =>
  useMutation(["signup"], async (signup: SignUpType) => {
    const res = await axios.post(urls.signupUrl, signup);
    return res.data;
  });

export const useChangePasswordMutation = () =>
  useMutation(["changePassword"], async (data: UpdatePasswordType) => {
    const res = await axios.post(urls.changePasswordUrl, data);
    return res.data;
  });

export const useResetPasswordMutation = () => 
  useMutation(["resetPassword"], async (data: {newPassword: string}) => {
    const res = await axios.post(urls.resetPassword, data);
    return res.data;
  });

export const useRequestResetPasswordMutation = () =>
  useMutation(['requestResetPassword'], async (data: any) => {
    const res = await axios.post(urls.requestResetPassword, data);
    return res.data;
  })