import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import aboutData from "../data/aboutData";
import Header from "../components/Header";
import styles from "../styles/About.module.css";

export default function About() {
    const router = useRouter();
    const { filter } = router.query;
    const [currentFilter, setCurrentFilter] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            setCurrentFilter(urlParams.get("filter") || "");
        }
    }, [filter]);

    // 🔹 Função genérica para filtrar dados
    const filterData = (data, isLanguage = false) => {
        return currentFilter
            ? data.filter(item =>
                (isLanguage
                    ? item.tags.includes("languages")
                    : !item.tags.includes("languages")) &&
                (item.tags.includes(currentFilter) || item.tags.includes("all"))
            )
            : data.filter(item => (isLanguage ? item.tags.includes("languages") : !item.tags.includes("languages")));
    };

    const filteredExperiences = filterData(aboutData.experiences);
    const filteredSkills = filterData(aboutData.skills);
    const filteredLanguages = filterData(aboutData.skills, true);

    return (
        <div className={styles.aboutPage}>
            <Header currentFilter={currentFilter} slogans={aboutData.slogans} />

            <div className={styles.aboutContainer}>
                <div className={styles.aboutContent}>

                    {/* 🔹 Coluna Esquerda (Foto + Experiência + Educação) */}
                    <div className={styles.leftColumn}>
                        <div className={styles.profile}>
                            <Image src="/images/about/foto.jpg" alt="Profile Photo" width={200} height={200} className={styles.profileImage} />
                            <p className={styles.profileText}>
                                Passionate about game art and visual development, I specialize in creating immersive environments and characters that bring games to life.
                            </p>
                        </div>

                        <div className={styles.sectionTitle}>Experience</div>
                        {filteredExperiences.map((exp, index) => (
                            <div key={index} className={styles.entry}>
                                <div className={styles.entryTitle}>{exp.title}</div>
                                <div className={styles.entryPeriod}>{exp.period}</div>
                                <div className={styles.entryDescription}>{exp.description}</div>
                            </div>
                        ))}

                        <div className={styles.sectionTitle}>Education</div>
                        {aboutData.education.map((edu, index) => (
                            <div key={index} className={styles.entry}>
                                <div className={styles.entryTitle}>{edu.degree}</div>
                                <div className={styles.entryPeriod}>{edu.period}</div>
                                <div className={styles.entryDescription}>{edu.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* 🔹 Coluna Direita (Skills + Languages) */}
                    <div className={styles.rightColumn}>
                        <div className={styles.sectionTitle}>Skills</div>
                        <SkillList data={filteredSkills} />

                        <div className={styles.sectionTitle}>Languages</div>
                        <SkillList data={filteredLanguages} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// 🔹 Componente reutilizável para listar habilidades e idiomas
const SkillList = ({ data }) => (
    <ul className={styles.skillsList}>
        {data.length > 0 ? (
            data.map((skill, index) => (
                <li key={index} className={styles.skillItem}>
                    <span>{skill.name}</span>
                    <div>
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`${styles.star} ${i < skill.level ? styles.filled : ""}`}>★</span>
                        ))}
                    </div>
                </li>
            ))
        ) : (
            <p className={styles.entryDescription}>No data available.</p>
        )}
    </ul>
);
