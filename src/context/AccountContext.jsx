import { createContext, useContext, useState } from "react";
import { initAccount } from "../data/init_account";

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(initAccount)

  const addAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  }

  const accountContextValue = {
    accounts,
    addAccount,
  };

  return (
    <AccountContext.Provider value={accountContextValue}>
      {children}
    </AccountContext.Provider>
  );
};
