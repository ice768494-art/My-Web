export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({
            ok: true,
            message: "Telegram + Supabase webhook is working!"
        });
    }

    if (req.method !== "POST") {
        return res.status(405).json({
            ok: false,
            message: "Method not allowed"
        });
    }

    try {
        const update = req.body;

        console.log("Telegram update:", update);

        const post = update?.channel_post;

        if (!post) {
            return res.status(200).json({
                ok: true,
                message: "No channel post"
            });
        }

        // Get Telegram text/caption
        const text = post.caption || post.text || "";

        console.log("Post text:", text);

        // --------------------------------
        // GET ANIME TITLE
        // --------------------------------

        const lines = text
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        let animeTitle = lines[0] || "Unknown Anime";

        // Remove emoji/title decorations
        animeTitle = animeTitle
            .replace(/^🎬\s*/i, "")
            .trim();

        // --------------------------------
        // GET EPISODE NUMBER
        // --------------------------------

        const episodeMatch = text.match(
            /episode\s*(\d+(?:\.\d+)?)/i
        );

        if (!episodeMatch) {
            console.log("No episode number found");

            return res.status(200).json({
                ok: true,
                message: "Anime post received, but no episode number found"
            });
        }

        const episodeNumber = Number(episodeMatch[1]);

        // --------------------------------
        // GET WATCH URL
        // --------------------------------

        const urlMatch = text.match(
            /https?:\/\/[^\s]+/i
        );

        const videoUrl = urlMatch
            ? urlMatch[0].replace(/[)\],.]+
