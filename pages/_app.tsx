/* eslint-disable @typescript-eslint/no-empty-function */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import {
  FileListProvider,
  ComponentListProvider,
  SidebarStatusProvider,
} from "../context";
import NProgressHandler from "../components/NProgressHandler/NprogressHandler";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FileListProvider>
      <ComponentListProvider>
        <SidebarStatusProvider>
          <NProgressHandler />
          <Component {...pageProps} />
        </SidebarStatusProvider>
      </ComponentListProvider>
    </FileListProvider>
  );
}

export default MyApp;
