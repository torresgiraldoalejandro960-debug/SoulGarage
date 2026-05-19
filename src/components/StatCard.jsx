export default function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className="
        bg-[#151515]
        border
        border-white/10
        rounded-3xl
        p-4
        md:p-6
        hover:scale-[1.02]
        transition-all
        duration-300
      "
    >
      <p className="text-gray-400 text-xs md:text-sm">
        {title}
      </p>

      <h2
        className="
          text-2xl
          md:text-4xl
          font-bold
          mt-4
          break-words
        "
        style={{ color }}
      >
        {value}
      </h2>
    </div>
  );
}