import { Request } from "express";

interface FastFeetReq extends Request {
  userId: number;
}

export interface Pagination {
  page: number;
}

export default FastFeetReq;
