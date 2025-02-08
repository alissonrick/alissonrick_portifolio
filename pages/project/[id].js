import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function ProjectPage() {
    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/getProjects`)
                .then(res => res.json())
                .then(data => {
                    console.log("Dados recebidos:", data);
                    const foundProject = data.projects.find(proj => proj.id === id);
                    setProject(foundProject || null);
                });
        }
    }, [id]);

    if (!project) return <p className="text-center mt-20">Projeto não encontrado.</p>;

    return (
        <div className={`${robotoSlab.className} w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center pt-[30px]`}>
            {/* Título do Projeto */}
            <header className="w-full h-[100px] flex justify-center items-end pb-[10px] bg-[#ced6db] text-[37.5px] font-bold text-center">
                {project.title}
            </header>

            {/* Imagem Principal */}
            <div className="w-[80%] max-h-[80vh] mt-4 flex justify-center">
                <Image
                    src={project.src}
                    alt={project.title}
                    width={1400}
                    height={800}
                    className="object-contain w-full max-h-[80vh] rounded-lg"
                />
            </div>

            {/* Descrição do Projeto */}
            <div className="w-[70%] mt-10 text-[20px] text-center">
                {project.description}
            </div>

            {/* Imagens Adicionais Centralizadas */}
            {project.additionalImages.length > 0 && (
                <div className="w-[60%] mt-10 flex flex-col items-center gap-10">
                    {project.additionalImages.map((img, index) => (
                        <div key={index} className="w-full flex flex-col items-center">
                            <Image
                                src={img.src}
                                alt={`Extra ${index + 1}`}
                                width={800} // Next.js ajusta automaticamente
                                height={600}
                                className="rounded-lg object-cover w-full h-auto"
                            />
                            {/* Exibir descrição apenas se existir */}
                            {img.description && (
                                <p className="text-[18px] text-center mt-2">{img.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
