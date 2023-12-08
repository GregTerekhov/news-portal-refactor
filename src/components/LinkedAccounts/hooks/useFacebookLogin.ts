import { useLogin } from 'react-facebook';

const useFacebookLogin = () => {
  const { login, status, isLoading, error } = useLogin();

  const handleFacebookLogin = async () => {
    console.log('FacebookStatus', status);
    try {
      const response = await login({
        scope: 'flibustier1981@gmail.com',
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
