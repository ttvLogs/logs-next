// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ttvUser_116738112 } from ".prisma/client";
import prisma from "../../../../../prisma/prisma";
import axios, { AxiosResponse } from "axios";

export const ignoredWords = ["7tv", "betterttv", "emote", "app"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const table = "ttvLogs.ttvUser_" + req.query.user;

  // fetching BTTV & FFZ & 7TV APIs
  const globalBTTV: AxiosResponse<globalBTTVResponse> = await axios.get(
    "https://api.betterttv.net/3/cached/emotes/global",
  );

  const channelBTTV: AxiosResponse<channelBTTVResponse> = await axios.get(
    `https://api.betterttv.net/3/cached/users/twitch/${req.query.user}`,
  );

  const channelFFZ: AxiosResponse<channelFFZResponse> = await axios.get(
    `https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${req.query.user}`,
  );

  const channel7TV: AxiosResponse<channel7TVResponse> = await axios.get(
    `https://api.7tv.app/v2/users/${req.query.user}/emotes`,
  );

  await prisma
    .$queryRawUnsafe<ttvUser_116738112[]>(
      `SELECT ID, Name, Message, Emotes, Color, Badges, Timestamp, isDeleted FROM ${table} WHERE SenderID = ${
        req.query.channel
      } AND ${
        req.query.next ? `ID < ${req.query.next}` : "ID > 0"
      } ORDER BY Timestamp DESC LIMIT 250;`,
    )
    .then(async (response) => {
      const parsed = response.map((item: ttvUser_116738112) => {
        // html escape
        item.Message = item.Message.replaceAll("<", "&lt;").replaceAll(
          ">",
          "&gt;",
        );

        // wrap links into <a href="link"/> tag
        const urlRegex =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        item.Message = item.Message.replace(
          urlRegex,
          '<a href="$&" target="_blank" rel="noopener norefferer" className="mr-1">&nbsp;$&</a>',
        );

        // replace channel 7TV emotes
        if (channel7TV.data) {
          channel7TV.data.forEach((element) => {
            if (!ignoredWords.includes(element.name)) {
              let target: string | RegExp = "";
              try {
                target = new RegExp("\\b" + element.name + "\\b", "gi");
              } catch {
                target = element.name;
              }
              item.Message = item.Message.replaceAll(
                target,
                `<img src='https://cdn.7tv.app/emote/${element.id}/1x' alt='channel seventv emote' className='mx-1'/>`,
              );
            }
          });
        }

        // replace channel & shared BTTV emotes
        if (channelBTTV.data.channelEmotes) {
          channelBTTV.data.channelEmotes.forEach((element) => {
            if (!ignoredWords.includes(element.code)) {
              let target: string | RegExp = "";
              try {
                target = new RegExp("\\b" + element.code + "\\b", "gi");
              } catch {
                target = element.code;
              }
              item.Message = item.Message.replaceAll(
                target,
                `<img src='https://cdn.betterttv.net/emote/${element.id}/1x' alt='channel bttv emote' className='mx-1'/>`,
              );
            }
          });
          channelBTTV.data?.sharedEmotes.forEach((element) => {
            if (!ignoredWords.includes(element.code)) {
              let target: string | RegExp = "";
              try {
                target = new RegExp("\\b" + element.code + "\\b", "gi");
              } catch {
                target = element.code;
              }
              item.Message = item.Message.replaceAll(
                target,
                `<img src='https://cdn.betterttv.net/emote/${element.id}/1x' alt='channel bttv emote' className='mx-1'/>`,
              );
            }
          });
        }

        // replace twitch emotes
        if (item.Emotes !== null) {
          const emotesArray: emote[] = JSON.parse(item.Emotes);
          emotesArray.forEach((emote: emote) => {
            if (!ignoredWords.includes(emote.code)) {
              let target: string | RegExp = "";
              try {
                target = new RegExp("\\b" + emote.code + "\\b", "gi");
              } catch {
                target = emote.code;
              }
              if (item.Message.includes("&lt;3")) {
                item.Message = item.Message.replaceAll(
                  "&lt;3",
                  `<img src='https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0' alt='sub emote' className='mx-1' width='32'/>`,
                );
              } else {
                item.Message = item.Message.replaceAll(
                  target,
                  `<img src='https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0' alt='sub emote' className='mx-1' width='32'/>`,
                );
              }
            }
          });
        }

        // replace global BTTV emotes
        if (globalBTTV.data) {
          globalBTTV.data.forEach((element) => {
            if (!ignoredWords.includes(element.code)) {
              item.Message = item.Message.replaceAll(
                element.code,
                `<img src='https://cdn.betterttv.net/emote/${element.id}/1x' alt='global betterttv emote' className='mx-1'/>`,
              );
            }
          });
        }

        // replace channel FFZ emotes
        if (channelFFZ.data) {
          channelFFZ.data.forEach((element) => {
            if (!ignoredWords.includes(element.code)) {
              const target = new RegExp("\\b" + element.code + "\\b", "gi");
              item.Message = item.Message.replaceAll(
                target,
                `<img src='${element.images["1x"]}' alt='channel frankerfacez emote' className='mx-1'/>`,
              );
            }
          });
        }

        return {
          id: item.ID,
          name: item.Name,
          color: item.Color === null ? "white" : item.Color,
          message: item.Message,
          timestamp: item.Timestamp,
          badges: item.Badges === null ? null : JSON.parse(item.Badges),
          deleted: item.isDeleted === 0 ? false : true,
        };
      });

      res.status(200).json({
        type: "ok",
        sender: "api",
        data: parsed,
        next: `/api/channel/${req.query.channel}/user/${req.query.user}?next=${
          parsed[parsed.length - 1]?.id || 0
        }`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ type: "error", sender: "prisma", info: error });
    });
}
