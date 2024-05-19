import { Request, Response } from "express";
import prisma from "../db";

export const getAllTrackings = async (req: Request, res: Response) => {
  try {
    const trackings = await prisma.tracking.findMany({
      include: { vehicle: true, customer: true },
    });
    res.json(trackings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const createTracking = async (req: Request, res: Response) => {
  try {
    const { vehicleId, latitude, longitude, userId, customerId } = req.body;
    const tracking = await prisma.tracking.create({
      data: { vehicleId, latitude, longitude, userId, customerId },
    });
    res.json(tracking);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const updateTracking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { latitude, longitude, userId, customerId } = req.body;
    const tracking = await prisma.tracking.update({
      where: { id: Number(id) },
      data: { latitude, longitude, userId, customerId },
    });
    res.json(tracking);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const deleteTracking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.tracking.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Tracking deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
