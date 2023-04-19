import { bold, escapeMarkdown } from "discord.js";

export const seçenekBelirt = `🆕 • **Yeni**:
• Kullanılabilecek Komutlar
• **.suggest kanal** - Suggest kanal ayarlarsınız.
• **.suggest yetkili** - Suggest onaylayıp/reddedicek yetkili roölünü ayarlarsınız.
• **.suggest durum** sil/aç/kapat - Suggest durum açıp/kapaya kapayabilirsiniz.Suggest verilerini silebilirsiniz
• **.suggest iste** - Suggest iste <yazı> bunu kullandıgınızda ayarlanmış kanala mesaj atar.
• **Tüyolar**
• Suggest onaylandıgında dm den mesaj yazar.`;


export const durumYok = `Durum ayarlamak için ${bold("açık")}, ${bold("kapalı")} veya ${bold(
  "sil"
)} seçeneklerinden birini kullanmanız gerekmektedir.`;
export const mesajYok = "Öneri mesajı giriniz.";
export const kanalYok = "Önerilerin gözükeceği kanalı giriniz.";

export const kanalKapalıHata = "Sistemde bir kanal ayarlanmadığı için öneri yapamazsınız.";
export const kanalGeçersizHata = "Sistemde belirtilen kanal geçersiz olduğu için öneri sistemi çalışmayacaktır.";
export const kanalYokHata = "Belirtilen kanal bulunamadı.";
export const kanalIdHata = "Geçerli bir kanal idsi giriniz.";
export const kanalAyarBaşarı = "Kanal başarıyla {0} olarak ayarlandı.";
export const kanalDurum = "🔍 Geçerli kanal: {0}";

export const sistemKapalıHata = "Sistem kapalı olduğu için öneri yapamazsınız.";
export const sistemSilBaşarı = "Sistem başarıyla silindi.";
export const sistemKapatBaşarı = "Sistem başarıyla donduruldu.";
export const sistemAçBaşarı = "Sistem başarıyla açıldı.";
export const sistemYokHata = "Sistem silindiği için mevcut önerileriniz çalışmayacaktır.";
export const sistemDurum = "🔍 Şu anki durum: {0}";

export const yetkiSunucuSahibiHata = "👑 Bunu kullanmak için sunucu sahibi olmanız gerekmektedir.";
export const yetkisizHata = "🛡️ Bunu kullanmak için yetkiniz yoktur.";
export const yetkiRolEksikHata = "🛡️ Bunu kullanmak için ayarlanmış rol sizde yoktur.";
export const yetkiAyarlaBaşarı = "👮 Yetkili rolü {0} olarak ayarlandı.";
export const yetkiSilBaşarı = "🗑️ Yetkili rolü silindi.";
export const yetkiYanlışHata = "🔍 Verilen yetki rolü hatalı.";

export const öneriOluşturBaşarı = [
  "💡 Öneriniz {0} kanalında, {1} mesajında ve {2} alt başlığında oluşturulmuştur.",
  "📥 Kabul edilirse veya reddedilirse size ulaşılacaktır.",
].join("\n");

export const destekKendin = "🫂 Kendi önerine destek veremezsin.";
export const destekBaşarı = "🔼 Başarıyla [öneriye]({0}) destek verdiniz.";
export const destekUyarı = "🔃 Kararınızı değiştirmiş bulunmaktasınız.";
export const destekKaldır = "😐 Artık [öneriyi]({0}) desteklemiyorsunuz.";

export const redKendin = "🫂 Kendi önerini reddedemezsin.";
export const redBaşarı = "🔽 Başarıyla [öneriyi]({0}) reddettiniz.";
export const redUyarı = "🔃 Kararınızı değiştirmiş bulunmaktasınız.";
export const redKaldır = "😐 Artık [öneriyi]({0}) reddetmiyorsunuz.";

export const dmÖneriNumara = `Öneri numarası: ${bold("{0}")}`;
export const dmÖneriSunucu = `Sunucu adı: ${bold("{0}")}`;

export const dmÖneriKabulBaşlık = "Öneriniz kabul edildi";
export const dmÖneriKabulYetkili = `Kabul eden yetkili: ${bold("{0}")}`;
export const dmÖneriKabulBaşarı = "Başarıyla öneriyi kabul ettiniz.";

export const dmÖneriRedBaşlık = "Öneriniz reddedildi";
export const dmÖneriRedYetkili = `Reddeden yetkili: ${bold("{0}")}`;
export const dmÖneriRedSebep = `Sebep: ${bold("{0}")}`;
export const dmÖneriRedBaşarı = "Başarıyla öneriyi reddettiniz.";

export const dmZatenHata = "📦 Öneri zaten kabul edilmiş veya reddedilmiş.";
export const dmÖneriHata = [
  "📫 Kullanıcıya mesaj gönderme başarısız.",
  "🔍 Kullanıcının özel mesajlarının açık olduğundan emin olup tekrar deneyiniz.",
].join("\n");
