/* eslint-disable @typescript-eslint/no-empty-function */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { ComponentListProvider, SidebarStatusProvider } from "../context";
import NProgressHandler from "../components/NProgressHandler/NprogressHandler";
import { AuthProvider } from "../context/auth";
import { ParallaxProvider } from "react-scroll-parallax";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ParallaxProvider>
        <ComponentListProvider>
          <SidebarStatusProvider>
            <NProgressHandler />
            <Component {...pageProps} />
          </SidebarStatusProvider>
        </ComponentListProvider>
      </ParallaxProvider>
    </AuthProvider>
  );
}

export default MyApp;
