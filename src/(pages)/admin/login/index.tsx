'use client';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { InputField } from '@/widgets/ui/TextField';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import { LoginRequest } from '@/features/auth/types';
import { useCreateBrandMutation } from '@/features/brands/brandsApiSlice';

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  });

  const [login, { isLoading }] = useLoginMutation();
  // const [createBrand] = useCreateBrandMutation();

  const onSubmit = async (values: LoginRequest) => {
    try {
      const data = await login(values).unwrap();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[400px] rounded-2xl bg-white shadow-2xl px-6 py-8 flex flex-col"
      >
        {/*<button*/}
        {/*  onClick={() => {*/}
        {/*    const file = new File(["test content"], "test.txt", { type: "text/plain" });*/}
        {/*    createBrand({ name: 'Vlad', desc: 'test', image: file });*/}
        {/*  }}*/}
        {/*  className="mt-4 rounded-md bg-green-600 text-white py-2 px-4 hover:bg-green-700 transition cursor-pointer"*/}
        {/*>*/}
        {/*  Создать бренд*/}
        {/*</button>*/}
        <span className="text-lg font-semibold text-center">
          Авторизация
        </span>

        <InputField
          control={control}
          name="username"
          label="Логин"
          placeholder="Введите логин"
        />

        <InputField
          control={control}
          name="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
        />

        <button
          type="submit"
          className="mt-2 rounded-md bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

const loginSchema = yup.object({
  username: yup.string().required('обязательное поле'),
  password: yup.string().required('обязательное поле'),
});

export default LoginPage;
