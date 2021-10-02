import React, { FC, useEffect } from "react";
import useSWR from "swr";
import { Alert } from "../components";
import { Loading } from "../components";
import parse from "html-react-parser";
import { classNames } from "../utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const LogsContent: FC<ContentProps> = ({ channel, user }) => {
  const { data } = useSWR<logsResponse>(
    `/api/channel/${channel}/user/${user}`,
    fetcher,
  );

  if (!data) {
    return <Loading />;
  }

  if (data.type === "error") {
    return (
      <Alert type="error" title="Error while fetching data from the API" />
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-darkGrey rounded-lg h-full border dark:border-gray-500 mb-6 flex flex-col space-y-2 px-4 py-2">
      {data.data.map((item, index: number) => {
        return (
          <p className="flex space-x-2 flex-shrink-0" key={index}>
            <span className="flex-nowrap flex-shrink-0">
              {new Date(item.timestamp).toLocaleString()}
            </span>
            <span className="font-medium" style={{ color: item.color }}>
              {item.name}:
            </span>
            <span className="flex">{parse(item.message)}</span>
          </p>
        );
      })}
    </section>
  );
};

export default LogsContent;
