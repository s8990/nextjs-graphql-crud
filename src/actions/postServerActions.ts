"use server";

import {PostSchema, PostSchemaType} from "@/schemas/PostSchema";
import prismadb from "@/lib/prismadb";
import {revalidatePath} from "next/cache";
import {Post} from "@prisma/client";

export const createPost = async (values: PostSchemaType) => {
    const validatedFields = PostSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "Invalid fields"};
    }

    const {title} = validatedFields.data;

    try {
        await prismadb.post.create({
            data: {
                title: title,
            },
        })

        revalidatePath("/");
        return {success: "Post created"};
    } catch (error) {
        return {error: `Server error! : ${error}`};
    }
}

export const getPosts = async () => {
    try {
        const posts = await prismadb.post.findMany({
            orderBy: {
                postedAt: "desc",
            },
        });

        // revalidatePath("/");
        return {success: posts};
    } catch (error) {
        return {error: `Server error! : ${error}`};
    }
}

export const deletePost = async (post: Post) => {
    try {
        await prismadb.post.delete({
            where: {
                id: post.id,
            },
        })

        revalidatePath("/");
        return {success: "Post deleted"};
    } catch (error) {
        return {error: `Server error! : ${error}`};
    }
}

export const editPost = async (post: Post, title: string) => {
    try {
        await prismadb.post.update({
            where: {
                id: post.id,
            },
            data: {
                title: title,
            }
        })

        revalidatePath("/");
        return {success: "Post edited"};
    } catch (error) {
        return {error: `Server error! : ${error}`};
    }
}