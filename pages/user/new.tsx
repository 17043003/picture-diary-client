import type { NextPage } from 'next';
import { postFetcher } from '../../util/fetcher';
import { Path, useForm, UseFormRegister, SubmitHandler } from 'react-hook-form';

const NewUserPage: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormValues>({ criteriaMode: 'all' });

  const submitHandler: SubmitHandler<IFormValues> = async (data) => {
    const res = await postFetcher(
      '/api/user',
      `name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(
        data.email,
      )}&password=${encodeURIComponent(data.password)}`,
    ).catch(() => ({ status: '500' }));

    if (res.status === '200') {
      alert(`ユーザ：${data.name}を登録しました`);
    } else {
      alert(`ユーザ：${data.name}の登録に失敗しました`);
    }
  };

  const passwordReq = {
    required: true,
    minLength: 8,
  };

  return (
    <div>
      <h1 className='text-4xl font-bold m-4'>新規ユーザ作成</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <p className='ml-40 font-bold text-red-600'>
          {errors.name?.type === 'required' && '入力が必須です'}
        </p>
        <InputForm
          label='name'
          placeholder=''
          register={register}
          required={{ required: true }}
        ></InputForm>
        <p className='ml-40 font-bold text-red-600'>
          {errors.email?.type === 'required' && '入力が必須です'}
        </p>
        <InputForm
          label='email'
          placeholder='xxxxxx@xxxx.co.jp'
          register={register}
          required={{ required: true }}
        ></InputForm>
        <p className='ml-40 font-bold text-red-600'>
          {errors.password?.type === 'required' && '入力が必須です'}
        </p>
        <p className='ml-40 font-bold text-red-600'>
          {errors.password?.type === 'minLength' && '8文字以上で入力してください'}
        </p>
        <InputForm
          label='password'
          placeholder=''
          register={register}
          required={passwordReq}
        ></InputForm>
        <div>
          <input
            type='submit'
            value='登録'
            className='text-2xl font-bold bg-red-200 rounded-lg px-2 py-1 mx-6 my-2 hover:bg-red-400 cursor-pointer'
          />
        </div>
      </form>
    </div>
  );
};

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

type InputProps = {
  label: Path<IFormValues>;
  placeholder: string;
  register: UseFormRegister<IFormValues>;
  required: any;
};

const InputForm = ({ label, placeholder, register, required }: InputProps) => (
  <div className='flex ml-6 mb-4'>
    <label className='flex-none w-32 text-right'>{label.toUpperCase()}:</label>
    <input
      {...register(label, { ...required })}
      type={label}
      placeholder={placeholder}
      className='border-gray-300 shadow-md px-2 py-1 mb-4 flex-none w-64'
    />
  </div>
);

export default NewUserPage;
