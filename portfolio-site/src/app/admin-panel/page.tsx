/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import CreatePost from "./createPost";
import UpdatePost from "./updatePost";

import { getPosts } from "../../server/repo";

export default async function AdminPage() {
  const posts = await getPosts();

    return (
      <main className="flex items-center justify-center">
        <div>
         <CreatePost/>
         <UpdatePost posts={posts}/>
        </div>
      </main>
    );
}
