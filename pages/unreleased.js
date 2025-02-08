import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

// Obtém os dados dos projetos do backend antes de renderizar a página
export async function getServerSideProps(context) {
    const res = await fetch("http://localhost:3000/api/getProjects");
    const data = await res.json();

    return { props: { projects: data.projects || [] } };
}

export default function Unreleased({ projects }) {
    const router = useRouter();
    const { filter } = router.query;

    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        // Verifica se a senha já foi armazenada no localStorage
        const savedAuth = localStorage.getItem("unreleased_auth");
        if (savedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    // Filtra os projetos com a tag "senha" se o usuário estiver autenticado
    useEffect(() => {
        if (isAuthenticated) {
            const filtered = projects.filter(img =>
                img.tags.includes("senha") && (!filter || img.tags.includes(filter))
            );
            setFilteredImages(filtered);
        }
    }, [isAuthenticated, filter, projects]);

    // Manipula o envio da senha e armazena no localStorage
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
            {/* Tela de bloqueio para pedir senha */}
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
                        <header className="w-[80%] min-w-[70%] h-[100px] flex justify-between items-center px-6 bg-[#ced6db] mt-[50px] mx-auto">
                            {/* Nome e Slogan alinhados à esquerda */}
                            <div className="text-left">
                                <h1 className="text-[50px] font-bold leading-none mb-[10px]">Alisson Ricardo</h1>
                                <p className={`text-[25px] ${filter ? "text-[#dd8e54]" : "text-[#6d6d6d]"}`}>
                                    Unreleased Projects {filter ? ` - ${filter}` : ""}
                                </p>
                            </div>

                            {/* Menu sempre à direita, nunca quebra */}
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
                                    <p className="text-center text-[20px] text-[#6d6d6d] mt-10">No projects found.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}
