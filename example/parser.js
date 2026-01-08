//
// Example mapping function
//
// use:
// parse(alarmText, regexJson);
//

function parse(line, cfg) {
  return Object.fromEntries(
    Object.entries(cfg.fields).map(([k, d]) => {
      const m = new RegExp(d.regex, cfg.flags ?? "").exec(line);

      let v = m ? (k === "object" ? (m[1] ?? m[2]) : m[1]) : null;
      v = v?.trim?.() ?? null;

      if (!v) return [k, null];

      if (d.type === "int") {
        const n = parseInt(v, 10);
        return [k, Number.isFinite(n) ? n : null];
      }

      if (d.type === "float") {
        const n = parseFloat(v.replace(",", "."));
        return [k, Number.isFinite(n) ? n : null];
      }

      return [k, v];
    })
  );
}