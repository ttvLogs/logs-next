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

  type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
    layout?: ComponentType;
  };

  type ChannelsResponse = {
    Name: string;
  };

  type Props = AppProps & {
    Component: Page;
  };

  type AlertList = {
    title: string;
    text?: string;
    variant: "ok" | "error" | "warning";
  } | null;

  type AlertProps = {
    title: string;
    text?: string;
    type: "ok" | "error" | "warning";
  };

  type ContentProps = {
    channel: string;
    user: name;
  };

  type emote = {
    id: string;
    startIndex: number;
    endIndex: number;
    code: string;
  };

  type logsResponse = {
    type: "ok" | "error";
    sender: string;
    data: any;
  };
}
