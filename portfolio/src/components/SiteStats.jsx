import { useEffect, useState } from "react";

export default function VisitCounter() {
  const [count, setCount] = useState("...");

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/hanqingyan.top/visits")
      .then((r) => r.json())
      .then((d) => setCount(d.value.toLocaleString()))
      .catch(() => setCount("..."));
  }, []);

  return (
    <div className="visits">
      全站访问次数：{count} 次
    </div>
  );
}
