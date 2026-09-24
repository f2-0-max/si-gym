# بناء ملف Seleen.ipa سحابيًا عبر GitHub (بدون ماك)

## الفكرة
نضيف ملف أتمتة إلى المشروع. بما أن GitHub مربوط، سيصل الملف تلقائيًا إلى مستودعك، وسيبني سيرفر ماك سحابي مجاني من GitHub ملف `Seleen.ipa` غير موقّع. بعدها تنزّله من Safari على آيفونك وتوقّعه في متجرك.

## ما سأنفذه
1. **ملف أتمتة للبناء** يعمل في حالتين: تلقائيًا مع كل تحديث، أو يدويًا بزر "Run workflow" من صفحة GitHub.
   - يجهّز مشروع iOS من إعداد Capacitor الحالي
   - يضع أيقونة سـيّلين وشاشة البداية الجاهزة
   - يضبط اسم التطبيق الظاهر على الآيفون: سـيّلين
   - يبني التطبيق بدون توقيع (التوقيع يتم في متجرك)
   - يغلّفه كملف `Seleen.ipa`
2. **رابط تنزيل مباشر للآيفون**: ينشر الملف في صفحة "Releases" بالمستودع، فيُنزَّل من Safari بضغطة واحدة دون فك ضغط.
3. **إصلاح بسيط في إعداد iOS**: إزالة خيار تقييد النطاقات لأنه قد يمنع فتح الموقع داخل التطبيق إن لم يُضبط بالكامل.
4. **دليل عربي مختصر** بدل دليل الماك: كيف تشغّل البناء من الآيفون، وأين تجد الملف، وكيف توقّعه.

## ما ستفعله أنت من الآيفون
1. افتح مستودعك على github.com في Safari ← تبويب **Actions** ← انتظر علامة الصح الخضراء (10–15 دقيقة تقريبًا).
2. افتح **Releases** ← نزّل `Seleen.ipa`.
3. شارك الملف إلى متجرك/أداة التوقيع ← **توقيع وتثبيت**.

## ملاحظات
- التطبيق يعرض النسخة المنشورة، لذلك أي تحديث تنشره يظهر داخله فورًا دون إعادة تثبيت.
- لا تغيير على التصميم أو التمارين أو التقدم المحفوظ.
- إن تعطل البناء أول مرة، أرسل لي لقطة من صفحة Actions وأصلحه.

## تفاصيل تقنية
- `.github/workflows/ios-ipa.yml` على `macos-latest`: `bun install` ← `npx cap add ios` ← نسخ `resources/` عبر `@capacitor/assets generate --ios` ← `PlistBuddy` لإضافة `CFBundleDisplayName` ← `npx cap sync ios` ← `xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Release -sdk iphoneos -destination generic/platform=iOS CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO build` ← نسخ `App.app` إلى `Payload/` و`zip -r Seleen.ipa Payload`.
- رفع كـ artifact + `softprops/action-gh-release` بوسم `latest` (صلاحية `contents: write`).
- حذف `limitsNavigationsToAppBoundDomains` من `capacitor.config.ts` (يتطلب `WKAppBoundDomains` في Info.plist).
- تحديث `IOS-BUILD.md` و`roadmap.md`.
