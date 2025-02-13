import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";
import projectData from "../data/projectData";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function Home() {
    const router = useRouter();
    const { filter } = router.query;
    const [currentFilter, setCurrentFilter] = useState("");
    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        // 🔍 Define o filtro atual baseado na URL
        setCurrentFilter(filter || "");
    }, [filter]);

    useEffect(() => {
        let filtered = projectData.projects.filter(img =>
            !img.requiresPassword && !img.deleted // 🔹 Filtra imagens que NÃO precisam de senha e não foram deletadas
        );

        if (currentFilter) {
            filtered = filtered.filter(img => img.tags.includes(currentFilter));
        }

        // 📌 Aplica ordenação pelo campo `order`
        filtered.sort((a, b) => (a.order || 0) - (b.order || 0));

        setFilteredImages(filtered);
    }, [currentFilter]);

    return (
        <div className={`${robotoSlab.className} w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center`}>
            <div className="w-[80%] min-w-[70%] max-w-[1200px] mx-auto">
                {/* 🔹 Cabeçalho */}
                <header className="w-[80%] min-w-[70%] h-[100px] flex flex-col sm:flex-row justify-between items-center px-6 bg-[#ced6db] mt-[50px] mx-auto">
                    <div className="text-left">
                        <h1 className="text-[50px] font-bold leading-none mb-[10px]">Alisson Ricardo</h1>
                        <p className={`text-[25px] ${currentFilter ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            {projectData.slogans[currentFilter] || projectData.slogans[""] || "Texto Dinâmico"}
                        </p>
                    </div>
                    {/* 🔹 Menu de Navegação */}
                    <nav className="flex gap-x-12">
                        <Link href={`/${currentFilter ? `?filter=${currentFilter}` : ""}`} className={`text-[20px] ${!currentFilter ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            Home
                        </Link>
                        <Link href={`/unreleased${currentFilter ? `?filter=${currentFilter}` : ""}`} className={`text-[20px] ${currentFilter === "unreleased" ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            Unreleased
                        </Link>
                        <Link href={`/about${currentFilter ? `?filter=${currentFilter}` : ""}`} className={`text-[20px] ${currentFilter === "about" ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                            About
                        </Link>
                    </nav>
                </header>

                {/* 🔹 Grid de Imagens */}
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
