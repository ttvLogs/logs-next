// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  let userId: string;
  let channelId: string;

  await axios({
    method: "get",
    url: `https://api.twitch.tv/helix/users?login=${req.query.channel}`,
    responseType: "json",
    headers: {
      "Client-Id": process.env.CLIENTID,
      Authorization: process.env.BEARER,
    },
  })
    .then(({ data }) => {
      if (data.data[0].id === undefined) {
        res.status(204).json({
          status: "ok",
          reason: "Channel ID is not found (undefined)",
        });
      } else {
        channelId = data.data[0].id;
      }
    })
    .catch(() => {
      res.status(404).json({
        status: "error",
        reason: "Error while loading channel data from twitch API",
      });
    });

  await axios({
    method: "get",
    url: `https://api.twitch.tv/helix/users?login=${req.query.user}`,
    responseType: "json",
    headers: {
      "Client-Id": process.env.CLIENTID,
      Authorization: process.env.BEARER,
    },
  })
    .then(({ data }) => {
      if (data.data[0].id === undefined) {
        res.status(204).json({
          status: "ok",
          reason: "User ID is not found (undefined)",
        });
      } else {
        userId = data.data[0].id;
      }
    })
    .catch(() => {
      res.status(404).json({
        status: "error",
        reason: "Error while loading user data from twitch API",
      });
    });

  // request example with prisma
  await prisma.channels.findMany().then((response) => {
    res.status(200).json({ data: `${req.query.channel} ${req.query.user}` });
  });
}
