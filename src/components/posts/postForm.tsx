"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PostSchema, PostSchemaType} from "@/schemas/PostSchema";
import {id} from "postcss-selector-parser";
import FormField from "@/components/common/form/FormField";
import Button from "@/components/common/form/Button";
import { MdOutlineArrowUpward } from "react-icons/md";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import Header from "@/components/common/Header";
import {createPost, editPost} from "@/actions/postServerActions";
import {Post} from "@prisma/client";

interface PostFormProps {
    post?: Post;
    handleCloseEditing?: () => void;
}

const PostForm = ({post, handleCloseEditing}: PostFormProps) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const {register, handleSubmit ,reset , formState: {errors, isLoading}} = useForm<PostSchemaType>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: post ? post.title : "",
        },
    });

    useEffect(() => {
        if(success) {
            reset();

            const timer = setTimeout(()=> {
                setSuccess(undefined)
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    const onSubmit: SubmitHandler<PostSchemaType> = async (data) => {
        setLoading(true);

        if(post) {
            editPost(post, data.title).then(data=> {
                setError(data.error);
                setSuccess(data.success);
                if(data.success && handleCloseEditing) {
                    handleCloseEditing();
                }
            }).finally(() => {
                setLoading(false);
            })
        } else {
            createPost(data).then(data => {
                setError(data.error);
                setSuccess(data.success);
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    return(
        <form action="POST" onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col max-w-[500px] m-auto mt-8", post && "mt-0")}>
            <Header title={post ? "Edit Post" : "Create Post"} lg />
            <FormField
                id="title"
                register={register}
                errors={errors}
                placeholder="Title"
                disabled={loading}
            />

            {error && <div className="text-sm text-rose-400">{error}</div>}
            {success && <div className="text-sm text-green-400">{success}</div>}

            <Button label={loading ? "Loading..." : "Submit"} disabled={loading} icon={loading ? undefined : MdOutlineArrowUpward} />
        </form>
    );
}

export default PostForm;