import fs from "fs";
import path from "path";
import projectData from "../../data/projectData";

export default function handler(req, res) {
    const imagesDir = path.join(process.cwd(), "public/images");
    const deletedImagesDir = path.join(imagesDir, "deleted");

    if (!fs.existsSync(imagesDir)) {
        return res.status(500).json({ error: "Pasta de imagens não encontrada." });
    }

    // Listando todas as imagens na pasta principal
    const allImages = fs.readdirSync(imagesDir)
        .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));

    // Pegando todas as imagens que foram movidas para deleted/
    const deletedImages = fs.existsSync(deletedImagesDir)
        ? fs.readdirSync(deletedImagesDir)
        : [];

    // Criar um set para verificação rápida
    const deletedSet = new Set(deletedImages);

    // Filtrar as imagens que NÃO estão em deleted/
    const availableImages = allImages.filter(file => !deletedSet.has(file));

    // Criar mapa de imagens adicionais por projeto
    const additionalImagesMap = {};
    availableImages.forEach(img => {
        const baseName = img.split("_")[0]; // Extrai "imagem1" de "imagem1_a.jpg"
        if (!additionalImagesMap[baseName]) {
            additionalImagesMap[baseName] = [];
        }
        additionalImagesMap[baseName].push({ src: `/images/${img}` });
    });

    // Criar a lista final de projetos com base nos dados de projectData.js
    const projects = Object.keys(projectData.projects)
        .map(id => {
            // Se a imagem principal estiver deletada, remove o projeto
            if (deletedSet.has(projectData.projects[id].src.replace("/images/", ""))) {
                return null;
            }

            return {
                id,
                title: projectData.projects[id].title,
                src: projectData.projects[id].src,
                additionalImages: [
                    ...(projectData.projects[id].additionalImages || []),
                    ...(additionalImagesMap[id] || [])
                ],
                description: projectData.projects[id].description,
                tags: projectData.projects[id].tags
            };
        })
        .filter(Boolean); // Remove os projetos que foram deletados

    res.status(200).json({
        projects,
        slogans: projectData.slogans
    });
}
