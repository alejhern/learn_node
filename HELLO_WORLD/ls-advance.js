const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");

async function ls(dir = ".") {
  let files;

  try {
    files = await fs.readdir(dir);
  } catch {
    console.error(`cannot access '${dir}': No such file or directory`);
    process.exit(1);
  }

  const results = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);

      try {
        const stats = await fs.stat(filePath);

        return {
          name: file,
          stats,
        };
      } catch {
        return null;
      }
    }),
  );

  const filtered = results.filter(Boolean);

  filtered.sort((a, b) => a.name.localeCompare(b.name));

  for (const f of filtered) {
    const stats = f.stats;

    // 📌 tipo de archivo
    const type = stats.isDirectory() ? "d" : "-";

    // 📌 permisos (modo Linux básico)
    const mode = stats.mode.toString(8).slice(-3);

    const perms = (p) => {
      const n = parseInt(p, 10);
      return [n & 4 ? "r" : "-", n & 2 ? "w" : "-", n & 1 ? "x" : "-"].join("");
    };

    const permissionString =
      type + perms(mode[0]) + perms(mode[1]) + perms(mode[2]);

    // 📌 links (simplificado)
    const links = 1;

    // 📌 usuario / grupo (simplificado)
    const user = os.userInfo().username;
    const group = user;

    // 📌 tamaño
    const size = String(stats.size).padStart(6, " ");

    // 📌 fecha estilo ls
    const date = stats.mtime.toString().split(" ").slice(1, 5).join(" ");
    color = stats.isDirectory() ? "\x1b[34m" : "\x1b[0m"; // Azul para directorios
    console.log(
      `${color}${permissionString} ${links} ${user} ${group} ${size} ${date} ${f.name}\x1b[0m`,
    );
  }
}

ls(process.argv[2] || ".");
