import Head from "next/head";
import { GetServerSideProps } from "next";
import React, { useCallback, useState, useEffect, FormEvent } from "react";
import prisma from "../prisma/prisma";
import axios from "axios";
import { classNames } from "../utils";
import { Alert } from "../components";
import type { ReactElement } from "react";
import MainLayout from "../layouts/Layout";
import { LoadingSpin } from "../assets/icons";
import DownshiftComponent from "../components/Downshift";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import LogsContent from "../components/LogsContent";
import ppSnow from "../assets/images/ppSnow.gif";
import Image from "next/image";

export default function Home({ ...props }) {
  const [channelWarning, setChannelWarning] = useState(false);
  const [nameWarning, setNameWarning] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [axiosLoading, setAxiosLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [ssrError, setSsrError] = useState(false);
  const [alert, setAlert] = useState<AlertList>(null);
  const [content, setContent] = useState<ContentProps | null>(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (ssrError) {
      setAlert({
        variant: "error",
        title: "Error while loading channels",
      });
    }
  }, [ssrError]);

  useEffect(() => {
    if (nameWarning) {
      setNameWarning(false);
    }
  }, [name]);

  useEffect(() => {
    if (props.response !== null) {
      setItems(props.response);
    } else {
      setSsrError(true);
    }
  }, [props]);

  const handleSelectedItemChange = useCallback(
    (selectedItem) => {
      if (!items.includes(selectedItem)) setChannelWarning(true);
      else {
        setSelectedItem(selectedItem);
        setChannelWarning(false);
      }
    },
    [items],
  );

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContent(null);
    if (selectedItem !== null && selectedItem !== "" && name !== "") {
      try {
        setAxiosLoading(true);
        const channelData = await axios({
          method: "get",
          url: `https://api.twitch.tv/helix/users?login=${selectedItem}`,
          responseType: "json",
          headers: {
            "Client-Id": process.env.NEXT_PUBLIC_CLIENTID,
            Authorization: process.env.NEXT_PUBLIC_BEARER,
          },
        });
        if (channelData.data.data.length == 0) {
          setAxiosLoading(false);
          setChannelWarning(true);
        }

        const userData = await axios({
          method: "get",
          url: `https://api.twitch.tv/helix/users?login=${name}`,
          responseType: "json",
          headers: {
            "Client-Id": process.env.NEXT_PUBLIC_CLIENTID,
            Authorization: process.env.NEXT_PUBLIC_BEARER,
          },
        });
        if (userData.data.data.length == 0) {
          setAxiosLoading(false);
          setNameWarning(true);
        }

        if (
          userData.data.data.length !== 0 &&
          channelData.data.data.length !== 0
        ) {
          setAxiosLoading(false);
          setContent({
            channel: userData.data.data[0].id,
            user: channelData.data.data[0].id,
          });
        }
      } catch (e) {
        setAxiosLoading(false);
        setAlert({
          variant: "error",
          title: "Error while getting IDs from Twitch API",
        });
      }
    } else {
      if (selectedItem === null || selectedItem === "") {
        setChannelWarning(true);
      }
      if (name === "") {
        setNameWarning(true);
      }
    }
  };

  console.log(process.env.NEXT_PUBLIC_CLIENTID, process.env.NEXT_PUBLIC_BEARER)

  return (
    <div>
      <Head>
        <title>Logs | Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        className="flex flex-col mx-4"
        onSubmit={(event) => handleFormSubmit(event)}
      >
        {alert && (
          <Alert type={alert.variant} text={alert.text} title={alert.title} />
        )}
        <div className="flex flex-col w-full sm:w-[60%] sm:mx-auto my-6 sm:my-8 space-y-8">
          <div className="flex space-x-4 relative">
            <DownshiftComponent
              className="w-full relative flex items-center space-x-4"
              items={items}
              handleSelectedItemChange={handleSelectedItemChange}
            />
            <div className="absolute bottom-1.5 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className={classNames(
                  channelWarning ? "opacity-100" : "opacity-0",
                  `w-6 h-6 text-red-500 transform transition duration-300`,
                )}
              >
                <span className="sr-only">
                  Channel not found in the database.
                </span>
              </ExclamationCircleIcon>
            </div>
          </div>
          <div className="w-full flex space-x-4">
            <div className="w-full relative">
              <label
                htmlFor="userSelect"
                className="block text-sm font-medium text-gray-700 dark:text-gray-100 uppercase"
              >
                Choose a user:
              </label>
              <input
                id="userSelect"
                placeholder="trefis"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                className="bg-white w-full dark:bg-[#333333] border border-gray-300 rounded-md mt-1
              shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 dark:placeholder-gray-300
            focus:ring-primary focus:border-primary sm:text-sm transition duration-200 dark:border-gray-500"
              />
              <div className="absolute bottom-1.5 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  className={classNames(
                    nameWarning ? "opacity-100" : "opacity-0",
                    `w-6 h-6 text-red-500 transform transition duration-300`,
                  )}
                >
                  <span className="sr-only">
                    Channel not found in the database.
                  </span>
                </ExclamationCircleIcon>
              </div>
            </div>
          </div>
          <div className="w-full flex">
            <button
              className="w-full md:w-max ml-auto flex items-center justify-center px-5 py-2 border border-transparent 
              text-base font-medium rounded-md text-white bg-primary hover:bg-violet-600 disabled:cursor-wait
              focus:outline-dashed focus:outline-primary duration-200 transition uppercase 
              focus:outline-offset-2 disabled:opacity-50 focus:outline-2"
              disabled={axiosLoading}
              type="submit"
            >
              {axiosLoading && (
                <LoadingSpin className="w-5 h-5 animate-spin mr-2" />
              )}
              <span>Load logs</span>
            </button>
          </div>
        </div>
        <div className="mx-auto w-full sm:w-[80%]">
          {content ? (
            <LogsContent channel={content.channel} user={content.user} />
          ) : (
            <section className="bg-gray-50 dark:bg-darkGrey rounded-lg h-full border dark:border-gray-500 mb-6 flex flex-col space-y-2 p-4">
              <div className="my-auto mx-auto text-center max-w-4xl">
                <p className="text-lg">
                  Hello, this is the supa first &Beta;eta version of{" "}
                  <span className="font-medium text-primary">ttvLogs</span>
                </p>
                <p className="mt-4 border-b pb-2 mb-2">
                  The application is not so well tested at the moment so you may
                  encounter some bugs
                </p>
                <ul className="text-left list-inside list-disc">
                  <li>
                    If you found any bugs, problems or errors please create a{" "}
                    <a
                      href={"https://github.com/ttvLogs/logs-next/issues"}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      className="text-primaryLight hover:text-primary hover:underline"
                    >
                      Github Issue
                    </a>{" "}
                    or just contact me at{" "}
                    <a
                      href={"https://t.me/trefis"}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      className="text-primaryLight hover:text-primary hover:underline"
                    >
                      telegram
                    </a>{" "}
                    or{" "}
                    <a
                      href={"https://twitch.tv/trefis"}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      className="text-primaryLight hover:text-primary hover:underline"
                    >
                      twitch
                    </a>{" "}
                    pm/offline chat and I&apos;ll take a look at your problem
                    ASAP
                  </li>
                  <li>
                    If you want to be added to the list of channels you
                    can contact me by the links above
                  </li>
                  <li>
                    You can also always improve this application by creating a{" "}
                    <a
                      href={"https://github.com/ttvLogs/logs-next/pulls"}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      className="text-primaryLight hover:text-primary hover:underline"
                    >
                      Github Pull Request
                    </a>
                  </li>
                  <li>
                    And you can track the application&apos;s progress on the todo
                    list in{" "}
                    <a
                      href={"https://github.com/ttvLogs/logs-next/projects/1"}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      className="text-primaryLight hover:text-primary hover:underline"
                    >
                      here
                    </a>
                  </li>
                </ul>
                <div className="mt-4">
                  <Image src={ppSnow} alt="peepo snow" />
                </div>
              </div>
            </section>
          )}
        </div>
      </form>
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps: GetServerSideProps = async () => {
  return await prisma.channels
    .findMany({
      where: { Availiable: 1 },
      select: { Name: true },
      orderBy: { Name: "asc" },
    })
    .then((response) => {
      const channelIDs = [];
      response.map((item: ChannelsResponse) => channelIDs.push(item.Name));
      return { props: { response: channelIDs } };
    })
    .catch((e) => {
      return {
        props: { response: null, value: { type: "error", message: e.message } },
      };
    });
};
