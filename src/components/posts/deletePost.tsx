"use client";

import {Post} from "@prisma/client";
import {MdDelete} from "react-icons/md";
import {useState} from "react";
import {ImSpinner} from "react-icons/im";
import {deletePost} from "@/actions/postServerActions";

const DeletePost = ({post}: {post: Post}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (post: Post) => {
        setLoading(true);
        await deletePost(post);
        setLoading(false);
    }

    return (
        <button className="text-slate-500 hover:text-rose-400" onClick={()=> handleDelete(post)}>
            {!loading && <MdDelete size={20} />}
            {loading && <ImSpinner size={20} className="animate-spin" />}
        </button>
    )
}

export default DeletePost;