import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useGuestSession = () => {
  const router = useRouter();

  useEffect(() => {
    const sessionId = localStorage.getItem('guest_session');
    const expireTime = localStorage.getItem('guest_expiry');

    if (sessionId && expireTime) {
      const interval = setInterval(() => {
        if (Date.now() > Number(expireTime)) {
          localStorage.removeItem('guest_session');
          localStorage.removeItem('guest_expiry');
          router.push('/home'); 
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [router]);
};
