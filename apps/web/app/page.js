const quickSteps = [
  "填写 5 个问题，获取路线图",
  "选择 1 个方向并完成 MVP 验证",
  "每周复盘并迭代路线图"
];

export default function HomePage() {
  return (
    <section className="hero">
      <div>
        <h1>AI 副业路线图生成器</h1>
        <p>
          面向独立开发者的练中学 MVP：用最小输入生成 6–12 个月行动计划，
          帮你更快启动与上线。
        </p>
        <div className="cta">
          <button type="button">开始生成路线图</button>
          <button type="button" className="ghost">
            查看示例
          </button>
        </div>
      </div>
      <div className="card">
        <h2>快速起步</h2>
        <ul>
          {quickSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
