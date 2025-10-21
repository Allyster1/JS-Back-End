import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isMovieCreator } from "../middlewares/movieMiddleware.js";

const movieController = Router();

movieController.get("/create", isAuth, (req, res) => {
   if (req.isAuthenticated) {
      console.log(req.user.email, { categories: getMovieCategoryViewData });
   }

   res.render("movies/create");
});

movieController.post("/create", isAuth, async (req, res) => {
   const movieData = req.body;
   const creatorId = req.user.id;

   try {
      await movieService.create(movieData, creatorId);

      res.redirect("/");
   } catch (err) {
      res.status(400).render("movies/create", {
         error: getErrorMessage(err),
         movie: movieData,
         categories: getMovieCategoryViewData(movieData.category),
      });
   }
});

movieController.get("/:movieId/details", async (req, res) => {
   const movieId = req.params.movieId;

   try {
      const movie = await movieService.getOneDetailed(movieId);
      const ratingViewData = "&#x2605;".repeat(Math.trunc(movie.rating));

      const isCreator = movie.creator && movie.creator.equals(req.user?.id);
      res.render("movies/details", { movie, rating: ratingViewData, isCreator });
   } catch (err) {
      // Redirect without message - not recommended
      // res.redirect(404);

      // Render 404 page with message - url not changed
      res.render("404", { error: "Movie not found" });

      // Redirect with message: url changed
   }
});

movieController.get("/search", async (req, res) => {
   const filter = req.query;

   const movies = await movieService.getAll(filter);

   res.render("search", { movies, filter, pageTitle: "Search Movies" });
});

movieController.get("/:movieId/attach", async (req, res) => {
   const movieId = req.params.movieId;

   const movie = await movieService.getOne(movieId);
   const casts = await castService.getAll({ excludes: movie.casts });

   res.render("casts/attach", { movie, casts });
});

movieController.post("/:movieId/attach", async (req, res) => {
   const movieId = req.params.movieId;
   const castId = req.body.cast;

   await movieService.attach(movieId, castId);

   res.redirect(`/movies/${movieId}/details`);
});

movieController.get("/:movieId/delete", isAuth, async (req, res) => {
   const movieId = req.params.movieId;

   const movie = await movieService.getOne(movieId);

   if (!movie.creator?.equals(req.user.id)) {
      return res.redirect("/");
   }

   await movieService.delete(movieId);

   res.redirect("/");
});

movieController.get("/:movieId/edit", isMovieCreator, isAuth, async (req, res) => {
   const movieId = req.params.movieId;

   try {
      const movie = await movieService.getOne(movieId);

      const categoriesViewData = getMovieCategoryViewData(movie.category);

      res.render("movies/edit", { movie, categories: categoriesViewData });
   } catch (err) {
      res.render("404", { error: "Movie not found" });
   }
});

movieController.post("/:movieId/edit", isMovieCreator, isAuth, async (req, res) => {
   const movieId = req.params.movieId;
   const movieData = req.body;

   try {
      await movieService.edit(movieId, movieData);
      res.redirect(`/movies/${movieId}/details`);
   } catch (err) {
      res.status(400).render("movies/edit", {
         error: getErrorMessage(err),
         movie: movieData,
         categories: getMovieCategoryViewData(movieData.category),
      });
   }
});

function getMovieCategoryViewData(selectedCategory) {
   const categories = [
      { value: "tv-show", label: "TV Show" },
      { value: "animation", label: "Animation" },
      { value: "movie", label: "Movie" },
      { value: "documentary", label: "Documentary" },
      { value: "short-film", label: "Short Film" },
   ];

   const viewData = categories.map((category) => ({
      ...category,
      selected: selectedCategory === category.value ? "selected" : "",
   }));

   return viewData;
}

export default movieController;
