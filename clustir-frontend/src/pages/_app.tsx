import { NotificationProvider } from "@/components/Notification";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      {" "}
      <Component {...pageProps} />
    </NotificationProvider>
  );
}
