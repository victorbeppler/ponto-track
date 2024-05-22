import { Request, Response } from "express";
import prisma from "../db";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: { customerVehicles: true, trackings: true },
    });
    res.json(customers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { nome, email, userId } = req.body;
    const customer = await prisma.customer.create({
      data: { nome, email, userId },
    });
    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, email, userId } = req.body;
    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: { nome, email, userId },
    });
    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customerId = Number(id);

    await prisma.tracking.deleteMany({
      where: { customerId },
    });

    const customerVehicles = await prisma.customerVehicle.findMany({
      where: { customerId },
      select: { vehicleId: true },
    });

    const vehicleIds = customerVehicles.map((cv) => cv.vehicleId);

    await prisma.tracking.deleteMany({
      where: { vehicleId: { in: vehicleIds } },
    });

    await prisma.customerVehicle.deleteMany({
      where: { vehicleId: { in: vehicleIds } },
    });

    await prisma.vehicle.deleteMany({
      where: { id: { in: vehicleIds } },
    });

    await prisma.customer.delete({
      where: { id: customerId },
    });

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
