import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import projectData from "../data/projectData";
import Header from "../components/Header";
import ImageGrid from "../components/ImageGrid";
import styles from "../styles/Unreleased.module.css"; // Importando o CSS separado

export default function Unreleased() {
    const router = useRouter();
    const { filter } = router.query;
    const [currentFilter, setCurrentFilter] = useState("");
    const [filteredImages, setFilteredImages] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setCurrentFilter(filter || "");

        if (typeof window !== "undefined") {
            const savedAuth = localStorage.getItem("unreleased_auth");
            setIsAuthenticated(savedAuth === "true");
        }
    }, [filter]);

    useEffect(() => {
        if (!isAuthenticated) return;

        let filtered = projectData.projects.filter(img =>
            img.requiresPassword && !img.deleted
        );

        if (currentFilter) {
            filtered = filtered.filter(img => img.tags.includes(currentFilter));
        }

        filtered.sort((a, b) => (a.order || 0) - (b.order || 0));
        setFilteredImages(filtered);
    }, [isAuthenticated, currentFilter]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password.trim().toLowerCase() === "art") {
            setIsAuthenticated(true);
            localStorage.setItem("unreleased_auth", "true");
            setErrorMessage("");
        } else {
            setErrorMessage("Incorrect password. Try again.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#ced6db] text-[#6d6d6d] flex flex-col items-center">
            {!isAuthenticated ? (
                <div className={styles.restrictedAccess}>
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
                    <Header currentFilter={currentFilter} slogans={projectData.slogans} />
                    <ImageGrid images={filteredImages} />
                </>
            )}
        </div>
    );
}
