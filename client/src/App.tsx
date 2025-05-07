// --- START OF FILE website/client/src/App.tsx ---
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import UserInfoDisplay from './components/UserInfoDisplay';
import UserSuggestionList from './components/UserSuggestionList';
import './components/styles/App.css';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";


const particlesOptions: ISourceOptions = {

    fpsLimit: 60,
    interactivity: { events: { onClick: { enable: false }, onHover: { enable: false }, resize: { enable: true } }, modes: {} },
    particles: {
        color: { value: ["#ffffff", "#b4befe", "#a6adc8"] },
        links: { enable: false },
        move: { enable: true, speed: { min: 0.1, max: 0.5 }, direction: "none", random: true, straight: false, outModes: { default: "out" } },
        number: {
            density: { enable: true,},
            value: 60,
        },
        opacity: {
            value: { min: 1, max: 2 },
            animation: {
                enable: true,
                speed: 1,
                sync: false,
         
            }
        },
        shape: { type: "circle" },
        size: {
            value: { min: 0.4, max: 2 },
            animation: {
                enable: true,
                speed: 8,
                sync: false,
         
            }
        },
    },
    detectRetina: true,
};


// Interface UserScanResult 
interface UserScanResult {
    user_id: string;
    display_name_at_scan: string;
    avatar_url_at_scan?: string | null;
    is_bot: boolean;
    message_count?: number;
    reaction_received_count?: number;
    reaction_given_count?: number;
    reply_count?: number;
    mention_given_count?: number;
    mention_received_count?: number;
    link_count?: number;
    image_count?: number;
    sticker_count?: number;
    other_file_count?: number;
    distinct_channels_count?: number;
    first_seen_utc?: string;
    last_seen_utc?: string;
    activity_span_seconds?: number;
    ranking_data?: Record<string, number>;
    achievement_data?: Record<string, any>;
}

type IntroStage = 'cat' | 'serverName' | 'search';

// Icons 
const ArrowDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
    </svg>
);
const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>
    </svg>
);


function ScanPage() {
    // State declarations 
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<UserScanResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scanId, setScanId] = useState<string | null>(null);
    const { guildId } = useParams<{ guildId: string }>();
    const [guildName, setGuildName] = useState<string | null>(null);
    const [introStage, setIntroStage] = useState<IntroStage>('cat');
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [hasDisplayedResults, setHasDisplayedResults] = useState(false);
    const [allUsersList, setAllUsersList] = useState<UserScanResult[]>([]);
    const [isShowingAllUsersList, setIsShowingAllUsersList] = useState(false);

    // Intro stages useEffect 
    useEffect(() => {

        if (!guildId) {
            setError('Lỗi: Không thể xác định ID Guild từ đường dẫn URL.');
            setIntroStage('search'); return;
        } else { setError(null); }
        setGuildName("Hôm qua ᓚᘏᗢ | きのう");
        setIntroStage('cat');
        setIsFadingOut(false); setHasDisplayedResults(false); setSearchResults([]); setAllUsersList([]); setSearchTerm(''); setScanId(null); setIsShowingAllUsersList(false);
        let stage1Timer: number | null = null, stage2Timer: number | null = null, fade1Timer: number | null = null, fade2Timer: number | null = null;
        const catDisplayTime = 1800, serverNameDisplayTime = 2000, fadeDuration = 500;
        stage1Timer = setTimeout(() => { setIsFadingOut(true); }, catDisplayTime);
        fade1Timer = setTimeout(() => { setIntroStage('serverName'); setIsFadingOut(false); }, catDisplayTime + fadeDuration);
        stage2Timer = setTimeout(() => { setIsFadingOut(true); }, catDisplayTime + fadeDuration + serverNameDisplayTime);
        fade2Timer = setTimeout(() => { setIntroStage('search'); setIsFadingOut(false); }, catDisplayTime + fadeDuration + serverNameDisplayTime + fadeDuration);
        return () => { if (stage1Timer) clearTimeout(stage1Timer); if (stage2Timer) clearTimeout(stage2Timer); if (fade1Timer) clearTimeout(fade1Timer); if (fade2Timer) clearTimeout(fade2Timer); }
    }, [guildId]);

    // --- MODIFIED API Fetch Logic ---
    const performFetch = useCallback(async (isSearchAll = false, termToUse?: string) => { // Thêm tham số termToUse
        if (!guildId) { setError('Lỗi: Không thể xác định ID Guild.'); return; }

        // Ưu tiên termToUse nếu được cung cấp, nếu không thì dùng state searchTerm
        const effectiveSearchTerm = termToUse !== undefined ? termToUse : searchTerm;

        // Kiểm tra độ dài chỉ khi không phải là search all và dùng effectiveSearchTerm
        if (!isSearchAll && effectiveSearchTerm.trim().length < 2) {
            setError('Vui lòng nhập ít nhất 2 ký tự để bắt đầu tìm kiếm.');
            setSearchResults([]);
            setHasDisplayedResults(false);
            return;
        }

        if (isSearchAll) { setIsLoadingAllUsers(true); } else { setIsLoading(true); }
        setError(null);
        if (!isSearchAll) { setSearchResults([]); }

        try {
            let apiUrl = `/api/scan/${guildId}/user?`;
            // Dùng effectiveSearchTerm cho API call nếu không phải search all
            apiUrl += isSearchAll ? `showall=true` : `search=${encodeURIComponent(effectiveSearchTerm.trim())}`;

            const response = await fetch(apiUrl);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: `Lỗi HTTP ${response.status}` }));
                throw new Error(errorData.error || `Lỗi ${response.status}`);
            }
            const data = await response.json();
            setScanId(data.scan_id || null);
            if (isSearchAll) {
                const filteredUsers = (data.users || []).filter((user: UserScanResult) => !user.is_bot);
                setAllUsersList(filteredUsers);
                if (filteredUsers.length === 0) {
                    setError('Không tìm thấy người dùng nào (không phải bot) trong lần quét này.');
                }
            } else {
                setSearchResults(data.users || []);
                setHasDisplayedResults(!!data.users && data.users.length > 0);
                if (!data.users || data.users.length === 0) {
                     // Sử dụng effectiveSearchTerm trong thông báo lỗi
                    setError(`Không tìm thấy người dùng nào khớp với '${effectiveSearchTerm}'.`);
                }
            }
        } catch (err: any) {
            console.error("API Error:", err);
            setError(err.message || 'Đã xảy ra lỗi không mong muốn.');
            if (isSearchAll) setAllUsersList([]); else setSearchResults([]);
            setHasDisplayedResults(false);
        } finally {
            if (isSearchAll) { setIsLoadingAllUsers(false); } else { setIsLoading(false); }
        }
    // useCallback dependency vẫn giữ searchTerm để khi search bằng nút Search thì nó có giá trị mới nhất
    }, [guildId, searchTerm]);


    // --- MODIFIED Event Handlers ---
    const handleSearchClick = () => {
        setIsShowingAllUsersList(false);
        setHasDisplayedResults(false);
        performFetch(false); // Gọi không có termToUse, sẽ dùng state searchTerm
    };

    const handleToggleShowAllClick = async () => {
        if (isShowingAllUsersList) {
            setIsShowingAllUsersList(false);
        } else {
            setSearchTerm('');
            setSearchResults([]);
            setHasDisplayedResults(false);
            if (allUsersList.length === 0) {
                await performFetch(true); // Gọi với isSearchAll = true
            }
            setIsShowingAllUsersList(true);
        }
    };

    const handleUserSuggestionSelect = (userNameOrId: string) => {
        setSearchTerm(userNameOrId); // Cập nhật state cho input hiển thị
        setIsShowingAllUsersList(false);
        setHasDisplayedResults(false);

        // Gọi fetch ngay lập tức và TRUYỀN trực tiếp giá trị đã chọn
        performFetch(false, userNameOrId);

        requestAnimationFrame(() => {
            const searchInput = document.querySelector('.search-bar-container input') as HTMLInputElement;
            if (searchInput) {
                searchInput.focus();
            }
        });
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        if (isShowingAllUsersList && newSearchTerm.trim() !== '') {
            setIsShowingAllUsersList(false);
        }
        if (newSearchTerm.trim() === '' && hasDisplayedResults) {
             setSearchResults([]);
             setHasDisplayedResults(false);
        }
    };
    // --- END MODIFIED Event Handlers ---


    // Formatting Functions 
    const formatRelativeTime = (isoString?: string): string => {
        if (!isoString) return 'N/A'; try { const date = new Date(isoString); const now = new Date(); const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000); const diffMinutes = Math.round(diffSeconds / 60); const diffHours = Math.round(diffMinutes / 60); const diffDays = Math.round(diffHours / 24); if (diffSeconds < 60) return `${diffSeconds} giây trước`; if (diffMinutes < 60) return `${diffMinutes} phút trước`; if (diffHours < 24) return `${diffHours} giờ trước`; return `${diffDays} ngày trước`; } catch { return 'Ngày không hợp lệ'; } };
    const formatTimeDelta = (seconds?: number): string => { if (seconds === undefined || seconds === null || seconds <= 0) return 'N/A'; const d = Math.floor(seconds / (3600 * 24)); const h = Math.floor(seconds % (3600 * 24) / 3600); const m = Math.floor(seconds % 3600 / 60); const s = Math.floor(seconds % 60); let result = ''; if (d > 0) result += `${d} ngày `; if (h > 0) result += `${h} giờ `; if (m > 0) result += `${m} phút `; if (s > 0 || result === '') result += `${s} giây`; return result.trim() || 'N/A'; };


    // Dynamic Class for Layout Control
    const appContainerClass = useMemo(() => { if (introStage !== 'search') return "AppContainer intro-active"; if (hasDisplayedResults && searchResults.length > 0) return "AppContainer search-top"; return "AppContainer search-centered"; }, [introStage, hasDisplayedResults, searchResults.length]);

    // Render Logic for ScanPage
    return (
        <div className={appContainerClass}>
            {/* Intro Stages */}
            {introStage === 'cat' && ( <div className={`intro-stage cat-stage ${isFadingOut ? 'hiding' : 'visible'}`}><span className="cat-icon">ᓚᘏᗢ</span><span className="ellipsis">...</span></div> )}
            {introStage === 'serverName' && ( <div className={`intro-stage server-stage-wow ${isFadingOut ? 'hiding' : 'visible'}`}><div className="avatar-container-wow"><img src="https://cdn.discordapp.com/icons/1259368902937280593/81ce19857ca473711292dfa495e3c90d.webp?size=128&quality=lossless" alt="Server Icon" className="server-avatar-wow" /></div><div className="text-container-wow"><h2 className="server-name-wow">{guildName || `Server ${guildId}`}</h2></div></div> )}

            {/* Main Content */}
            <div className={`main-content ${introStage === 'search' ? 'visible' : ''}`}>
                <div className="search-interaction-area">
                    <SearchBar value={searchTerm} onChange={handleSearchInputChange} onSearch={handleSearchClick} isLoading={isLoading} />
                    {introStage === 'search' && ( <button onClick={handleToggleShowAllClick} className={`show-all-toggle-button ${isShowingAllUsersList ? 'active' : ''}`} disabled={isLoading || isLoadingAllUsers} title={isShowingAllUsersList ? "Ẩn danh sách" : "Hiển thị tất cả người dùng (không phải bot)"}>{isShowingAllUsersList ? <ArrowUpIcon /> : <ArrowDownIcon />}</button> )}
                    {/* Loading Dots */}
                    {isLoadingAllUsers && ( <div className="loading-indicator-dots"><span>.</span><span>.</span><span>.</span></div> )}
                    {/* Suggestions List */}
                    {isShowingAllUsersList && allUsersList.length > 0 && !isLoadingAllUsers && ( <UserSuggestionList users={allUsersList} onUserSelect={handleUserSuggestionSelect} /> )}
                </div>
                <div className="results-display-area">
                    {isLoading && !isLoadingAllUsers && <p className="loading">Đang tìm kiếm...</p>}
                    {error && <p className="error">{error}</p>}
                    {scanId && searchResults.length > 0 && !isShowingAllUsersList && (<p className="scan-info">ID trích từ Database là: {scanId}</p>)}
                    <div className="results-container">
                        {searchResults.map((user, index) => ( <UserInfoDisplay key={user.user_id} user={user} formatRelativeTime={formatRelativeTime} formatTimeDelta={formatTimeDelta} style={{ animationDelay: `${index * 0.05}s` }} /> ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function App() {

    const [init, setInit] = useState(false);
    useEffect(() => { initParticlesEngine(async (engine) => { await loadSlim(engine); }).then(() => { setInit(true); }); }, []);

    return (
        <div className="AppWrapper">
            {init && ( <Particles id="tsparticles" options={particlesOptions} /> )}
            <div className="App">

                 <Routes>
                    <Route path="/scan/:guildId" element={<ScanPage />} />
                    <Route path="/" element={ <div className="home-page"><h1>📊 Shiromi Scan</h1><p>Đây là trang tra cứu kết quả quét của bot Shiromi.</p><p>Vui lòng truy cập đường dẫn dạng <strong>/scan/{'<ID_SERVER>'}</strong> được cung cấp bởi bot trong Discord.</p><p>Ví dụ: <code>/scan/123456789012345678</code></p></div> } />
                    <Route path="*" element={ <div className="not-found-page"><h2>404 - Không Tìm Thấy Trang</h2><p>Xin lỗi, trang cậu tìm kiếm không tồn tại.</p></div> } />
                </Routes>
                {}
                <footer> ᓚᘏᗢ Rin </footer>
            </div>
        </div>
    );
}

export default App;
// --- END OF FILE website/client/src/App.tsx ---