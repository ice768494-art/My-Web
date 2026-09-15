export default async function handler(req, res) {
    // Test in browser
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

        // Only process channel posts
        if (update?.channel_post) {
            const post = update.channel_post;

            const caption =
                post.caption ||
                post.text ||
                "";

            const messageId = post.message_id;
            const channelId = post.chat?.id;
            const channelTitle = post.chat?.title || "";

            console.log("Channel post received:", {
                messageId,
                channelId,
                channelTitle,
                caption
            });

            // Supabase settings
            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_ANON_KEY;

            if (!supabaseUrl || !supabaseKey) {
                throw new Error("Supabase environment variables are missing");
            }

            // Save the Telegram post as an anime record
            const title =
                caption.split("\n")[0]?.trim() ||
                channelTitle ||
                `Telegram Post ${messageId}`;

            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")
                .slice(0, 80);

            const response = await fetch(
                `${supabaseUrl}/rest/v1/anime`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": supabaseKey,
                        "Authorization": `Bearer ${supabaseKey}`,
                        "Prefer": "return=minimal"
                    },
                    body: JSON.stringify({
                        title: title,
                        slug: `${slug}-${messageId}`,
                        description: caption,
                        audio: "Tamil"
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();

                console.error(
                    "Supabase error:",
                    errorText
                );

                throw new Error(
                    `Supabase request failed: ${response.status}`
                );
            }

            console.log("Saved to Supabase successfully!");
        }

        return res.status(200).json({
            ok: true,
            message: "Telegram update received and processed"
        });

    } catch (error) {
        console.error("Webhook error:", error);

        return res.status(500).json({
            ok: false,
            message: "Webhook error",
            error: error.message
        });
    }
}
