import LoginPage from "./login";
import { useEffect, useState } from "react";

const Home = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  useEffect(() => setIsSSR(false), []);

  return !isSSR && <LoginPage />;
};

export default Home;
