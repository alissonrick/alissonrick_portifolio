import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import projectData from "../../data/projectData";
import styles from "../../styles/Project.module.css";
import FullscreenImage from "../../components/FullscreenImage";

export async function getStaticPaths() {
    const paths = projectData.projects.map((project) => ({
        params: { id: project.id },
    }));

    return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
    const project = projectData.projects.find((p) => p.id === params.id) || null;

    return project ? { props: { project } } : { notFound: true };
}

export default function ProjectPage({ project }) {
    const router = useRouter();
    const [fullscreenImage, setFullscreenImage] = useState(null);

    return (
        <div className={styles.projectPage}>

            {/* 🔹 Botão de Voltar */}
            <div className={styles.backButton} onClick={() => router.back()}>
                {"< Back"}
            </div>

            {/* 🔹 Imagem Principal */}
            <div className={styles.mainImageContainer}>
                <Image
                    src={project.src}
                    alt={project.title}
                    width={800}
                    height={450}
                    className={styles.mainImage}
                    onClick={() => setFullscreenImage(project.src)}
                />
                <p className={styles.description}>{project.description}</p>
            </div>

            {/* 🔹 Imagens Adicionais */}
            {project.additionalImages.length > 0 && (
                <div className={styles.additionalImages}>
                    {project.additionalImages.map((img, index) => (
                        <div key={index}>
                            <Image
                                src={img.src}
                                alt={img.description}
                                width={560}
                                height={350}
                                className={styles.additionalImage}
                                onClick={() => setFullscreenImage(img.src)}
                            />
                            {img.description && <p className={styles.description}>{img.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* 🔹 Componente de Imagem em Tela Cheia */}
            {fullscreenImage && <FullscreenImage src={fullscreenImage} onClose={() => setFullscreenImage(null)} />}
        </div>
    );
}
