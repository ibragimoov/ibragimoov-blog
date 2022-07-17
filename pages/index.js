import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request'

import Card from '../components/Card'

const graphcms = new GraphQLClient(
    "https://api-eu-central-1.hygraph.com/v2/cl5pffsmt24cw01ui9yhp2cq5/master"
)

const query = gql`
{
    posts {
        id
        title
        datePublished
        slug
        content {
            html
        }
        author {
            name
            avatar {
                url
            }
        }
        coverPhoto {
            publishedAt
            createdBy {
                id
            }
            url
        }
    }
  }
`;

export async function getStaticProps() {
    const { posts } = await graphcms.request(query)

    return {
        props: {
            posts,
        },
        revalidate: 3,
    }
}

export default function Home({ posts }) {
    return (
        <div className={styles.container}>
        <Head>
            <title>Ibragimoov Blog</title>
            <meta name="description" content="Created by Ibragimoov Co. Ltd." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            {posts && posts.map(post => (
                <Card 
                    title={post.title} 
                    author={post.author} 
                    coverPhoto={post.coverPhoto} 
                    key={post.id} 
                    datePublished={post.datePublished} 
                    slug={post.slug}
                />
            ))}
        </main>

        <footer className={styles.footer}>
        
        </footer>
        </div>
    )
}

