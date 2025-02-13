import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import projectData from "../../data/projectData";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export async function getStaticPaths() {
    const paths = projectData.projects.map((project) => ({
        params: { id: project.id },
    }));

    console.log("🔍 Gerando paths:", paths); // DEBUG

    return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
    const project = projectData.projects.find((p) => p.id === params.id) || null;

    if (!project) {
        console.log("❌ Projeto não encontrado para ID:", params.id); // DEBUG
        return { notFound: true };
    }

    console.log("✅ Projeto encontrado:", project); // DEBUG

    return {
        props: { project },
    };
}

export default function ProjectPage({ project }) {
    const router = useRouter();

    if (!project) {
        return <p className="text-center text-red-500">Projeto não encontrado.</p>;
    }

    return (
        <div className={`${robotoSlab.className} w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center`}>
            {/* Cabeçalho */}
            <div className="w-[80%] min-w-[70%] max-w-[1200px] mx-auto">
                <header className="w-[80%] min-w-[70%] h-[100px] flex flex-col sm:flex-row justify-between items-center px-6 bg-[#ced6db] mt-[50px] mx-auto">
                    <div className="text-left">
                        <h1 className="text-[50px] font-bold leading-none mb-[10px]">Alisson Ricardo</h1>
                        <p className="text-[25px] text-[#6d6d6d]">{project.title}</p>
                    </div>

                    <nav className="flex gap-x-12">
                        <Link href="/" className="text-[20px] text-[#dd8e54]">Home</Link>
                        <Link href={`/unreleased`} className="text-[20px] text-[#6d6d6d]">Unreleased</Link>
                        <Link href={`/about`} className="text-[20px] text-[#6d6d6d]">About</Link>
                    </nav>
                </header>

                {/* Conteúdo do Projeto */}
                <div className="w-[80%] min-w-[70%] mx-auto mt-8 px-8">
                    <h2 className="text-[30px] font-bold mb-4">{project.title}</h2>
                    <Image src={project.src} alt={project.title} width={800} height={450} className="rounded-lg border border-gray-700" />
                    <p className="text-[18px] text-[#6d6d6d] mt-4">{project.description}</p>

                    {/* Imagens Adicionais */}
                    {project.additionalImages.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-[24px] font-bold mb-2">Additional Images</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {project.additionalImages.map((img, index) => (
                                    <Image key={index} src={img.src} alt={img.description} width={300} height={200} className="rounded-lg border border-gray-700" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
