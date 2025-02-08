const projectData = {
    slogans: {
        backgrounds: "Background artist.",
        props: "Prop Artist.",
        characters: "Character Designer",
        "": "Generalist"
    },

    projects: {
        "imagem1": {
            title: "Projeto Cenário X",
            src: "/images/imagem1.jpg",
            additionalImages: [
                { src: "/images/imagem1_a.jpg", description: "Vista panorâmica do cenário." },
                { src: "/images/imagem1_b.jpg", description: "Detalhe da arquitetura." },
                { src: "/images/imagem1_c.jpg", description: "Variedade de texturas utilizadas." }
            ],
            description: "Este é um projeto de cenário para um jogo estilizado.",
            tags: ["backgrounds", "characters","senha"]
        },
        "imagem2": {
            title: "Projeto Prop A",
            src: "/images/imagem2.jpg",
            additionalImages: [ ],
            description: "Um objeto de cena usado em um jogo.",
            tags: ["props","senha"]
        },
        "imagem3": {
            title: "Projeto Prop B",
            src: "/images/imagem3.jpg",
            additionalImages: [],
            description: "Outro objeto de cena utilizado em um ambiente 3D.",
            tags: ["props"]
        },
        "imagem4": {
            title: "Projeto Cenário 2",
            src: "/images/imagem4.jpg",
            additionalImages: [],
            description: "Mais um cenário estilizado para um jogo.",
            tags: ["backgrounds"]
        },
        "imagem5": {
            title: "Personagem X",
            src: "/images/imagem5.jpg",
            additionalImages: [ ],
            description: "Um personagem criado para um jogo mobile.",
            tags: ["characters"]
        },
        "imagem6": {
            title: "Personagem Y",
            src: "/images/imagem6.jpg",
            additionalImages: [ ],
            description: "Outro personagem desenvolvido para um jogo.",
            tags: ["characters"]
        }
    }
};

export default projectData;
