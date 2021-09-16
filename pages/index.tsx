import Head from "next/head";
import { GetServerSideProps } from "next";
import { useCallback, useMemo, useState, useEffect } from "react";
import prisma from "../prisma/prisma";
import { classNames } from "../utils";
import type { ReactElement } from "react";
import MainLayout from "../layouts/Layout";
import DownshiftComponent from "../components/Downshift";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

export default function Home({ ...props }) {
  const [channelWarning, setChannelWarning] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (props.response !== null) {
      props.response.map((item: ChannelsResponse) => {
        if (!items.includes(item.ChannelID)) {
          setItems((items) => [...items, item.ChannelID]);
        }
      });
    }
  }, [props.response, items]);

  const handleSelectedItemChange = useCallback(
    (selectedItem) => {
      setSelectedItem(selectedItem);
      if (!items.includes(selectedItem)) setChannelWarning(true);
      else setChannelWarning(false);
    },
    [items],
  );

  return (
    <div>
      <Head>
        <title>Logs | Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col mx-4">
        <section className="flex flex-col w-full sm:w-[60%] sm:mx-auto my-6 sm:my-8 space-y-4">
          <div className="flex space-x-4">
            <DownshiftComponent
              className="w-full sm:w-[70%] relative flex items-center space-x-4"
              items={items}
              handleSelectedItemChange={handleSelectedItemChange}
            />
            <ExclamationCircleIcon
              className={classNames(
                channelWarning ? "opacity-100" : "opacity-0",
                `w-6 h-6 text-red-500 transform transition 
                duration-300 mt-auto mb-2`,
              )}
            >
              <span className="sr-only">Channel not found in the database</span>
            </ExclamationCircleIcon>
          </div>
        </section>
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps: GetServerSideProps = async () => {
  return await prisma.channels
    .findMany({
      where: { Availiable: 1 },
      select: { ChannelID: true },
    })
    .then((response) => {
      return { props: { response: response } };
    })
    .catch(() => {
      return { props: { response: null } };
    });
};
