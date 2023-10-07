import express from "express";

declare module "express-session" {
  interface SessionData {
    uid: number;
    user_id: string;
    isLogined: boolean;
    login_type: string;
    social_id: number;
    token: string;
  }
}
