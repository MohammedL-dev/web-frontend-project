const out = document.getElementById("output");
const out2 = document.getElementById("output2");
const list = document.getElementById("list");
const progress = document.getElementById("progress");
const container = document.getElementById("anime-cards");
const loading = document.getElementById("loading");
const get_btn = document.getElementById("get_btn");
const cancel_btn = document.getElementById("cancel_btn");


let a = "";

function darkClass() {
    document.documentElement.classList.toggle("dark");
}

function showLoading(stat, progress, count_anime , num2, animes_found) {
    if (stat) {
        loading.innerHTML = `
        <div class="loading-container flex flex-col mt-8 py-4 px-6 text-sm font-medium rounded-xl border transition-all duration-300 ease-in-out
                    text-[var(--color-text-2)] 
                    bg-[var(--color-primary)] 
                    border-[var(--color-primary-500)] 
                    hover:bg-[var(--color-primary-500)] 
                    hover:border-[var(--color-primary-800)]
                    hover:shadow-lg
                    transform hover:scale-[1.02]">
            
            <!-- Loading spinner and text -->
            <div class="flex items-center mb-3">
                <svg aria-hidden="true" role="status" class="inline w-5 h-5 me-3 animate-spin transition-transform duration-500" 
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
                          fill="var(--color-primary-500)"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
                          fill="var(--color-tertiary)"/>
                </svg>
                <span class="font-semibold">Loading animes...</span>
            </div>
            
            <!-- Statistics -->
            <div class="flex justify-between text-xs mb-3 opacity-80">
                <span>Processing: ${count_anime}</span>
                <span>Found: ${animes_found}</span>
            </div>
            
            <!-- Progress bar -->
            <div class="w-full bg-[var(--color-primary-500)] rounded-full h-3 overflow-hidden shadow-inner">
                <div class="align-middle text-center progress-bar bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-tertiary-500)] h-3 rounded-full transition-all duration-500 ease-out shadow-sm" 
                        style="width: ${progress}%">
                            <div class="text-[var(--color-2)] text-center text-xs font-medium opacity-75">
                                ${Math.round(progress)}%
                            </div>
                        </div>
            </div>
            
        </div>
        `
    } else {
        loading.innerHTML = ""
    }
}



// Enhanced version with pulse animation for better UX
function showLoadingEnhanced(stat, progress, count_anime, num2, animes_found) {
    if (stat) {
        loading.innerHTML = `
        <div class="loading-container animate-pulse-subtle flex flex-col mt-6 py-5 px-7 text-sm font-medium rounded-2xl border-2 transition-all duration-500 ease-in-out
                    text-[var(--color-text-2)] 
                    bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-color)]
                    border-[var(--color-primary-500)] 
                    hover:from-[var(--color-primary-500)] 
                    hover:to-[var(--color-primary)]
                    hover:border-[var(--color-tertiary)]
                    hover:shadow-2xl
                    backdrop-blur-sm">
            
            <!-- Header with icon and title -->
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    <div class="relative">
                        <svg aria-hidden="true" role="status" class="w-6 h-6 me-3 animate-spin" 
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="45" stroke="var(--color-primary-500)" stroke-width="8" fill="none" opacity="0.3"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
                                    fill="var(--color-tertiary)" stroke-width="2"/>
                        </svg>
                    </div>
                    <span class="font-bold text-base">Loading Animes</span>
                </div>
                <span class="text-xs px-3 py-1 rounded-full bg-[var(--color-tertiary)] text-[var(--color-primary)] font-semibold">
                    ${Math.round(progress)}%
                </span>
            </div>
            
            <!-- Statistics grid -->
            <div class="grid grid-cols-3 gap-4 mb-4 text-center">
                <div class="bg-[var(--color-primary-color)] rounded-lg p-3 transition-all duration-300">
                    <div class="text-lg font-bold text-[var(--color-tertiary)]">${count_anime}</div>
                    <div class="text-xs opacity-70">Processing</div>
                </div>
                <div class="bg-[var(--color-primary-color)] rounded-lg p-3 transition-all duration-300">
                    <div class="text-lg font-bold text-[var(--color-tertiary)]">${animes_found}</div>
                    <div class="text-xs opacity-70">Found</div>
                </div>
                <div class="bg-[var(--color-primary-color)] rounded-lg p-3 transition-all duration-300">
                    <div class="text-lg font-bold text-[var(--color-tertiary)]">${num2}</div>
                    <div class="text-xs opacity-70">Total</div>
                </div>
            </div>
            
            <!-- Enhanced progress bar -->
            <div class="relative w-full bg-[var(--color-primary-500)] rounded-full h-4 overflow-hidden shadow-inner">
                <div class="progress-bar absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--color-tertiary)] via-[var(--color-tertiary-500)] to-[var(--color-tertiary)] rounded-full transition-all duration-700 ease-out shadow-lg animate-shimmer" style="width: ${progress}%">
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-slide"></div>
            </div>
        </div>
        
        <style>
        .animate-pulse-subtle {
            animation: pulse-subtle 2s infinite;
        }
        
        @keyframes pulse-subtle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.95; }
        }
        
        .animate-shimmer {
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        .animate-slide {
            animation: slide 2s infinite;
        }
        
        @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        </style>
        `
    } else {
        loading.innerHTML = ""
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function msToTime(duration) {
    let seconds = Math.floor(duration / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    
    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showProgress(n, t){
    const total = 10;
    const i = Math.round((n / t) * total);
    const progress = '▇'.repeat(i) + '-'.repeat(total - i);
    document.getElementById("progress").textContent = `Progress: [${progress}] ${i * 10}% \n${n}/${t}`;
}

cancel_btn.addEventListener("click" , () => {
    shouldStop = true;
    showLoading(false)
});


async function animeRate() {
    const num2 = document.getElementById("animes_num2").value;
    const rate = document.getElementById("rate").value;
    const in_score = document.getElementById("score").value;
    const ep_num = document.getElementById("ep_num").value;
    const getChecked = name => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
    const genre = getChecked("genre");
    const type = document.getElementById("type").value;

    // New: Sorting/filter options
    const order_by = document.getElementById("order_by")?.value || "score";
    const sort = document.getElementById("sort")?.value || "desc";
    const filter = document.getElementById("filter")?.value || "";

    container.innerHTML = "";
    let count_anime = 0;
    let animes_found = 0;
    let shouldStop = false;
    let repeatanime = "";
    const start = performance.now();
    
    
    for (let i = 1; i <= 1157 && !shouldStop; i++) {
        try {
            const url = new URL(`https://api.jikan.moe/v4/top/anime`);
            url.searchParams.set("page", i);
            url.searchParams.set("sfw", "true");
            
            if (order_by) url.searchParams.set("order_by", order_by);
            if (sort) url.searchParams.set("sort", sort);
            if (type) url.searchParams.set("type", type);
            if (filter) url.searchParams.set("filter", filter);

            const response = await fetch(url.toString());
            console.log(url.toString())
            
            if (response.status === 404) {
                console.log(`⚠️ Page ${i} not found (404)`);
                continue;
            }

            if (response.status === 429) {
                console.log(`⚠️ Rate limit hit at page ${i}, retrying...`);
                i--;
                await sleep(500);
                continue;
            }

            const data = await response.json();
            const animes = data.data;
            console.log(animes)
            console.log(filter)

            
            for (const anime of animes) {
                const title = anime.title;
                const title_english = anime.title_english || "";
                const episodes = anime.episodes;
                const score = anime.score;
                const rating = anime.rating;
                const id = anime.mal_id;
                const year = anime.year || 'N/A';
                count_anime++;
                let progressbar = (count_anime/num2) * 100;
                //console.log(progressbar);
                showLoadingEnhanced(true, progressbar, count_anime, num2, animes_found);
                get_btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Loading...`;

                //showProgress(count_anime, num2);

                let b = [];

                if (rate.trim() !== "") {
                    try {
                        const episodesResponse = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
                        if (episodesResponse.status === 404) {
                            console.log(`⚠️ Episode data for anime ID ${id} not found (404)`);
                            continue;
                        }
                        if (episodesResponse.status === 429) {
                            console.log(`⚠️ Rate limit hit at episode check for anime ${id}, retrying...`);
                            await sleep(1000);
                            continue;
                        }

                        const episodesData = await episodesResponse.json();
                        if (episodesData.data.length === 0) {
                            console.log(`⚠️ Anime ${id} has no episode data`);
                            continue;
                        }

                        for (const ep of episodesData.data) {
                            b.push(ep.score !== null && Number(ep.score) >= Number(rate) ? 1 : 0);
                        }
                    } catch (epError) {
                        console.log(`⚠️ Error fetching episodes for anime ID ${id}`, epError);
                        continue;
                    }
                }

                const allEpisodesGood = b.length === 0 || !b.includes(0);
                const scoreOk = (score !== null && (in_score === "" || score >= Number(in_score))) || filter === "upcoming";
                const ep_numOK = (episodes !== null && (ep_num === "" || episodes <= Number(ep_num))) || filter === "upcoming";
                const genreOK = genre.length === 0 || anime.genres.some(g => genre.includes(g.name));
                const typeOK = type === "" || anime.type === type;
                const noRepetOK = repeatanime === "" || repeatanime !== title;
                console.log(`${title} => score: ${scoreOk} (${score}), episodes: ${ep_numOK} (${episodes}), genres: ${genreOK}, type: ${typeOK} (${anime.type}), noRepeat: ${noRepetOK}, allEpisodesGood: ${allEpisodesGood}`);

                if (allEpisodesGood && scoreOk && ep_numOK && genreOK && typeOK && noRepetOK) {
                    animes_found++

                    const card = `
                        <div class="max-w-sm bg-[var(--color-primary-color)] border border-[var(--color-text-1)] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                            <div class="relative">
                            <img class="w-full h-80 object-cover" src="${anime.images.jpg.large_image_url}" alt="${title}" />
                            <div class="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs font-medium">
                                <i class="fas fa-calendar-alt mr-1"></i>
                                ${year}
                            </div>
                            </div>

                            <div class="p-5 flex flex-col flex-1">
                            <div class="mb-3">
                                <h5 class="text-xl font-bold text-[var(--color-secondary)] mb-1 line-clamp-2">${title}</h5>
                                <p class="text-sm text-[var(--color-text-2)] line-clamp-2">${title_english}</p>
                            </div>

                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center text-amber-500">
                                <i class="fas fa-star mr-1"></i>
                                <span class="font-semibold text-center">${anime.score || 'N/A'}</span>
                                </div>
                                <div class="flex items-center border border-[var(--color-text-1)] bg-[var(--color-bg)] text-blue-600 px-2 py-1 rounded-full text-xs">
                                <i class="fas fa-tv mr-1"></i>
                                <span class="font-medium">${anime.type || 'Unknown'}</span>
                                </div>
                            </div>

                            <div class="mb-4">
                                <div class="flex flex-wrap gap-1">
                                ${anime.genres ? anime.genres.slice(0, 3).map(
                                        genre => `
                                        <span class="inline-flex items-center px-2 py-1 rounded-full border border-[var(--color-text-1)] text-xs font-medium bg-[var(--color-bg)] text-[var(--color-text-2)]">
                                            <i class="fas fa-tag mr-1 text-xs"></i>
                                            ${genre.name}
                                        </span>`
                                    ).join('')
                                    : '<span class="text-xs text-gray-500">No genres available</span>'}
                                </div>
                            </div>

                            <div class="mt-auto">
                                <button onclick="window.open('${anime.url}', '_blank')"
                                        class="w-full text-[var(--color-primary)] bg-[var(--color-tertiary)] focus:ring-4 focus:ring-[var(--color-tertiary-500)] text-sm px-5 py-2.5 focus:outline-none font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
                                <i class="fas fa-external-link-alt mr-2"></i>
                                View Details
                                </button>
                            </div>
                            </div>
                        </div>`;

                    container.innerHTML += card;
                    a += `Anime: ${title} | English: ${title_english} | ID: ${id} | Score: ${score}\n`;
                    console.log("✅ Found one match:", title);
                }

                if (count_anime >= num2) {
                    shouldStop = true;
                    break;
                }
                
                repeatanime = title;

            }


        } catch (error) {
            console.log(`⚠️ Error fetching page ${i}:`, error);
        }
    }

    const end = performance.now();
    a += `This took ${msToTime((end - start))}`;
    console.log(`This took ${msToTime((end - start))}`);
    // document.getElementById("progress").textContent = "";
    get_btn.innerHTML = `<i class="fas fa-list mr-2"></i>GET List`;
    showLoading(false)
    if (container.innerHTML === "") {
        container.innerHTML = `
        <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">
            <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            No anime matched the criteria</span>`
    }
    // out2.textContent = a || "No anime matched the criteria.";
}





function downloadTxtFile() {
    if (!a.trim()) {
        alert("No anime data to export.");
        return;
    }
    const blob = new Blob([a], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "anime_list.txt"; // filename
    document.body.appendChild(link);
    link.click();

    // cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}



    // async function anime(){
    //     const id = document.getElementById("rating").value;
    //     console.log(id)
    //     const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    //     const data = await response.json();
    //     const anime = data.data;
        
    //     // constants
    //     const title = anime.title;  
    //     const title_english = anime.title_english;  
    //     const episodes = anime.episodes;    
    //     const score = anime.score;  
    //     const rating = anime.rating;    
    //     const synopsis = anime.synopsis;    
    //     const image = anime.images.jpg.image_url;
    //     const genres = anime.genres.map(g => g.name).join(', ');    
    //     const themes = anime.themes.map(t => t.name).join(', ');    
    //     const demographics = anime.demographics.map(d => d.name).join(', ');
    
    //     let episodeListText = "\nEpisodes:\n";
    
    //     const episodesResponse = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
    //     const episodesData = await episodesResponse.json();
    
    //     episodesData.data.forEach(ep => {
    //         episodeListText += `- Ep ${ep.mal_id}: ${ep.title} (Score: ${ep.score !== null ? ep.score * 2 : "N/A"})\n`;
    //     });
    
    //     out.textContent = 
    //         `Title: ${title}\n` +
    //         `English Title: ${title_english}\n` +
    //         `Episodes: ${episodes}\n` +
    //         `Score: ${score}\n` +
    //         `Rating: ${rating}\n` +
    //         `Genres: ${genres}\n` +
    //         `Themes: ${themes}\n` +
    //         `Demographics: ${demographics}\n` +
    //         `Synopsis: ${synopsis}\n\n` +
    //         episodeListText;
    // }
    
    // async function GetAnimeList(){
    //     const num = document.getElementById("animes_num").value;
    //     console.log(num)
    //     let a = "";
    //     let count = 0;
    //     for (let i = 1; i <= num; i++) {
    //         try {
    //             const response = await fetch(`https://api.jikan.moe/v4/anime/${i}`);
    //             if (response.status === 404) {
    //                 a += `Anime ID ${i} → Error fetching data\n`;
    //                 continue
    //             };
    //             if (response.status === 429) {
    //                 i--
    //                 await sleep(1000)
    //             };
    //             const data = await response.json();
    //             count ++
    //             const anime = data.data;
    //             const score = anime.score || "N/A"; // Handle null scores
    //             a += `Anime ID ${i} → Score: ${score}\n`;
    //         } catch (error) {
    //             //a += `Anime ID ${i} → Error fetching data\n`;
    //         }
    
    //         await sleep(330);
    
    //         // After every 60 requests, pause for 40 seconds
    //         if (count % 60 === 0) {
    //             console.log("Cooldown 40s...");
    //             await sleep(40000);
    //         }
    
    //     }
    
    //     list.textContent = a;
    
    // }
    
    
    // async function GetAllData(){
    //     let a = [];
    //     let count = 0;
    //     for (let i = 1; i <= 1156 ; i++) {
    //         try {
    //             const response = await fetch(`https://api.jikan.moe/v4/anime?page=${i}`);
    //             if (response.status === 404) {
    //                 console.log(`⚠️Page ${i} not found (404)`);
    //                 continue
    //             };
    //             if (response.status === 429) {
    //                 console.log(`⚠️Rate limit hit at page ${i}, retrying...`);
    //                 i--
    //                 await sleep(1000)
    //             };
    //             const data = await response.json();
    //             count ++
    //             console.log(`✅Page ${i} fetched (${count} pages total)`);
    //             const anime = data.data;
    
    //             a.push(...anime);
    //         } catch (error) {
    //             //a += `Anime ID ${i} → Error fetching data\n`;
    //         }
    
    //         await sleep(330);
    
    //         // After every 60 requests, pause for 40 seconds
    //         if (count % 60 === 0) {
    //             console.log("⏳Cooldown 40s...");
    //             await sleep(40000);
    //         }
    
    //     }
    
    // const blob = new Blob([JSON.stringify(a, null, 2)], { type: "application/json" });
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = "anime_data.json";
    // document.body.appendChild(link); // Add to page (makes it real)
    // link.click();                    // Trigger the download
    // document.body.removeChild(link); // Clean up after
    
    // }
    
    
    
    // document.getElementById('fileInput').addEventListener('change', function(event) {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    
    //     reader.onload = function(e) {
    //         const content = e.target.result;
    //         const animeData = JSON.parse(content);
    
    //         // ✅ Now you can access animeData like this:
    //         animeData.forEach(anime => {
    //             console.log("Title:", anime.title);
    //             console.log("Score:", anime.score);
    //             console.log("Episodes:", anime.episodes);
    //             console.log("------------------------");
    //         });
    //     };
    
    //     reader.readAsText(file);
    // });