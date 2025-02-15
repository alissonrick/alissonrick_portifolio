import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import projectData from "../data/projectData";
import Header from "../components/Header";
import ImageGrid from "../components/ImageGrid";

export default function Home() {
    const router = useRouter();
    const { filter } = router.query;
    const [currentFilter, setCurrentFilter] = useState("");
    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        setCurrentFilter(filter || "");
    }, [filter]);

    useEffect(() => {
        let filtered = projectData.projects.filter(img =>
            !img.requiresPassword && !img.deleted
        );

        if (currentFilter) {
            filtered = filtered.filter(img => img.tags.includes(currentFilter));
        }

        filtered.sort((a, b) => (a.order || 0) - (b.order || 0));
        setFilteredImages(filtered);
    }, [currentFilter]);

    return (
        <div className="w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center">
            <Header currentFilter={currentFilter} slogans={projectData.slogans} />
            <ImageGrid images={filteredImages} />
        </div>
    );
}
