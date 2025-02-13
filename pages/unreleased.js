import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import projectData from "../data/projectData"; // Importando diretamente os dados
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function Unreleased() {
    const router = useRouter();
    const { filter } = router.query;

    // 🔹 Estado para armazenar o filtro aplicado
    const [currentFilter, setCurrentFilter] = useState("");

    // 🔐 Estado para autenticação e projetos filtrados
    const [filteredImages, setFilteredImages] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Atualiza o filtro apenas quando a página carrega
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const urlFilter = urlParams.get("filter");

            if (urlFilter) {
                setCurrentFilter(urlFilter);
            } else {
                setCurrentFilter("");
            }
        }

        // Verifica se a senha já foi armazenada no localStorage
        const savedAuth = localStorage.getItem("unreleased_auth");
        if (savedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, [filter]);

    // Filtra os projetos protegidos por senha após autenticação
    useEffect(() => {
        if (!isAuthenticated) return;

        let filtered = projectData.projects.filter(img => img.tags.includes("senha"));

        if (currentFilter) {
            filtered = filtered.filter(img => img.tags.includes(currentFilter));
        }

        setFilteredImages(filtered);
    }, [isAuthenticated, currentFilter]);

    // 🔐 Verifica a senha e autentica o usuário
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === "art") {
            setIsAuthenticated(true);
            localStorage.setItem("unreleased_auth", "true"); // Armazena autenticação
            setErrorMessage("");
        } else {
            setErrorMessage("Incorrect password. Try again.");
        }
    };

    return (
        <div className={`${robotoSlab.className} w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center`}>

            {/* 🔒 Tela de autenticação */}
            {!isAuthenticated ? (
                <div className="mt-20 flex flex-col items-center bg-[#f5f5f5] p-10 rounded-lg shadow-lg">
                    <h2 className="text-[24px] font-bold text-[#333] mb-4">🔒 Restricted Access</h2>
                    <p className="text-[18px] text-[#666] mb-6">Enter the password to access unreleased projects.</p>
                    <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
                        <input
                            type="password"
                            className="border border-gray-500 px-6 py-3 rounded-lg text-[18px] focus:outline-none focus:ring-2 focus:ring-[#dd8e54]"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="mt-4 px-6 py-3 bg-[#dd8e54] text-white rounded-lg text-[18px] hover:bg-[#b96f3f]">
                            🔓 Unlock
                        </button>
                    </form>
                    {errorMessage && <p className="text-red-500 mt-4 text-[16px]">{errorMessage}</p>}
                </div>
            ) : (
                <>
                    {/* **Container para manter a largura do conteúdo igual ao index** */}
                    <div className="w-[80%] min-w-[70%] max-w-[1200px] mx-auto">

                        {/* **Cabeçalho atualizado para ser idêntico ao da Index** */}
                        <header className="w-[80%] min-w-[70%] h-[100px] flex flex-col sm:flex-row justify-between items-center px-6 bg-[#ced6db] mt-[50px] mx-auto">
                            <div className="text-left">
                                <h1 className="text-[50px] font-bold leading-none mb-[10px]">Alisson Ricardo</h1>
                                <p className={`text-[25px] ${currentFilter ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                                    {projectData.slogans[currentFilter] || projectData.slogans[""] || "Unreleased Projects"}
                                </p>
                            </div>

                            {/* Menu igual ao Index */}
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

                        {/* **Grid de imagens centralizado, igual ao Index** */}
                        <div className="w-[80%] min-w-[70%] mx-auto mt-8 px-8">
                            <div className="grid grid-cols-4 gap-[5px] justify-center">
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
                </>
            )}
        </div>
    );
}
