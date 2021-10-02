// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ttvUser_116738112 } from ".prisma/client";
import prisma from "../../../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const table = "ttvLogs.ttvUser_" + req.query.user;

  await prisma
    .$queryRawUnsafe<ttvUser_116738112[]>(
      `SELECT Name, Message, Emotes, Color, Badges, Timestamp FROM ${table} WHERE SenderID = ${req.query.channel}`,
    )
    .then((response) => {
      const parsed = response.map((item: ttvUser_116738112) => {
        if (item.Emotes !== null) {
          const emotesArray: emote[] = JSON.parse(item.Emotes);
          emotesArray.forEach((emote: emote) => {
            item.Message = item.Message.replaceAll(
              emote.code,
              `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0" alt="${emote.code}" className="w-6 h-6"/> `,
            );
          });
        }
        return {
          name: item.Name,
          color: item.Color,
          message: item.Message,
          timestamp: item.Timestamp,
          badges: item.Badges === null ? "" : JSON.parse(item.Badges),
        };
      });
      res.status(200).json({ type: "ok", sender: "api", data: parsed });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ type: "error", sender: "prisma", info: error });
    });
}
