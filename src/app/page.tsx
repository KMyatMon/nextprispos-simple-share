import { prisma } from '../../lib/prisma';
import Link from "next/link";

export default async function Home() {

  const posts = await prisma.post.findMany({orderBy: {id: "desc"} });

  return (
    <>
    {
      posts.length === 0 && ( <p className="text-center my-36">No Data to show.</p>)
    }
    <section className=" grid grid-cols-1 md:grid-cols-2 gap-3">
    {
      posts.map((post) => (
        <div key={post.id} className=" border border-black p-3">
          <h4 className=" font-bold text-2xl uppercase tracking-wide mb-2">
            {post.title}
          </h4>
          <Link href={`./components/${post.id}`} className=" p-1 bg-black text-sm text-white font-medium">
              read more
          </Link>
          <p className="mt-2 tracking-widest">
              {/* {post.content.substring(0, 200)} ... */}
              {post.content?.substring(0,50)} ...
          </p>
        </div>
      ))
    }
    </section>
    </>
  );
}
