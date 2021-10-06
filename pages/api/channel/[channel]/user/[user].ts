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
      `SELECT Name, Message, Emotes, Color, Badges, Timestamp, isDeleted FROM ${table} WHERE SenderID = ${req.query.channel} ORDER BY Timestamp DESC;`,
    )
    .then((response) => {
      const parsed = response.map((item: ttvUser_116738112) => {
        item.Message = item.Message.replaceAll("<", "&lt;").replaceAll(
          ">",
          "&gt;",
        );
        const urlRegex =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        item.Message = item.Message.replace(
          urlRegex,
          '<a href="$&" target="_blank" rel="noopener norefferer" className="mr-1">$&</a>',
        );
        if (item.Emotes !== null) {
          const emotesArray: emote[] = JSON.parse(item.Emotes);
          emotesArray.forEach((emote: emote) => {
            item.Message = item.Message.replaceAll(
              emote.code,
              `<img src='https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0' alt='sub emote' className='mx-1'/>`,
            );
          });
        }
        console.log(item);
        return {
          name: item.Name,
          color: item.Color === null ? "white" : item.Color,
          message: item.Message,
          timestamp: item.Timestamp,
          badges: item.Badges === null ? null : JSON.parse(item.Badges),
          deleted: item.isDeleted === 0 ? false : true,
        };
      });
      res.status(200).json({ type: "ok", sender: "api", data: parsed });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ type: "error", sender: "prisma", info: error });
    });
}
