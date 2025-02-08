const aboutData = {
    slogans: {
        backgrounds: "Background artist.",
        props: "Prop Artist.",
        characters: "Character Designer",
        "": "Generalist"
    },

    experiences: [
        {
            title: "Senior Game Artist",
            period: "2020 - Present",
            description: "Lead artist for multiple mobile games.",
            tags: ["backgrounds", "characters"]
        },
        {
            title: "3D Prop Artist",
            period: "2018 - 2020",
            description: "Created detailed 3D props for an indie game studio.",
            tags: ["props"]
        }
    ],

    // Lista de educação
    education: [
        {
            degree: "Master Degree in Design",
            institution: "Federal University of Pernambuco, Brazil",
            period: "Feb, 2011 - Jul, 2013",
            description: "Researching the adaptation of traditional principles of animations from cinema to games."
        },
        {
            degree: "Bachelor in Communication",
            institution: "Federal University of Paraíba, Brazil",
            period: "Feb, 2004 - Jul, 2009",
            description: "Bachelor's degree in Social Communication."
        }
    ],

    skills: [
        { name: "Photoshop", level: 5, tags: ["all"] },
        { name: "Blender", level: 4, tags: ["backgrounds", "characters"] },
        { name: "ZBrush", level: 3, tags: ["characters"] },
        { name: "Unity", level: 4, tags: ["props", "characters"] },
        { name: "Substance Painter", level: 4, tags: ["backgrounds", "props"] },
        { name: "After Effects", level: 3, tags: ["all"] },
        { name: "English", level: 5, tags: ["languages", "all"] },
        { name: "Spanish", level: 3, tags: ["languages", "all"] }
    ]
};

export default aboutData;
