import type { Request, Response } from "express";

export const meController = {
  getMe: (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
  },
};
