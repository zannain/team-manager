import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "SeasonTrack" },
    { name: "description", content: "Welcome to SeasonTrack!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>SeasonTrack</h1>
    </div>
  );
}
