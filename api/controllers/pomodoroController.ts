import { Request, Response } from "express";
import * as pomodoroService from "../services/pomodoroService";

export const startPomodoro = async (req: Request, res: Response) => {
  try {
    const { tacheId } = req.params;
    const pomodoro = await pomodoroService.startPomodoro(parseInt(tacheId));
    res.json(pomodoro);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error starting Pomodoro", error: error.message });
  }
};

export const completePomodoro = async (req: Request, res: Response) => {
  try {
    const { pomodoroId } = req.params;
    const pomodoro = await pomodoroService.completePomodoro(
      parseInt(pomodoroId)
    );
    res.json(pomodoro);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error completing Pomodoro", error: error.message });
  }
};

export const getPomodorosForTache = async (req: Request, res: Response) => {
  try {
    const { tacheId } = req.params;
    const pomodoros = await pomodoroService.getPomodorosForTache(
      parseInt(tacheId)
    );
    res.json(pomodoros);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching Pomodoros", error: error.message });
  }
};

export const getCurrentPomodoro = async (req: Request, res: Response) => {
  try {
    const { tacheId } = req.params;
    const pomodoro = await pomodoroService.getCurrentPomodoro(
      parseInt(tacheId)
    );
    res.json(pomodoro);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching current Pomodoro",
      error: error.message,
    });
  }
};
