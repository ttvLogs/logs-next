import { format } from "date-fns";
import React, { FC, useCallback, useEffect, useState, MouseEvent } from "react";
import parse from "html-react-parser";
import { classNames } from "../utils";
import { Alert } from "../components";
import { Loading } from "../components";
import axios, { AxiosResponse } from "axios";
import { LoadingSpin } from "../assets/icons";

export const LogsContent: FC<ContentProps> = ({ channel, user }) => {
  const [data, setData] = useState<log[]>();
  const [next, setNext] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`/api/channel/${channel}/user/${user}`)
      .then((response: AxiosResponse<logsResponse>) => {
        setLoading(false);
        if (response.data.type == "ok") {
          setData(response.data.data);
          setNext(response.data?.next);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [channel, user]);

  const onLoadMoreClick = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    setLoadMore(true);
    await axios
      .get(next)
      .then((response: AxiosResponse<logsResponse>) => {
        setLoadMore(false);
        setNext(response.data?.next);
        setData((data) => [...data, ...response.data.data]);
      })
      .catch(() => {
        setLoadMore(false);
      });
  };

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Alert type="error" title="Error while fetching data from the API" />
    );
  }

  return (
    <>
      {data && data.length > 0 ? (
        <div>
          <section className="bg-gray-50 dark:bg-darkGrey rounded-lg h-full border dark:border-gray-500 mb-6 flex flex-col space-y-2 px-4 py-2">
            {data.map((item: log, index: number) => {
              const date = new Date(item.timestamp);
              return (
                <p className="flex space-x-2 flex-shrink-0" key={index}>
                  <span className="truncate flex-shrink-0 text-gray-600 dark:text-gray-400">
                    {format(date, "yyyy-MM-dd, hh:mm:ss")}
                  </span>
                  <span
                    className="font-medium flex"
                    style={{ color: item.color }}
                  >
                    {item.name}:
                  </span>
                  <span
                    className={classNames(
                      item.deleted ? "text-gray-500" : "",
                      "flex",
                      "flex-wrap",
                    )}
                  >
                    {parse(item.message)}
                  </span>
                </p>
              );
            })}
          </section>
          {next && (
            <div className="w-full flex mb-6">
              <button
                className="w-full bg-gray-50 dark:bg-darkGrey rounded-lg border 
              dark:border-gray-500 px-5 py-2 uppercase font-medium disabled:opacity-50
              focus:outline-primary duration-200 transition focus:outline-offset-2
              hover:opacity-80 flex items-center justify-center"
                disabled={loadMore}
                onClick={(event) => onLoadMoreClick(event)}
              >
                {loadMore && (
                  <LoadingSpin className="w-5 h-5 animate-spin mr-2" />
                )}
                <span>Load more</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <section className="bg-gray-50 dark:bg-darkGrey rounded-lg h-32 border dark:border-gray-500 mb-6 flex flex-col space-y-2 px-4 py-2">
          <p className="m-auto">No logs found :(</p>
        </section>
      )}
    </>
  );
};

export default LogsContent;
