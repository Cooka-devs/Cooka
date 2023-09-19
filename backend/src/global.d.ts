import express from "express";

declare module "express-session" {
  interface SessionData {
    uid: number;
    user_id: string;
    isLogined: boolean;
  }
}
