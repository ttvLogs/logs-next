import { NextPage } from "next";
import type { AppProps } from "next/app";
import type { Page } from "./page";
import { ComponentType, ReactElement, ReactNode } from "react";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }

  export type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
    layout?: ComponentType;
  };

  export type ChannelsResponse = {
    ChannelID: string;
  };

  export type Props = AppProps & {
    Component: Page;
  };
}
