'use client';

import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useLoginMutation, useMeQuery } from '@/features/auth/authApiSlice';
import { LoginRequest } from '@/features/auth/types';
import { redirect, useRouter } from 'next/navigation';
import { InputField } from '@/widgets/ui/InputField';

const LoginPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const [login] = useLoginMutation();
  const { isSuccess } = useMeQuery();

  useEffect(() => {
    if (isSuccess) {
      redirect('/admin/items');
    }
  }, [isSuccess]);

  const onSubmit = async (values: LoginRequest) => {
    try {
      await login(values).unwrap();
      router.push('/admin/items');
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
        <span className="text-lg font-semibold text-center">Авторизация</span>

        <InputField control={control} name="username" label="Логин" placeholder="Введите логин" />

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
