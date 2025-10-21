import movieService from "../services/movieService.js";

export async function isMovieCreator(req, res, next) {
   const movieId = req.params.movieId;

   if (!req.isAuthenticated) {
      res.redirect("/auth/login"); //TODO: Add message
   }

   const movie = await movieService.getOne(movieId);

   //  Validate if user is creator
   if (movie.creator !== req.user.id) {
      return res.status(401).render("404", "Only the creator can edit this movie!");
   }

   req.movie = movie;

   next();
}
