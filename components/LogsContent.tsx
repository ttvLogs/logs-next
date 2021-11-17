import useSWR from "swr";
import { format } from "date-fns";
import React, { FC } from "react";
import parse from "html-react-parser";
import { classNames } from "../utils";
import { Alert } from "../components";
import { Loading } from "../components";

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
      {data.data.map((item: log, index: number) => {
        const date = new Date(item.timestamp);
        return (
          <p className="flex space-x-2 flex-shrink-0" key={index}>
            <span className="flex-nowrap truncate flex-shrink-0 text-gray-600 dark:text-gray-400">
              {format(date, "yyyy-MM-dd, hh:mm:ss")}
            </span>
            <span className="font-medium flex" style={{ color: item.color }}>
              {item.name}:
            </span>
            <span className={classNames(item.deleted ? "text-gray-500" : "", "flex")}>
              {parse(item.message)}
            </span>
          </p>
        );
      })}
    </section>
  );
};

export default LogsContent;
