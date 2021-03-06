import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { withOptions } from "../middleware/withOptions";
import { withPassport } from "../middleware/withPassport";
import { XWordRequest } from "../../../types";
import { registerLocalUser } from "../resolvers/user";

const registerHandler = nextConnect<XWordRequest, NextApiResponse>(
  withOptions()
);
registerHandler.use(withPassport);

registerHandler.post(async (req, res) => {
  const { username, password, displayName } = req.body;
  const user = await registerLocalUser(username, password, displayName);
  req.logIn(user, (err) => {
    if (err) throw err;

    res.status(201).end();
  });
});

export default registerHandler;
