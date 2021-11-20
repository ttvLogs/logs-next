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
    data: log[];
    next?: string;
  };

  type log = {
    name: string;
    color: string;
    message: string;
    timestamp: Date;
    badges: JSON | null;
    deleted: boolean;
  };

  type globalBTTVResponse = {
    id: string;
    code: string;
    imageType: string;
    userId: string;
  }[];

  type channelBTTVResponse = {
    id: string;
    bots: string[];
    avatar: string;
    channelEmotes: {
      id: string;
      code: string;
      imageType: string;
      userId: string;
    }[];
    sharedEmotes: {
      id: string;
      code: string;
      imageType: string;
      user: {
        id: string;
        name: string;
        displayName: string;
        providerId: string;
      };
    }[];
  };

  type channelFFZResponse = {
    id: number;
    user: { id: number; name: string; displayName: string };
    code: string;
    images: { "1x": string; "2x": string; "3x": string };
    imageType: string;
  }[];

  type channel7TVResponse = {
    id: string;
    name: string;
    owner: {
      id: string;
      twitch_id: string;
      login: string;
      display_name: string;
      role: {
        id: string;
        name: string;
        position: number;
        color: number;
        allowed: number;
        denied: number;
        default: boolean;
      };
    };
    visibility: number;
    visibility_simple?: string[];
    mime: string;
    status: number;
    tags?: string[];
    width: number[];
    height: number[];
    urls: string[][];
  }[];
}
