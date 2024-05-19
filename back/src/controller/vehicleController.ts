import { Request, Response } from "express";
import prisma from "../db";

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: { customerVehicles: true, trackings: true },
    });
    res.json(vehicles);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { modelo, placa, userId } = req.body;
    const vehicle = await prisma.vehicle.create({
      data: { modelo, placa, userId },
    });
    res.json(vehicle);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { modelo, placa, userId } = req.body;
    const vehicle = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: { modelo, placa, userId },
    });
    res.json(vehicle);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.vehicle.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
