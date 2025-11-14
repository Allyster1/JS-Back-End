import { Router } from "express";
import { mythService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const mythController = Router();

// Index
mythController.get("/", async (req, res) => {
   const myths = await mythService.getAll();

   res.render("myths", { myths });
});

// Report
mythController.get("/report", async (req, res) => {
   const myths = await mythService.getLatestForReport();
   res.render("myths/report", { myths });
});

//  Create
mythController.get("/create", isAuth, (req, res) => {
   res.render("myths/create");
});

mythController.post("/create", isAuth, async (req, res) => {
   const mythData = req.body;
   const userId = req.user.id;

   try {
      await mythService.create(mythData, userId);
      res.redirect("/");
   } catch (err) {
      res.render("myths/create", {
         error: getErrorMessage(err),
         myth: mythData,
      });
   }
});

// Details
mythController.get("/:mythId/details", async (req, res) => {
   const mythId = req.params.mythId;
   const userId = req.user?.id;

   const myth = await mythService.getOne(mythId);

   const isOwner = userId && myth.owner.equals(userId);
   const likes = myth.likedList.map((user) => user.email).join(", ");
   const hasLiked = myth.likedList.some((user) => user.equals(userId));

   res.render("myths/details", { myth, isOwner, likes, hasLiked });
});

// Like
mythController.get("/:mythId/like", isAuth, async (req, res) => {
   const mythId = req.params.mythId;
   const userId = req.user.id;

   await mythService.like(mythId, userId);

   res.redirect(`/myths/${mythId}/details`);
});

// Delete
mythController.get("/:mythId/delete", isAuth, async (req, res) => {
   const mythId = req.params.mythId;
   const userId = req.user.id;

   await mythService.remove(mythId, userId);

   res.redirect("/myths");
});

// Edit
mythController.get("/:mythId/edit", isAuth, async (req, res) => {
   const mythId = req.params.mythId;
   const userId = req.user.id;

   const myth = await mythService.getOne(mythId);

   if (!myth.owner.equals(userId)) {
      throw {
         statusCode: 401,
         message: "Cannot edit blog that you're not the owner of",
      };
   }

   res.render("myths/edit", { myth });
});

mythController.post("/:mythId/edit", isAuth, async (req, res) => {
   const mythData = req.body;
   const mythId = req.params.mythId;

   try {
      await mythService.edit(mythId, mythData);

      res.redirect(`/myths/${mythId}/details`);
   } catch (err) {
      res.render("myths/edit", {
         myth: mythData,
         error: getErrorMessage(err),
      });
   }
});

export default mythController;
