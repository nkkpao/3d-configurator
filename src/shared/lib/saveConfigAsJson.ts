export function saveConfigAsJson(config: object, filename = "config.json") {
  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href);
}
