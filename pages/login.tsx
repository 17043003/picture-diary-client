import type { NextPage } from 'next';
import { useEffect } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Path, useForm, UseFormRegister, SubmitHandler } from 'react-hook-form';

const Login: NextPage = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormValues>({ criteriaMode: 'all' });

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies['token']) {
      router.replace('/user/mypage');
    }
  }, []);

  const handleFormSubmit: SubmitHandler<IFormValues> = async (data) => {
    const body: BodyInit = `email=${encodeURI(data.email)}&password=${encodeURI(data.password)}`;
    const headers = {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    const url = process.env.NEXT_PUBLIC_FRONT_BASEURL ?? 'http://localhost:3001';
    const jwt = await fetch(`${url}/api/login`, {
      method: 'POST',
      headers,
      body,
    }).then((v) => v.json());

    const expireMinutes = 60;
    setCookie(null, 'token', jwt?.token, {
      maxAge: expireMinutes * 60,
      path: '/',
    });

    if (jwt) {
      router.replace('/user/mypage');
    }
  };

  return (
    <div>
      <h1 className='font-bold text-4xl p-10 bg-gradient-to-r from-lime-200 to-lime-400'>
        ログイン
      </h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className='mt-10 mx-20'>
        <ErrorText type={errors.email?.type}></ErrorText>
        <LoginForm label='email' register={register} required></LoginForm>
        <ErrorText type={errors.password?.type}></ErrorText>
        <LoginForm label='password' register={register} required></LoginForm>
        <input
          type='submit'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 mt-4 rounded'
        />
      </form>
    </div>
  );
};

interface IFormValues {
  email: string;
  password: string;
}

type LoginProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

const LoginForm = ({ label, register, required }: LoginProps) => (
  <div className='flex ml-6 mb-4'>
    <label className='flex-none w-32 text-right font-bold underline'>{label.toUpperCase()}:</label>
    <input
      {...register(label, { required })}
      type={label}
      className='border-gray-300 shadow-md px-2 py-1 mb-4 flex-none w-64'
    />
  </div>
);

const ErrorText = ({ type }: { type: string | undefined }) => (
  <p className='ml-40 font-bold text-red-600'>{type === 'required' && '入力が必須です'}</p>
);

export default Login;
