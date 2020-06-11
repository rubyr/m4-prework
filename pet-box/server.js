import express from "express";
import shortid from "shortid";
import cors from "cors";
const app = express();

app.set("port", process.env.PORT || 3000);
app.locals.title = "pet box";

app.locals.pets = [
  { id: "a1", name: "Rover", type: "dog" },
  { id: "b2", name: "Marcus Aurelius", type: "parakeet" },
  { id: "c3", name: "Craisins", type: "cat" },
];

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {});

app.get("/api/v1/pets", (req, res) => {
  const pets = app.locals.pets;

  res.json(pets);
});

app.get("/api/v1/pets/:id", (req, res) => {
  const id = req.params.id;

  const pet = app.locals.pets.find((p) => p.id === id);
  if (pet) res.status(200).json({ id: pet });
  else res.sendStatus(404);
});

app.post("/api/v1/pets", (req, res) => {
  // const id = shortid();

  const id = shortid();
  const pet = req.body;

  for (let requiredParameter of ["name", "type"]) {
    if (!pet[requiredParameter]) {
      return res.status(422).send({
        error: `Expected format: { name: <String>, type: <String> }. You're missing a "${requiredParameter}" property.`,
      });
    }
  }

  const { name, type } = pet;
  app.locals.pets.push({ id, name, type });

  res.status(201).json({ id, name, type });
});

app.patch("/api/v1/pets", (req, res) => {
  const pet = req.body;

  for (let requiredParameter of ["id", "name"]) {
    if (!pet[requiredParameter]) {
      return res.status(422).send({
        error: `Expected format: { id: <String>, name: <String> }. You're missing a "${requiredParameter}" property.`,
      });
    }
  }

  const { id, name } = pet;

  app.locals.pets.map((p) => {
    if (p.id === id) p.name = name;
  });

  res.sendStatus(204);
});

app.delete("/api/v1/pets", (req, res) => {
  const pet = req.body;

  if (!pet.id)
    return res.status(422).send({
      error: `Expected format: { id: <String> }. You're missing a "id" property.`,
    });

  const ind = app.locals.pets.findIndex((p) => p.id === pet.id);
  app.locals.pets.splice(ind, 1);

  return res.sendStatus(204);
});

app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}`
  );
});
