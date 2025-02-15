import { useRouter } from "next/router";
import { useState } from "react";
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

            <div className={styles.backButton} onClick={() => router.back()}>
                {"< Back"}
            </div>

            <p className={styles.simpleText}>Click to full screen</p>

            <div className={styles.mainImageContainer}>
                <Image
                    src={project.src}
                    alt={project.title}
                    layout="responsive"
                    width={16}
                    height={9}
                    className={styles.mainImage}
                    onClick={() => setFullscreenImage(project.src)}
                />
                <p className={styles.description}>{project.description}</p>
            </div>

            {project.additionalImages.length > 0 && (
                <div className={styles.additionalImages}>
                    {project.additionalImages.map((img, index) => (
                        <div key={index}>
                            <Image
                                src={img.src}
                                alt={img.description}
                                layout="responsive"
                                width={16}
                                height={9}
                                className={styles.additionalImage}
                                onClick={() => setFullscreenImage(img.src)}
                            />
                            {img.description && <p className={styles.description}>{img.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {fullscreenImage && <FullscreenImage src={fullscreenImage} onClose={() => setFullscreenImage(null)} />}
        </div>
    );
}
