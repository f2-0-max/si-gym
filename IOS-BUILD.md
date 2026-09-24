# بناء سـيّلين كتطبيق iOS (IPA)

هذا الدليل يشرح كيف تبني ملف `.ipa` من هذا المشروع وتوقّعه بشهادتك.

## المتطلبات
- جهاز **Mac** عليه أحدث **Xcode**
- حساب مطوّر Apple (شهادتك + Provisioning Profile)
- [Bun](https://bun.sh) أو Node.js على الـ Mac

## لماذا يعمل التطبيق بهذه الطريقة؟
التطبيق مبني على بنية SSR (TanStack Start)، لذلك الغلاف الأصلي يحمّل النسخة المنشورة
`https://si-gym.lovable.app` داخل التطبيق مباشرة (مضبوط في `capacitor.config.ts`).
النتيجة: تطبيق حقيقي بأيقونة وشاشة بداية وتوقيعك، ويتحدث تلقائيًا مع كل تحديث تنشره —
بدون إعادة بناء الـ IPA عند تعديل المحتوى.

## الخطوات

### 1) سحب المشروع على الـ Mac
```bash
git clone <رابط المستودع>
cd <المشروع>
bun install
```

### 2) إنشاء مشروع iOS (أول مرة فقط)
```bash
npx cap add ios
npx cap sync ios
```

### 3) توليد الأيقونات وشاشة البداية (اختياري — الأصول جاهزة في resources/)
```bash
bun add -d @capacitor/assets
npx capacitor-assets generate --ios
```

### 4) فتح المشروع في Xcode
```bash
npx cap open ios
```

### 5) التوقيع بشهادتك
1. في Xcode اختر مشروع **App** → target **App**
2. تبويب **Signing & Capabilities**
3. فعّل **Automatically manage signing** واختر **Team** الخاص بك
   (أو ألغِها واختر الـ Provisioning Profile يدويًا)
4. تأكد أن **Bundle Identifier** = `com.seleen.fitness`
   (أو غيّره ليطابق ملف التوفير الخاص بك — وغيّره أيضًا في `capacitor.config.ts`)

### 6) اسم التطبيق بالعربية (اختياري)
في Xcode: target → Info → أضف `CFBundleDisplayName` = `سـيّلين`

### 7) تصدير الـ IPA
1. اختر جهازًا عامًا: **Any iOS Device (arm64)**
2. من القائمة: **Product → Archive**
3. بعد اكتمال الأرشفة: **Distribute App**
   - للتثبيت على أجهزتك: **Ad Hoc** أو **Development**
   - للنشر: **App Store Connect**
4. ستحصل على ملف `.ipa` جاهز للتثبيت عبر Finder / Apple Configurator / TestFlight

## بعد أي تعديل على الكود
طالما التطبيق يحمّل النسخة المنشورة، يكفي نشر التحديث من Lovable — لا حاجة لإعادة بناء IPA
إلا إذا أضفت إضافات أصلية (Plugins) جديدة.

## لاحقًا: ويدجت الشاشة الرئيسية
الآن أصبح ممكنًا إضافة ويدجت حقيقي عبر **WidgetKit Extension** من داخل Xcode
(File → New → Target → Widget Extension) — وهو ما كان مستحيلًا مع نسخة الويب.
