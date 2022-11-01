/* eslint-disable @typescript-eslint/no-empty-function */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import {
  FileListProvider,
  ComponentListProvider,
  SidebarStatusProvider,
} from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FileListProvider>
      <ComponentListProvider>
        <SidebarStatusProvider>
          <Component {...pageProps} />
        </SidebarStatusProvider>
      </ComponentListProvider>
    </FileListProvider>
  );
}

export default MyApp;
