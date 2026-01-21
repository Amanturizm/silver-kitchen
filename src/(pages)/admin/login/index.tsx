'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import { LoginRequest } from '@/features/auth/types';
import { useRouter } from 'next/navigation';
import { InputField } from '@/widgets/ui/InputField';
import { toast, Toaster } from 'sonner';

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
      const err = error as { data?: { message?: string } | string };
      const message =
        typeof err.data === 'string'
          ? err.data
          : err.data?.message || 'Ошибка авторизации';
      toast.error(message, { position: 'bottom-right' });
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Silver Kitchen
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl bg-white shadow-2xl px-6 py-8 flex flex-col space-y-1"
          >
            <h2 className="text-xl font-semibold text-center mb-6">
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
              className="mt-2 rounded-lg bg-blue-600 text-white py-2 text-base font-medium hover:bg-blue-700 active:bg-blue-800 focus:outline-none transition-colors cursor-pointer"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const loginSchema = yup.object({
  username: yup.string().required('обязательное поле'),
  password: yup.string().required('обязательное поле'),
});

export default LoginPage;
