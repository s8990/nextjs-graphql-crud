import Container from "@/app/_layout/container";
import PostForm from "@/components/posts/postForm";
import ListPosts from "@/components/posts/listPosts";

export default function Home() {
  return (
      <Container>
        <PostForm />
        <ListPosts />
      </Container>
  );
}
