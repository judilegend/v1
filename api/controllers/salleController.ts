import * as salleService from "../services/salleService";

export const createSalle = async (req, res) => {
  try {
    const { name } = req.body;
    const salle = await salleService.createSalle(name);
    res.status(201).json(salle);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the salle" });
  }
};

export const getAllSalleStockage = async (req, res) => {
  try {
    const salles = await salleService.getAllSalles();
    res.json(salles);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching salles" });
  }
};
