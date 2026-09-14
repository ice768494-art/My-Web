export default async function handler(req, res) {
    // Test the endpoint in your browser
    if (req.method === "GET") {
        return res.status(200).json({
            ok: true,
            message: "Telegram webhook is working!"
        });
    }

    // Telegram sends POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            ok: false,
            message: "Method not allowed"
        });
    }

    try {
        const update = req.body;

        console.log("Telegram update:", update);

        // Channel post received
        if (update && update.channel_post) {
            console.log(
                "Channel post received:",
                update.channel_post
            );
        }

        return res.status(200).json({
            ok: true,
            message: "Telegram update received"
        });

    } catch (error) {
        console.error("Webhook error:", error);

        return res.status(500).json({
            ok: false,
            message: "Webhook error"
        });
    }
}
