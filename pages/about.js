import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import aboutData from "../data/aboutData";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function About() {
    const router = useRouter();
    const { filter } = router.query;

    const [filteredExperiences, setFilteredExperiences] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [filteredLanguages, setFilteredLanguages] = useState([]);

    useEffect(() => {
        if (filter) {
            setFilteredExperiences(aboutData.experiences.filter(exp => exp.tags.includes(filter)));

            setFilteredSkills(aboutData.skills.filter(skill =>
                (skill.tags.includes(filter) || skill.tags.includes("all")) && !skill.tags.includes("languages")
            ));

            const filteredLangs = aboutData.skills.filter(lang =>
                lang.tags.includes("languages") && (lang.tags.includes(filter) || filter === "languages" || lang.tags.includes("all"))
            );

            setFilteredLanguages(filteredLangs.length > 0 ? filteredLangs : aboutData.skills.filter(lang => lang.tags.includes("languages")));
        } else {
            setFilteredExperiences(aboutData.experiences);
            setFilteredSkills(aboutData.skills.filter(skill => !skill.tags.includes("languages")));
            setFilteredLanguages(aboutData.skills.filter(lang => lang.tags.includes("languages")));
        }
    }, [filter]);

    return (
        <div className={`${robotoSlab.className} w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center`}>

            {/* Container da Página */}
            <div className="w-[80%] min-w-[70%] max-w-[1200px] mx-auto">

                {/* Cabeçalho igual ao da Index */}
                <header className="w-[80%] min-w-[70%] h-[100px] flex flex-col sm:flex-row justify-between items-center px-6 bg-[#ced6db] mt-[50px] mx-auto">
                    <div className="text-left">
                        <h1 className="text-[50px] font-bold leading-none mb-[10px]">Alisson Ricardo</h1>
                        <p className={`text-[25px] ${filter ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            {aboutData.slogans[filter] || aboutData.slogans[""] || "Texto Dinâmico"}
                        </p>
                    </div>

                    <nav className="flex gap-x-12">
                        <Link href={`/${filter ? `?filter=${filter}` : ""}`}
                            className={`text-[20px] ${!filter ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            Home
                        </Link>
                        <Link href={`/unreleased${filter ? `?filter=${filter}` : ""}`}
                            className={`text-[20px] ${filter === "unreleased" ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            Unreleased
                        </Link>
                        <Link href={`/about${filter ? `?filter=${filter}` : ""}`}
                            className={`text-[20px] ${filter === "about" ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            About
                        </Link>
                    </nav>
                </header>

                {/* Corpo da Página About */}
                <div className="flex justify-between w-[80%] min-w-[70%] max-w-[1200px] mx-auto mt-[100px]">

                    {/* Coluna Esquerda (Experiências + Educação) */}
                    <div className="w-[70%]">
                        <div className="flex items-start">
                            <Image
                                src="/images/about/foto.jpg"
                                alt="Profile Photo"
                                width={200}
                                height={200}
                                className="rounded-full"
                            />
                            <p className="ml-6 text-[18px] text-justify">
                                Passionate about game art and visual development, I specialize in creating immersive environments and characters that bring games to life.
                            </p>
                        </div>

                        {/* Experiências Profissionais */}
                        <div className="mt-10">
                            <h2 className="text-[28px] font-bold">Experience</h2>
                            {filteredExperiences.length > 0 ? (
                                filteredExperiences.map((exp, index) => (
                                    <div key={index} className="mt-6">
                                        <h3 className="text-[22px] font-semibold">{exp.title}</h3>
                                        <p className="text-[16px] text-[#888]">{exp.period}</p>
                                        <p className="text-[18px] mt-2">{exp.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[18px] text-[#888] mt-4">No experiences available for this filter.</p>
                            )}
                        </div>

                        {/* Educação */}
                        <div className="mt-10">
                            <h2 className="text-[28px] font-bold">Education</h2>
                            {aboutData.education.length > 0 ? (
                                aboutData.education.map((edu, index) => (
                                    <div key={index} className="mt-6">
                                        <h3 className="text-[22px] font-semibold">{edu.degree}</h3>
                                        <p className="text-[20px] text-[#6d6d6d]">{edu.institution}</p>
                                        <p className="text-[16px] text-[#888]">{edu.period}</p>
                                        <p className="text-[18px] mt-2">{edu.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[18px] text-[#888] mt-4">No education data available.</p>
                            )}
                        </div>
                    </div>

                    {/* Coluna Direita (Skills e Languages) */}
                    <div className="w-[30%] pl-10">
                        <h2 className="text-[28px] font-bold">Skills</h2>
                        {filteredSkills.length > 0 ? (
                            <ul className="mt-6">
                                {filteredSkills.map((skill, index) => (
                                    <li key={index} className="flex justify-between items-center mb-3">
                                        <span className="text-[18px]">{skill.name}</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`ml-1 ${i < skill.level ? "text-yellow-500" : "text-gray-400"}`}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[18px] text-[#888] mt-4">No skills available for this filter.</p>
                        )}

                        <h2 className="text-[28px] font-bold mt-10">Languages</h2>
                        {filteredLanguages.length > 0 ? (
                            <ul className="mt-6">
                                {filteredLanguages.map((lang, index) => (
                                    <li key={index} className="flex justify-between items-center mb-3">
                                        <span className="text-[18px]">{lang.name}</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`ml-1 ${i < lang.level ? "text-yellow-500" : "text-gray-400"}`}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[18px] text-[#888] mt-4">No languages available for this filter.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
