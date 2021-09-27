import { FC, useEffect } from "react";
import useSWR from "swr";
import { Loading } from "../components";
import { classNames } from "../utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const LogsContent: FC<ContentProps> = ({ channel, user }) => {
  const { data, error } = useSWR(
    `/api/channel/${channel}/user/${user}`,
    fetcher,
  );

  if (!data) {
    return <Loading />;
  }

  return <div>123</div>;
};

export default LogsContent;
