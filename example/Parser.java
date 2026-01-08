import java.util.*;
import java.util.regex.*;

public class Parser {

  public static Map<String, Object> parse(String line, Cfg cfg) {
    Map<String, Object> out = new LinkedHashMap<>();

    for (Map.Entry<String, FieldDef> e : cfg.fields.entrySet()) {
      String k = e.getKey();
      FieldDef d = e.getValue();

      Matcher m = d.pattern.matcher(line);
      if (!m.find()) {
        out.put(k, null);
        continue;
      }

      String v = null;
      if ("object".equals(k)) {
        v = firstNonEmpty(m.group(1), m.group(2));
      } else {
        v = m.groupCount() >= 1 ? m.group(1) : null;
      }

      v = (v != null) ? v.trim() : null;
      if (v == null || v.isEmpty()) {
        out.put(k, null);
        continue;
      }

      switch (d.type) {
        case INT -> {
          try {
            out.put(k, Integer.parseInt(v));
          } catch (NumberFormatException ex) {
            out.put(k, null);
          }
        }
        case FLOAT -> {
          try {
            out.put(k, Double.parseDouble(v.replace(',', '.')));
          } catch (NumberFormatException ex) {
            out.put(k, null);
          }
        }
        default -> out.put(k, v);
      }
    }

    return out;
  }

  private static String firstNonEmpty(String a, String b) {
    if (a != null && !a.trim().isEmpty()) return a;
    if (b != null && !b.trim().isEmpty()) return b;
    return null;
  }

  public enum Type { STRING, INT, FLOAT, TIME }

  public static class FieldDef {
    public final String regex;
    public final Type type;
    public final Pattern pattern;

    public FieldDef(String regex, Type type, int flags) {
      this.regex = regex;
      this.type = type;
      this.pattern = Pattern.compile(regex, flags);
    }
  }

  public static class Cfg {
    public final int flags;
    public final LinkedHashMap<String, FieldDef> fields;

    public Cfg(int flags, LinkedHashMap<String, FieldDef> fields) {
      this.flags = flags;
      this.fields = fields;
    }
  }
}
