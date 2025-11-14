import Blog from "../models/Blog.js";

export function getAll() {
   return Blog.find().select({ title: true, category: true, imageUrl: true });
}

export function getLatest() {
   return Blog.find().sort({ createdAt: -1 }).limit(3);
}

export function getOne(blogId) {
   return Blog.findById(blogId).populate(["owner", "followList"]);
}

export function create(blogData, userId) {
   return Blog.create({
      ...blogData,
      owner: userId,
   });
}

export function edit(blogId, blogData) {
   return Blog.findByIdAndUpdate(blogId, blogData, { runValidators: true });
}

export async function remove(blogId, userId) {
   const blog = await Blog.findById(blogId);

   if (!blog.owner.equals(userId)) {
      throw new Error("Cannot delete if you're not an owner");
   }

   return Blog.findByIdAndDelete(blogId);
}

export async function follow(blogId, userId) {
   const blog = await Blog.findById(blogId);

   if (blog.owner.equals(userId)) {
      throw new Error("Owner cannot follow blog");
   }

   blog.followList.push(userId);

   return blog.save();
}

export function getAllByOwner(ownerId) {
   return Blog.find({ owner: ownerId });
}

export function getAllByFollower(followerId) {
   return Blog.find().in("followList", followerId);
}
