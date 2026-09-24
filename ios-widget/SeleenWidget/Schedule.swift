import Foundation

struct DayPlan {
    let label: String
    let title: String
    let muscles: String
    let exercises: [String]
    var isRest: Bool { exercises.isEmpty }
}

// مطابق لـ src/seleen/data/workouts.js — المفتاح: رقم يوم الأسبوع في Calendar (1 = الأحد)
let SCHEDULE: [Int: DayPlan] = [
    7: DayPlan(label: "السبت", title: "قوة الجزء العلوي", muscles: "صدر • أكتاف • تراي • باي • بطن",
               exercises: ["ضغط صدر بالدمبل", "تفتيح صدر مائل", "ضغط كتف جالس", "رفرفة جانبية", "تمديد ترايسبس بالحبل", "بايسبس بالدمبل", "بلانك"]),
    1: DayPlan(label: "الأحد", title: "أرجل وقلوتس", muscles: "أرجل • مؤخرة • سمانة",
               exercises: ["سكوات الكأس", "هيب ثرست", "سكوات بلغاري", "رفعة رومانية", "فتح الورك", "رفع السمانة"]),
    2: DayPlan(label: "الاثنين", title: "ظهر وذراعان", muscles: "ظهر • تراي • باي • كتف خلفي",
               exercises: ["سحب علوي", "تجديف جالس", "فيس بول", "رفرفة كتف خلفي", "دفع ترايسبس", "هامر كيرل"]),
    3: DayPlan(label: "الثلاثاء", title: "قوة الأرجل", muscles: "أمامية • خلفية • سمانة",
               exercises: ["دفع الأرجل", "لانجز خلفي", "تمديد الأرجل", "ثني الأرجل", "صعود الصندوق", "رفع السمانة"]),
    4: DayPlan(label: "الأربعاء", title: "تمارين عامة", muscles: "كامل الجسم • لياقة • توازن",
               exercises: ["سكوات مع ضغط كتف", "تجديف دمبل", "ضغط أرضي", "صعود الصندوق", "ديد بغ", "دراجة خفيفة"]),
    5: DayPlan(label: "الخميس", title: "استشفاء نشط", muscles: "كارديو خفيف • مرونة • تنفّس",
               exercises: ["مشي سريع", "حركة كامل الجسم", "إطالة الورك والخلفية", "تنفّس واسترخاء"]),
    6: DayPlan(label: "الجمعة", title: "يوم راحة", muscles: "OFF", exercises: []),
]

var riyadhCalendar: Calendar {
    var cal = Calendar(identifier: .gregorian)
    cal.timeZone = TimeZone(identifier: "Asia/Riyadh")!
    return cal
}

func plan(for date: Date) -> DayPlan {
    SCHEDULE[riyadhCalendar.component(.weekday, from: date)]!
}
