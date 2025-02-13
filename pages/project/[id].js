import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import projectData from "../../data/projectData";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

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
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setFullscreenImage(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = fullscreenImage ? "hidden" : "auto";
    }, [fullscreenImage]);

    const handleWheelZoom = (e) => {
        e.preventDefault();
        setZoom((prev) => Math.max(1, prev + e.deltaY * -0.002));
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setDragging(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    };

    const handleMouseUp = () => setDragging(false);

    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            setStartPos({ dist, zoom });
        } else {
            setDragging(true);
            setStartPos({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const newZoom = Math.max(1, startPos.zoom * (dist / startPos.dist));
            setZoom(newZoom);
        } else if (dragging) {
            setPosition({ x: e.touches[0].clientX - startPos.x, y: e.touches[0].clientY - startPos.y });
        }
    };

    const handleTouchEnd = () => setDragging(false);

    return (
        <div className={`${robotoSlab.className} w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center pb-[50px]`}>

            {/* Botão Back */}
            <div className="flex flex-col items-center mt-[30px] mb-4">
                <button
                    onClick={() => router.back()}
                    className="text-[20px] text-[#6d6d6d] font-semibold"
                >
                    {"< Back"}
                </button>
                <p className="text-[14px] text-[#6d6d6d] mt-1">Tap or click to zoom</p>
            </div>

            {/* Imagem Principal */}
            <div className="w-[80%] min-w-[70%] max-w-[1200px] mx-auto flex flex-col items-center">
                <Image
                    src={project.src}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="rounded-lg border border-gray-700 cursor-pointer"
                    onClick={() => setFullscreenImage(project.src)}
                />
                <p className="text-[18px] text-[#6d6d6d] mt-4 text-center">{project.description}</p>
            </div>

            {/* Imagens Adicionais */}
            {project.additionalImages.length > 0 && (
                <div className="w-[80%] min-w-[70%] max-w-[800px] mx-auto mt-8 flex flex-col items-center">
                    {project.additionalImages.map((img, index) => (
                        <div key={index} className="mb-6">
                            <Image
                                src={img.src}
                                alt={img.description}
                                width={560}
                                height={350}
                                className="rounded-lg border border-gray-700 cursor-pointer"
                                onClick={() => setFullscreenImage(img.src)}
                            />
                            {img.description && <p className="text-[16px] text-[#6d6d6d] text-center mt-2">{img.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* Imagem em Tela Cheia */}
            {fullscreenImage && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50"
                    onWheel={handleWheelZoom}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Botão de Fechar */}
                    <button
                        onClick={() => setFullscreenImage(null)}
                        className="absolute top-4 right-6 text-white text-4xl z-10"
                    >
                        ✕
                    </button>

                    {/* Texto de instrução sempre visível */}
                    <p className="absolute top-8 text-white text-lg z-10">
                        Pinch or scroll to zoom, grab to move
                    </p>

                    {/* Imagem Expandida */}
                    <div
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                            transition: dragging ? "none" : "transform 0.2s ease-out",
                            maxWidth: "90vw",
                            maxHeight: "90vh"
                        }}
                        className="relative"
                    >
                        <Image
                            src={fullscreenImage}
                            alt="Fullscreen Image"
                            width={1600}
                            height={900}
                            className="w-auto h-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
