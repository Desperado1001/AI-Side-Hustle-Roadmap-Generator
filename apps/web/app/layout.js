import "../styles/globals.css";

export const metadata = {
  title: "AI Side-Hustle Roadmap Generator",
  description: "MVP scaffold for indie developers"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
