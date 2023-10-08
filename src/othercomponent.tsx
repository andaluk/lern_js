import { useContext } from 'react';
import { UserContext } from './userstore';

export const OtherComponent = () => {
  // Имя пользователя доступно везде
  const [userName] = useContext(UserContext);
  return <div>{userName ? `Имя пользователя: ${userName}` : ''}</div>;
};
