import {
  Doods
} from "../../lib/download/doods.js";
const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix
}) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text) return m.reply(`Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command} Hai!`);
    const urlPattern = /https?:\/\/[^\s]+/;
    const match = text.match(urlPattern);
    const url = match ? match[0] : null;
    if (!url) return m.reply("URL TikTok tidak ditemukan dalam teks.");
    m.react(wait);
    const results = await Doods(url);
    if (!results) {
      return m.reply("Tidak ada media ditemukan.");
    }
    const media = results;
    await conn.sendMessage(m.chat, {
      video: {
        url: media.finalLink
      },
      mimetype: "video/mp4",
      caption: `🎥 ${media.title}\nDurasi: ${media.duration}\nUkuran: ${media.size}\nTanggal Upload: ${media.uploadDate}\n\nUnduh dari: ${media.finalLink}`
    }, {
      quoted: m
    });
    m.react(sukses);
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["doods"].map(v => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(doods)$/i;
export default handler;