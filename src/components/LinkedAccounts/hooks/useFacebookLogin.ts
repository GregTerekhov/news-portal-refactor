import { useLogin } from 'react-facebook';

const useFacebookLogin = () => {
  const { login, status, isLoading, error } = useLogin();

  console.log(login, status, isLoading, error);

  const handleFacebookLogin = async () => {
    console.log('FacebookStatus', status);
    try {
      const response = await login({
        scope: 'fghjk@mail.com',
        // scope: value,
      });
      console.log('facebookResponseStatus', response.status);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    handleFacebookLogin,
    status,
    isLoading,
    error,
  };
};

export default useFacebookLogin;
