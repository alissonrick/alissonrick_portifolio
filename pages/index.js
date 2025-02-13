import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import projectData from "../data/projectData"; // Importando diretamente os dados
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function Home() {
    const router = useRouter();
    const { filter } = router.query;

    // 🔹 Garante que projects sempre será um array
    const allProjects = projectData.projects || [];

    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        console.log("📦 Projetos carregados:", allProjects);

        // Verifica se `allProjects` é um array antes de filtrar
        if (!Array.isArray(allProjects)) {
            console.error("❌ ERRO: projectData.projects não é um array!", allProjects);
            return;
        }

        let filtered = allProjects.filter(img => !img.tags.includes("senha"));

        if (filter) {
            filtered = filtered.filter(img => img.tags.includes(filter));
        }

        setFilteredImages(filtered);
    }, [filter]);

    return (
        <div className={`${robotoSlab.className} w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center`}>

            {/* Container ajustado com largura mínima de 70% e máxima de 1200px */}
            <div className="w-[80%] min-w-[70%] max-w-[1200px] mx-auto">

                {/* Header */}
                <header className="w-[80%] min-w-[70%] h-[100px] flex flex-col sm:flex-row justify-between items-center px-6 bg-[#ced6db] mt-[50px] mx-auto">
                    {/* Nome e Slogan alinhados à esquerda */}
                    <div className="text-left">
                        <h1 className="text-[50px] font-bold leading-none mb-[10px]">Alisson Ricardo</h1>
                        <p className={`text-[25px] ${filter ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            {projectData.slogans[filter] || projectData.slogans[""] || "Texto Dinâmico"}
                        </p>
                    </div>

                    {/* Menu sempre à direita, nunca quebra */}
                    <nav className="flex gap-x-12">
                        <Link href="/" className={`text-[20px] ${!filter ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
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

                {/* Grid de Imagens */}
                <div className="w-[80%] min-w-[70%] mx-auto mt-8 px-8">
                    <div className="grid grid-cols-4 gap-[5px]">
                        {filteredImages.length > 0 ? (
                            filteredImages.map((img) => (
                                <Link key={img.id} href={`/project/${img.id}`} className="group">
                                    <div className="overflow-hidden rounded-lg border border-gray-700">
                                        <Image
                                            src={img.src}
                                            alt={img.title}
                                            width={520}
                                            height={293}
                                            className="w-full h-[293px] object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-[20px] text-[#6d6d6d] mt-10">Nenhum projeto encontrado.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
