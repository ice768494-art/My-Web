export default async function handler(req, res) {
  // Telegram sends POST requests
  if (req.method !== "POST") {
    return res.status(200).json({
      ok: true,
      message: "Telegram webhook is working!"
    });
  }

  try {
    const update = req.body;

    console.log("Telegram update:", JSON.stringify(update));

    // Check if this is a channel post
    if (update.channel_post) {
      const post = update.channel_post;

      console.log("Channel post received:", post);

      // For now, just confirm that Telegram reached us
      return res.status(200).json({
        ok: true,
        message: "Channel post received"
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Update received"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      error: "Webhook error"
    });
  }
}
