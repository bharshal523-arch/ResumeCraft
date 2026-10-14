// ResumeCraft starter app: form inputs update the preview immediately.
// This version stores no resume data on a server and has no payment backend.

const $ = (id) => document.getElementById(id);

const fields = [
  "fullName", "jobTitle", "email", "phone", "location", "linkedin", "website",
  "summary", "experienceTitle", "company", "experienceDates", "experienceDetails",
  "degree", "school", "educationDates", "educationDetails", "skills",
  "projectName", "projectDetails"
];

const defaults = {};
fields.forEach((id) => { defaults[id] = $(id).value; });

function valueOf(id) {
  return $(id).value.trim();
}

function setText(id, value, fallback = "") {
  $(id).textContent = value || fallback;
}

function updatePreview() {
  setText("previewName", valueOf("fullName"), "Your Name");
  setText("previewTitle", valueOf("jobTitle"), "Professional Title");

  // Contact details are rendered as useful links where appropriate.
  // They stay in this browser page; this project has no server or database.
  const contactContainer = $("previewContact");
  contactContainer.replaceChildren();
  const contactItems = [
    { id: "location", type: "text" },
    { id: "phone", type: "phone" },
    { id: "email", type: "email" }
  ].filter((item) => valueOf(item.id));
  contactItems.forEach((item, index) => {
    if (index) contactContainer.append(document.createTextNode(" · "));
    const value = valueOf(item.id);
    if (item.type === "phone" || item.type === "email") {
      const link = document.createElement("a");
      link.textContent = value;
      link.href = item.type === "phone"
        ? `tel:${value.replace(/[^+\d]/g, "")}`
        : `mailto:${value}`;
      contactContainer.appendChild(link);
    } else {
      contactContainer.append(document.createTextNode(value));
    }
  });
  contactContainer.hidden = contactItems.length === 0;

  const linksContainer = $("previewLinks");
  linksContainer.replaceChildren();
  const profileItems = [
    { id: "linkedin", label: "LinkedIn" },
    { id: "website", label: "Portfolio / GitHub" }
  ].filter((item) => valueOf(item.id));
  profileItems.forEach((item, index) => {
    if (index) linksContainer.append(document.createTextNode(" · "));
    const raw = valueOf(item.id);
    const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const link = document.createElement("a");
    link.textContent = raw.replace(/^https?:\/\//i, "").replace(/\/$/, "");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    linksContainer.appendChild(link);
  });
  linksContainer.hidden = profileItems.length === 0;

  setText("previewSummary", valueOf("summary"));
  $("summaryBlock").hidden = !valueOf("summary");

  setText("previewExperienceTitle", valueOf("experienceTitle"));
  setText("previewExperienceDates", valueOf("experienceDates"));
  setText("previewCompany", valueOf("company"));
  setText("previewExperienceDetails", valueOf("experienceDetails").replace(/\\n/g, "\n"));
  $("experienceBlock").hidden = ![
    "experienceTitle", "experienceDates", "company", "experienceDetails"
  ].some((id) => valueOf(id));

  setText("previewDegree", valueOf("degree"));
  setText("previewEducationDates", valueOf("educationDates"));
  setText("previewSchool", valueOf("school"));
  setText("previewEducationDetails", valueOf("educationDetails"));
  $("previewEducationDetails").hidden = !valueOf("educationDetails");
  $("educationBlock").hidden = ![
    "degree", "educationDates", "school", "educationDetails"
  ].some((id) => valueOf(id));

  setText("previewProjectName", valueOf("projectName"));
  setText("previewProjectDetails", valueOf("projectDetails"));
  $("projectsBlock").hidden = !["projectName", "projectDetails"].some((id) => valueOf(id));

  const skillList = valueOf("skills").split(",").map((s) => s.trim()).filter(Boolean);
  const skillsContainer = $("previewSkills");
  skillsContainer.replaceChildren();
  skillList.forEach((skill) => {
    const tag = document.createElement("span");
    tag.className = "preview-skill";
    tag.textContent = skill;
    skillsContainer.appendChild(tag);
  });
  $("skillsBlock").hidden = skillList.length === 0;
}

fields.forEach((id) => {
  $(id).addEventListener("input", updatePreview);
});

$("templateSelect").addEventListener("change", (event) => {
  const preview = $("resumePreview");
  preview.classList.remove("template-classic", "template-modern", "template-minimal");
  preview.classList.add(`template-${event.target.value}`);
});

$("resetBtn").addEventListener("click", () => {
  const confirmed = window.confirm("Reset all fields to the example details?");
  if (!confirmed) return;
  fields.forEach((id) => { $(id).value = defaults[id]; });
  $("templateSelect").value = "classic";
  $("resumePreview").classList.remove("template-modern", "template-minimal");
  $("resumePreview").classList.add("template-classic");
  $("downloadStatus").textContent = "";
  updatePreview();
});

$("downloadBtn").addEventListener("click", async () => {
  const status = $("downloadStatus");
  const button = $("downloadBtn");
  const name = valueOf("fullName").replace(/[^a-z0-9-_ ]/gi, "").trim().replace(/\s+/g, "-") || "resume";
  const element = $("resumePreview");

  if (typeof window.html2pdf !== "function") {
    status.textContent = "PDF library did not load. Check your internet connection, then refresh this page.";
    return;
  }

  button.disabled = true;
  button.style.opacity = "0.65";
  status.textContent = "Preparing your PDF…";
  try {
    await window.html2pdf().set({
      margin: [8, 8, 8, 8],
      filename: `${name}-resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] }
    }).from(element).save();
    status.textContent = "Your PDF download should be ready.";
  } catch (error) {
    console.error("PDF export failed:", error);
    status.textContent = "PDF export failed. Try again or use a current version of Chrome or Edge.";
  } finally {
    button.disabled = false;
    button.style.opacity = "1";
  }
});

$("premiumBtn").addEventListener("click", () => {
  window.alert("Premium is a demo pricing concept only. To sell premium templates, implement a secure backend and verify payments server-side before unlocking paid features.");
});

$("year").textContent = new Date().getFullYear();
updatePreview();
