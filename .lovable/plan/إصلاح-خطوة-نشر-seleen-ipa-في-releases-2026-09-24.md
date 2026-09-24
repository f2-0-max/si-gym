# إصلاح خطوة نشر Seleen.ipa في Releases

## التشخيص (من سجلات GitHub)
بناء التطبيق والويدجت **نجح بالكامل** في المحاولة #5، بما في ذلك تجهيز ملف `Seleen.ipa`. الفشل في الخطوة الأخيرة فقط: GitHub يرفض استبدال الملف داخل الإصدار القديم «latest» لأنه أصبح مقفلًا (immutable release) بعد المحاولة الأولى الناجحة. لذلك فشلت كل المحاولات من #2 إلى #5 بنفس السبب.

## الإصلاح
- نشر كل بناء في إصدار جديد برقم مستقل (مثل `build-6`، `build-7`) بدل إعادة استخدام «latest»، وتعليمه كأحدث إصدار.
- بهذا يظهر أعلى صفحة Releases دائمًا أحدث `Seleen.ipa`.

## الآن فورًا (قبل الإصلاح)
الملف موجود أصلًا في المحاولة #5: افتحها ← Artifacts ← `Seleen-ipa` (ينزل كملف zip يحتوي `Seleen.ipa`).

## التفاصيل التقنية
- `.github/workflows/ios-ipa.yml`: في خطوة `softprops/action-gh-release` تغيير `tag_name` إلى `build-${{ github.run_number }}` و`name` إلى `Seleen #${{ github.run_number }}` مع إبقاء `make_latest: true`.
- تحديث `IOS-BUILD.md`: «نزّل أحدث إصدار من Releases».
