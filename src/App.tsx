import React from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Имя:
        <input
          className={errors.username ? 'invalid' : ''}
          type='text'
          placeholder='Имя пользователя'
          {...register('username', {
            required: {
              value: true,
              message: 'Поле обязательно.',
            },
            minLength: {
              value: 5,
              message: 'Не менее 5 символов',
            },
            maxLength: {
              value: 20,
              message: 'Не более 20 символов',
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: 'Только английские буквы и цифры',
            },
          })}
        />
        {errors.username && errors.username.message && (
          <p>{errors.username.message.toString()}</p>
        )}
      </label>
      <label>
        Пароль:
        <input
          className={errors.password ? 'invalid' : ''}
          type='password'
          placeholder='Пароль'
          {...register('password', {
            required: {
              value: true,
              message: 'Пароль обязателен.',
            },
            pattern: {
              value: /^[a-z0-9_\-*]+$/,
              message:
                'Только цифры, маленькие английские буквы и символы "_","-","*"',
            },
          })}
        />
        {errors.password && errors.password.message && (
          <p>{errors.password.message.toString()}</p>
        )}
      </label>
      <button type='submit'>Вход</button>
    </form>
  );
}

export default App;
