import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css"; // Importando CSS separado

export default function Header({ currentFilter, slogans }) {
    const router = useRouter();
    const baseURL = currentFilter ? `?filter=${currentFilter}` : "";

    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <h1>Alisson Ricardo</h1>
                <p className={currentFilter ? styles.highlighted : styles.normal}>
                    {slogans[currentFilter] || slogans[""] || "Texto Dinâmico"}
                </p>
            </div>
            <nav className={styles.nav}>
                <Link href={`/${baseURL}`} className={router.pathname === "/" ? styles.currentPage : styles.link}>
                    Home
                </Link>
                <Link href={`/unreleased${baseURL}`} className={router.pathname === "/unreleased" ? styles.currentPage : styles.link}>
                    Unreleased
                </Link>
                <Link href={`/about${baseURL}`} className={router.pathname === "/about" ? styles.currentPage : styles.link}>
                    About
                </Link>
            </nav>
        </header>
    );
}
