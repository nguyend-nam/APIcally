/* eslint-disable @typescript-eslint/no-empty-function */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { FileListProvider, ComponentListProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FileListProvider>
      <ComponentListProvider>
        <Component {...pageProps} />
      </ComponentListProvider>
    </FileListProvider>
  );
}

export default MyApp;
