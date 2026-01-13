'use client';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import { LoginRequest } from '@/features/auth/types';
import { useRouter } from 'next/navigation';
import { InputField } from '@/widgets/ui/InputField';

const LoginPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const [login] = useLoginMutation();

  const onSubmit = async (values: LoginRequest) => {
    try {
      await login(values).unwrap();
      router.push('/admin/items');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Silver Kitchen
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Панель администратора</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl bg-white shadow-2xl px-4 py-6 sm:px-6 sm:py-8 flex flex-col space-y-1"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">
            Авторизация
          </h2>

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
            className="mt-6 sm:mt-8 rounded-lg bg-blue-600 text-white py-3 sm:py-2.5 text-sm sm:text-base font-medium hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer touch-manipulation"
          >
            Войти
          </button>
        </form>

        <p className="mt-4 text-center text-xs sm:text-sm text-gray-500">
          Защищенная зона. Только для авторизованных пользователей.
        </p>
      </div>
    </div>
  );
};

const loginSchema = yup.object({
  username: yup.string().required('обязательное поле'),
  password: yup.string().required('обязательное поле'),
});

export default LoginPage;
