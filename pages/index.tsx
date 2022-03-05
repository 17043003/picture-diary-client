import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>写真絵日記</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to 絵日記</h1>
        <Link href='/post/new'>
          <a className={styles.card}>
            <h2>日記を書く &rarr;</h2>
          </a>
        </Link>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
