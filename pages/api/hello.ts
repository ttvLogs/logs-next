// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  // request example with prisma
  await prisma.channels.findMany().then((response) => {
    res.status(200).json({ data: response });
  });
}
