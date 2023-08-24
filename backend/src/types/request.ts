import { Request } from "express";

export interface RequestGeneric<T> extends Request {
  body: T;
}
