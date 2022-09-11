import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typing';

interface Props {
  post: Post;
}

const Post = (props: Props) => {
  console.log(props.post);

  return (
    <main>
      <Header />
    </main>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
      _id,
      slug {
        current
      }
    }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = `*[_type == 'post' && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      slug,
      description,
      mainImage,
      author -> {
        name,
        image
      },
      body
    }`;

  const post = await sanityClient.fetch(query, {
    slug: context.params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds, update the old cached data
  };
};
