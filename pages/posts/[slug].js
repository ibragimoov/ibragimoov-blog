import { GraphQLClient, gql } from "graphql-request";

import styles from "../../styles/Slug.module.css";

const graphcms = new GraphQLClient(
    "https://api-eu-central-1.hygraph.com/v2/cl5pffsmt24cw01ui9yhp2cq5/master"
);

const query = gql`
    query Post($slug: String!) {
        post(where: { slug: $slug }) {
            id
            title
            slug
            datePublished
            author {
                id
                name
                avatar {
                    url
                }
            }
            content {
                html
            }
            coverPhoto {
                id
                url
            }
        }
    }
`;

const slugList = gql`
    {
        posts {
            slug
        }
    }
`;

export default function BlogPost({ post }) {
    return (
        <main className={styles.blog}>
            <h2 className="blog-title">{post.title}</h2>
            <br />
            <img
                src={post.coverPhoto.url}
                className={styles.cover}
                alt="coverPhoto"
            />
            <div className={styles.title}>
                <div className={styles.author}>
                    <img src={post.author.avatar.url} alt="author-photo" />
                    <div className={styles.authtext}>
                        <h6>By {post.author.name}</h6>
                        <h6 className={styles.date}>{post.datePublished}</h6>
                    </div>
                </div>
            </div>
            <div className={styles.content - post}>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content.html }}
                ></div>
            </div>
        </main>
    );
}

export async function getStaticPaths() {
    const { posts } = await graphcms.request(slugList);

    return {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;

    const data = await graphcms.request(query, { slug });
    const post = data.post;

    return {
        props: {
            post,
        },
        revalidate: 1,
    };
}
