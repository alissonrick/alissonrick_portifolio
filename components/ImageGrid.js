import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ImageGrid.module.css"; // Importando CSS separado

export default function ImageGrid({ images }) {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.grid}>
                {images.length > 0 ? (
                    images.map((img) => (
                        <Link key={img.id} href={`/project/${img.id}`} className={styles.imageWrapper}>
                            <Image
                                src={img.src}
                                alt={img.title}
                                width={520}
                                height={293}
                                className={styles.image}
                            />
                        </Link>
                    ))
                ) : (
                    <p className={styles.noProjects}>Nenhum projeto encontrado.</p>
                )}
            </div>
        </div>
    );
}
