import { useState, useCallback } from 'react';

const VALID_USERNAMES = ['Abhishek', 'Adarsh'];
const VALID_PASSWORD = '12345';

export function useAdminGate() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const validateCredentials = useCallback((username: string, password: string): boolean => {
    const isValid = VALID_USERNAMES.includes(username) && password === VALID_PASSWORD;
    if (isValid) {
      setIsAuthorized(true);
    }
    return isValid;
  }, []);

  const clearAuthorization = useCallback(() => {
    setIsAuthorized(false);
  }, []);

  return {
    isAuthorized,
    validateCredentials,
    clearAuthorization,
  };
}
