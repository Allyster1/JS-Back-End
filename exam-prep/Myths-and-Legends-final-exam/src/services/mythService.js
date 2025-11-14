import Myth from "../models/Myth.js";

export function getAll() {
   return Myth.find();
}

export function getLatest() {
   return Myth.find().sort({ createdAt: -1 }).limit(3).populate("owner");
}

export function getOne(mythId) {
   return Myth.findById(mythId).populate(["owner", "likedList"]);
}

export function create(mythData, userId) {
   return Myth.create({
      ...mythData,
      owner: userId,
   });
}

export async function remove(mythId, userId) {
   const myth = await Myth.findById(mythId);

   if (!myth.owner.equals(userId)) {
      throw new Error("Cannot delete if you're not an owner");
   }

   return Myth.findByIdAndDelete(mythId);
}

export async function edit(mythId, mythData) {
   return Myth.findByIdAndUpdate(mythId, mythData, { runValidators: true });
}

export async function like(mythId, userId) {
   const myth = await Myth.findById(mythId);

   if (myth.owner.equals(userId)) {
      throw new Error("Owner cannot like his own myth post");
   }

   const isOwner = userId && myth.owner.equals(userId);
   const hasLiked = userId && myth.likedList.some((id) => id.equals(userId));

   if (hasLiked) {
      throw new Error("User already liked this myth");
   }

   myth.likedList.push(userId);

   return myth.save();
}

export async function getLatestForReport() {
   const myths = await Myth.find().sort({ createdAt: -1 }).limit(3).populate("owner");

   return myths.map((myth) => {
      const date = new Date(myth.createdAt);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      return {
         name: myth.name,
         origin: myth.origin,
         role: myth.role,
         symbol: myth.symbol,
         era: myth.era,
         image: myth.imageUrl,
         ownerEmail: myth.owner?.email || "Anonymous",
         createdAt: formattedDate,
      };
   });
}
