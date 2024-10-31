/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// @ts-ignore: Unused import
import { onRequest } from "firebase-functions/v2/https";
// @ts-ignore: Unused import
import * as logger from "firebase-functions/logger";
import next from "next";

const isDev = process.env.NODE_ENV !== "production";
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

export const nextApp = onRequest(async (req, res) => {
  await app.prepare();
  handle(req, res);
});
