import type { CapacitorConfig } from "@capacitor/cli";

/**
 * إعداد Capacitor لتطبيق سـيّلين على iOS.
 *
 * ملاحظة مهمة: التطبيق مبني على TanStack Start (SSR على Cloudflare Workers)،
 * لذلك لا يوجد مجلد ثابت (static) يمكن شحنه داخل الـ IPA. الحل المعتمد:
 * الغلاف الأصلي يحمّل النسخة المنشورة مباشرة عبر server.url، ويتصرف كتطبيق
 * حقيقي (standalone، أيقونة، splash، توقيع بشهادتك) مع إمكانية إضافة
 * امتدادات أصلية لاحقًا مثل WidgetKit.
 */
const config: CapacitorConfig = {
  appId: "com.seleen.fitness",
  appName: "Seleen",
  // غير مستخدم فعليًا بسبب server.url — يبقى مطلوبًا من CLI
  webDir: "dist",
  server: {
    // النسخة المنشورة من التطبيق
    url: "https://si-gym.lovable.app",
    cleartext: false,
  },
  ios: {
    contentInset: "never",
    backgroundColor: "#f7f1e8",
    preferredContentMode: "mobile",
    limitsNavigationsToAppBoundDomains: true,
  },
};

export default config;
