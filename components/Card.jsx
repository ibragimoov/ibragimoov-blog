import Link from 'next/link'
import styles from '../styles/Card.module.css'

export default function Card({ title, coverPhoto, author, datePublished, slug }) {

    return (
        <div className={styles.card}>
            <Link href={'/posts/' + slug}>
                <div className='styles.imgContainer'>
                    <img src={coverPhoto.url} />
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                <div className={styles.details}>
                    <div className={styles.author}>
                        <img src={author.avatar.url} alt="" />
                        <h3>{author.name}</h3>
                    </div>
                    <div>
                        <div className={styles.data}>{datePublished}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}