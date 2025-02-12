import { IronSessionOptions } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      email: string;
      name?: string;
    };
  }
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_SECRET ?? "",
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};