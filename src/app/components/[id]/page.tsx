import { prisma } from '../../../../lib/prisma';
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

interface PostDetailsInterface {
    params: {
        id: string;
    }
}

export default async function PostDetails(props: PostDetailsInterface) {
  await new Promise((r) => setTimeout(r, 1000));

  // const id = parseInt(props.params.id);
  const id = props.params.id;

  const post = await prisma.post.findFirst({
    where: { id },
  });

  if (!post) {
    return notFound();
  }

  const deletePost = async () => {
    "use server";

    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/");

    redirect("/");
  };

  return (
    <div>
      <div className="flex justify-between mb-2 flex-col md:flex-row">
        <h1 className="text-4xl font-bold tracking-wider mb-2 uppercase">
          {post?.title}
        </h1>
        <div className=" space-x-3">
          <Link
            href={`/components/${post.id}/edit-post`}
            className="text-white bg-black p-3"
          >
            Edit
          </Link>
          <form action={deletePost} className=" inline">
            <button className="text-white bg-black p-2">Delete</button>
          </form>
        </div>
      </div>
      <p className=" font-medium tracking-wider">{post?.content}</p>
    </div>
  );
}
