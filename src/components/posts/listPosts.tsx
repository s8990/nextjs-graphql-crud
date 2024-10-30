import {getPosts} from "@/actions/postServerActions";
import {Post} from "@prisma/client";
import DeletePost from "@/components/posts/deletePost";
import EditPost from "@/components/posts/editPost";

const ListPosts = async () => {
    const posts = await getPosts();

    if(posts.success) return(
        <div className="flex flex-col max-w-[500px] m-auto">
            {
                posts?.success?.map((post: Post) => (
                    <div key={post.id} className="my-2 flex items-center gap-3 justify-between w-full rounded p-2 border-b">
                        <span>{post?.title}</span>
                        <div className="flex items-center gap-2">
                            <EditPost post={post} />
                            <DeletePost post={post} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ListPosts;