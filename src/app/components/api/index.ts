"use server";

import {prisma} from '../../../../lib/prisma'
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createPost = async (
  formState: { message: string },
  formData: FormData
) => {
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must have at least 3 letters.",
    };
  }

  if (typeof content !== "string" || content.length < 20) {
    return {
      message: "Description must have at least 20 letters.",
    };
  }

  await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      author: {
        create: {
          name: 'ryan'
        }}
    },
  });

  revalidatePath("/");

  redirect("/");
};

export const getOldPost = async (id: string) => {
  const oldPost = await prisma.post.findFirst({
    where: { id },
  });

  if (!oldPost) {
    return notFound();
  }

  return oldPost;
};

export const updatePost = async (
  formState: { message: string; id: string },
  formData: FormData
) => {
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || title.length < 5) {
    return {
      message: "Title must have at least 5 letters.",
      id: formState.id,
    };
  }

  if (typeof content !== "string" || content.length < 20) {
    return {
      message: "Description must have at least 20 letters.",
      id: formState.id,
    };
  }

  await prisma.post.update({
    where: { id: formState.id },
    data: {
      title,
      content,
    },
  });

  revalidatePath("/");

  redirect("/");
};

// export const deletePost = async(
//   id: string,
// ) => {

//   await prisma.post.delete({
//     where: { id },
//   });

//   revalidatePath("/");

//   redirect("/");
// }
