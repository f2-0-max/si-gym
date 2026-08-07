import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - JSX app module ported from the uploaded project
import App from "@/seleen/App.jsx";

const title = "سـيّلين — جدول تمارين أسبوعي";
const description =
  "جدول رياضي عربي يعرض تمرين اليوم تلقائيًا بتوقيت الرياض مع الجولات والعدات وتتبع الإنجاز.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <App />;
}
