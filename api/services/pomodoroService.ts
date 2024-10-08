import Tache from "../models/tache";
import Pomodoro from "../models/pomodoro";
import { Op } from "sequelize";

const WORK_DURATION = 25 * 60 * 1000;
const SHORT_BREAK_DURATION = 5 * 60 * 1000;
const LONG_BREAK_DURATION = 20 * 60 * 1000;

export const startPomodoro = async (tacheId: number) => {
  const tache = await Tache.findByPk(tacheId, { include: ["pomodoros"] });
  if (!tache) throw new Error("Tache not found");

  if (tache.completedPomodoros >= tache.estimatedPomodoros) {
    throw new Error(
      "All estimated Pomodoros for this task have been completed"
    );
  }

  const pomodoroCount = tache.pomodoros?.length || 0;
  let type: "work" | "short_break" | "long_break" = "work";

  if (pomodoroCount > 0 && pomodoroCount % 4 === 0) {
    type = "long_break";
  } else if (pomodoroCount > 0) {
    type = "short_break";
  }

  const startTime = new Date();
  const endTime = new Date(
    startTime.getTime() +
      (type === "work"
        ? WORK_DURATION
        : type === "short_break"
        ? SHORT_BREAK_DURATION
        : LONG_BREAK_DURATION)
  );

  const pomodoro = await Pomodoro.create({
    tacheId,
    startTime,
    endTime,
    type,
  });

  return pomodoro;
};

export const completePomodoro = async (pomodoroId: number) => {
  const pomodoro = await Pomodoro.findByPk(pomodoroId, {
    include: [{ model: Tache, as: "Tache" }],
  });
  if (!pomodoro) throw new Error("Pomodoro not found");

  await pomodoro.update({ completed: true, endTime: new Date() });

  if (pomodoro.type === "work" && pomodoro.Tache) {
    await pomodoro.Tache.increment("completedPomodoros");
    if (
      pomodoro.Tache.completedPomodoros >= pomodoro.Tache.estimatedPomodoros
    ) {
      await pomodoro.Tache.update({ status: "done" });
    } else if (pomodoro.Tache.status === "todo") {
      await pomodoro.Tache.update({ status: "in_progress" });
    }
  }

  return pomodoro;
};

export const getPomodorosForTache = async (tacheId: number) => {
  return Pomodoro.findAll({
    where: { tacheId },
    order: [["startTime", "ASC"]],
  });
};

export const getCurrentPomodoro = async (tacheId: number) => {
  return Pomodoro.findOne({
    where: {
      tacheId,
      completed: false,
      endTime: { [Op.gt]: new Date() },
    },
  });
};
