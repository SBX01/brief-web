const toggleSummary = document.getElementById("toggle-summary");
const summarySection = document.getElementById("summary-section");
const copySummary = document.getElementById("copy-summary");

if (toggleSummary && summarySection) {
    toggleSummary.addEventListener("click", () => {
        summarySection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

if (copySummary) {
    copySummary.addEventListener("click", async () => {
        const summaryText = document.querySelector(".output-summary")?.innerText;
        if (!summaryText) return;
        try {
            await navigator.clipboard.writeText(summaryText.trim());
            copySummary.textContent = "Resumen copiado";
            setTimeout(() => {
                copySummary.textContent = "Copiar resumen";
            }, 1800);
        } catch (error) {
            console.error("No se pudo copiar el resumen", error);
        }
    });
}

function generateBrief() {
  // 🔹 Capturar datos
  const name = document.getElementById("client-name").value;
  const company = document.getElementById("company-name").value;
  const objective = document.getElementById("objective").value;
  const colors = document.getElementById("colors").value;
  const references = document.getElementById("references").value;

  // 🔹 Tipo de proyecto
  const projectType = document.querySelector("#section-project-type select").value;

  // 🔹 Funcionalidades (checkbox)
  const features = Array.from(
    document.querySelectorAll("#section-features input:checked")
  ).map(el => el.parentElement.innerText);

  // 🔹 Estilo (radio)
  const style = document.querySelector("input[name='style']:checked")?.parentElement.innerText || "No definido";

  // 🔹 Contenido
  const contentStatus = Array.from(
    document.querySelectorAll("#section-content-status input:checked")
  ).map(el => el.parentElement.innerText);

  // 🔹 Construir resumen
  const output = `
BRIEF DEL CLIENTE

Cliente: ${name || "-"}
Empresa: ${company || "-"}

TIPO DE PROYECTO
${projectType}

OBJETIVO
${objective || "-"}

FUNCIONALIDADES
${features.length ? features.map(f => "- " + f).join("\n") : "-"}

DIRECCIÓN DE DISEÑO
${style}
Colores: ${colors || "-"}
Referencias: ${references || "-"}

ESTADO DE CONTENIDOS
${contentStatus.length ? contentStatus.map(c => "- " + c).join("\n") : "-"}
  `;

  // 🔹 Insertar en el HTML
  document.querySelector(".output-summary").innerText = output;

  // 🔹 Mostrar sección
  const summarySection = document.getElementById("summary-section");
  summarySection.classList.remove("hidden");

  // 🔹 Scroll automático (UX pro)
  summarySection.scrollIntoView({ behavior: "smooth" });
}
document.getElementById("copy-summary").addEventListener("click", () => {
  const text = document.querySelector(".output-summary").innerText;
  navigator.clipboard.writeText(text);
  summarySection.classList.add("hidden");
});
