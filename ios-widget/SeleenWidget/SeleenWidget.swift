import WidgetKit
import SwiftUI

struct Entry: TimelineEntry { let date: Date }

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> Entry { Entry(date: Date()) }
    func getSnapshot(in context: Context, completion: @escaping (Entry) -> Void) { completion(Entry(date: Date())) }
    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
        let now = Date()
        let cal = riyadhCalendar
        let midnight = cal.startOfDay(for: cal.date(byAdding: .day, value: 1, to: now)!)
        completion(Timeline(entries: [Entry(date: now), Entry(date: midnight)], policy: .after(midnight)))
    }
}

let ivory = Color(red: 0.969, green: 0.945, blue: 0.910)
let ink = Color(red: 0.10, green: 0.09, blue: 0.08)
let burgundy = Color(red: 0.45, green: 0.12, blue: 0.16)

func arabicDate(_ d: Date) -> String {
    let f = DateFormatter()
    f.locale = Locale(identifier: "ar-SA@calendar=gregorian;numbers=arab")
    f.timeZone = TimeZone(identifier: "Asia/Riyadh")
    f.dateFormat = "d MMMM"
    return f.string(from: d)
}

func arabicNum(_ n: Int) -> String {
    let f = NumberFormatter()
    f.locale = Locale(identifier: "ar-SA@numbers=arab")
    return f.string(from: NSNumber(value: n)) ?? "\(n)"
}

struct SeleenWidgetView: View {
    @Environment(\.widgetFamily) var family
    let entry: Entry

    var body: some View {
        let p = plan(for: entry.date)
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(p.label).font(.caption.bold()).foregroundColor(burgundy)
                Spacer()
                Text("سـيّلين").font(.caption2).foregroundColor(ink.opacity(0.5))
            }
            if family == .systemMedium {
                Text(arabicDate(entry.date)).font(.caption2).foregroundColor(ink.opacity(0.6))
            }
            Spacer(minLength: 2)
            Text(p.title).font(.headline).foregroundColor(ink).lineLimit(2)
            if p.isRest {
                Text("راحة مستحقة").font(.caption).foregroundColor(ink.opacity(0.6))
            } else if family == .systemMedium {
                Text(p.muscles).font(.caption2).foregroundColor(ink.opacity(0.6)).lineLimit(1)
                ForEach(p.exercises.prefix(3), id: \.self) { e in
                    Text("• \(e)").font(.caption2).foregroundColor(ink).lineLimit(1)
                }
            } else {
                Text("\(arabicNum(p.exercises.count)) تمارين").font(.caption).foregroundColor(ink.opacity(0.6))
            }
        }
        .environment(\.layoutDirection, .rightToLeft)
        .containerBackground(ivory, for: .widget)
    }
}

@main
struct SeleenWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "SeleenWidget", provider: Provider()) { entry in
            SeleenWidgetView(entry: entry)
        }
        .configurationDisplayName("سـيّلين")
        .description("تمرين اليوم من جدولك")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
