const EMAIL = "shuchismita.anwar@gmail.com"
const PUBLICATIONS_URL = "./data/publications.json"

const projects = [
  {
    title: "Object Detection with YOLO and EfficientNet",
    description:
      "Built an end-to-end object detection system on Pascal VOC 2012, combining EfficientNet with a YOLO-style architecture. Implemented custom data preprocessing, augmentation, and loss functions, with optimized training and evaluation on COCO images. The framework outputs accurate bounding boxes and class predictions with visualization support.",
    github: "https://github.com/shuchismita-anwar/YOLO-object-detection",
  },
  {
    title: "ResNet50 U-Net-Style Semantic Segmentation",
    description:
      "Deep learning framework for segmentation that combines ResNet50-style encoders with a U-Net decoder, including custom augmentation, loss tuning, and evaluation visualizations for high-quality masks.",
    github: "https://github.com/shuchismita-anwar/Image-Segmentation/tree/main",
  },
  {
    title: "Emotion Recognition: CNNs, Transfer Learning, and Vision Transformers",
    description:
      "End-to-end emotion detection system (angry/happy/sad) with TensorFlow/Keras: custom LeNet/ResNet34, EfficientNet and MobileNetV2 transfer learning, Vision Transformers (custom ViT plus HuggingFace ViT), tf.data loaders, on-the-fly augmentation, W&B tracking, Grad-CAM explainability, ONNX and TFLite export with quantization and pruning, TFRecords for scalable I/O, and simple model ensembling.",
    github: "https://github.com/shuchismita-anwar/emotion-detection/tree/master",
  },
  {
    title: "Lightweight CNN with Quantum-Augmentation on PneumoniaMNIST",
    description:
      "Class-balanced PneumoniaMNIST classifier using PyTorch with oversampling, a compact ~21k-parameter CNN, and rigorous evaluation (ROC, PR, confusion matrix). Includes a prototype differentiable Qiskit circuit layer explored as a plug-in feature extractor alongside the classical pipeline.",
    github:
      "https://github.com/shuchismita-anwar/Hybrid-quantum-classical-Neural-Networks-with-PyTorch-and-Qiskit/tree/master",
  },
  {
    title: "Interactive 8-Ball Pool Game with OpenGL in Python",
    description:
      "2D billiards mini-game built with PyOpenGL/GLUT and Tkinter: aimable cue, smooth ball animation, mouse-driven angle and strength, pocket selection, and procedural drawing without external assets.",
    github: "https://github.com/shuchismita-anwar/8-Ball-Pool/tree/master",
  },
  {
    title: "Stroke Prediction using Machine Learning",
    description:
      "End-to-end stroke prediction pipeline on structured healthcare data including cleaning, encoding, scaling, SMOTENC oversampling, and model comparison across Logistic Regression, KNN, Decision Trees, SVMs, Neural Networks, and Random Forests with full evaluation and visualization.",
    github: "https://github.com/shuchismita-anwar/Heart-Stroke-Prediction/tree/master",
  },
]

let visibleProjects = 3

document.addEventListener("DOMContentLoaded", () => {
  wireEmailCopy()
  renderProjects()
  wireLoadMore()
  fetchPublications()
})

function wireEmailCopy() {
  const copyButton = document.getElementById("copy-email")
  const contactButton = document.getElementById("contact-email")
  const emailText = document.getElementById("contact-email-text")

  if (emailText) {
    emailText.textContent = EMAIL
  }

  const handleCopy = async () => {
    const status = document.getElementById("copy-status")
    try {
      await navigator.clipboard.writeText(EMAIL)
      if (status) {
        status.textContent = "Copied!"
        setTimeout(() => (status.textContent = ""), 1800)
      }
    } catch (err) {
      if (status) {
        status.textContent = "Copy failed"
        setTimeout(() => (status.textContent = ""), 1800)
      }
      console.error("Copy failed:", err)
    }
  }

  if (copyButton) copyButton.addEventListener("click", handleCopy)
  if (contactButton) contactButton.addEventListener("click", handleCopy)
}

function renderProjects() {
  const list = document.getElementById("projects-list")
  const loadMoreBtn = document.getElementById("load-more")
  if (!list) return

  list.innerHTML = ""
  projects.slice(0, visibleProjects).forEach((project) => {
    const card = document.createElement("div")
    card.className = "card"

    const title = document.createElement("div")
    title.className = "project-title"
    title.textContent = project.title

    const desc = document.createElement("p")
    desc.textContent = project.description

    const links = document.createElement("div")
    links.className = "project-links"
    const github = document.createElement("a")
    github.href = project.github
    github.target = "_blank"
    github.rel = "noopener noreferrer"
    github.className = "btn ghost"
    github.textContent = "GitHub"
    links.appendChild(github)

    card.appendChild(title)
    card.appendChild(desc)
    card.appendChild(links)
    list.appendChild(card)
  })

  if (loadMoreBtn) {
    if (visibleProjects >= projects.length) {
      loadMoreBtn.style.display = "none"
    } else {
      loadMoreBtn.style.display = "inline-flex"
    }
  }
}

function wireLoadMore() {
  const loadMoreBtn = document.getElementById("load-more")
  if (!loadMoreBtn) return
  loadMoreBtn.addEventListener("click", () => {
    visibleProjects = Math.min(visibleProjects + 3, projects.length)
    renderProjects()
  })
}

async function fetchPublications() {
  const container = document.getElementById("publications-list")
  const errorText = document.getElementById("publications-error")
  if (!container) return

  try {
    const res = await fetch(PUBLICATIONS_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    renderPublications(data)
  } catch (err) {
    if (errorText) errorText.hidden = false
    console.error("Failed to load publications:", err)
  }
}

function renderPublications(publications) {
  const container = document.getElementById("publications-list")
  const errorText = document.getElementById("publications-error")
  if (!container) return

  container.innerHTML = ""
  if (errorText) errorText.hidden = true

  publications.forEach((pub) => {
    const card = document.createElement("div")
    card.className = "card"

    const title = document.createElement("h3")
    title.textContent = pub.title

    const meta = document.createElement("div")
    meta.className = "publication-meta"
    if (pub.authors?.length) {
      const authors = document.createElement("span")
      authors.textContent = pub.authors.join(", ")
      meta.appendChild(authors)
    }
    if (pub.venue) {
      const venue = document.createElement("span")
      venue.textContent = pub.venue
      meta.appendChild(venue)
    }
    if (pub.status) {
      const badge = document.createElement("span")
      badge.className = "badge"
      badge.textContent = pub.status
      meta.appendChild(badge)
    }

    const desc = document.createElement("p")
    desc.textContent = pub.description || ""

    const links = document.createElement("div")
    links.className = "project-links"
    if (pub.preprintUrl) {
      links.appendChild(buildLink(pub.preprintUrl, "Preprint"))
    }
    if (pub.publishedUrl) {
      links.appendChild(buildLink(pub.publishedUrl, "Published"))
    }
    if (pub.codeUrl) {
      links.appendChild(buildLink(pub.codeUrl, "Code"))
    }

    const tags = document.createElement("div")
    tags.className = "publication-tags"
    ;(pub.tags || []).forEach((tag) => {
      const pill = document.createElement("span")
      pill.className = "badge"
      pill.textContent = tag
      tags.appendChild(pill)
    })

    card.appendChild(title)
    card.appendChild(meta)
    card.appendChild(desc)
    if (links.childNodes.length) card.appendChild(links)
    if (tags.childNodes.length) card.appendChild(tags)
    container.appendChild(card)
  })
}

function buildLink(url, label) {
  const link = document.createElement("a")
  link.href = url
  link.target = "_blank"
  link.rel = "noopener noreferrer"
  link.className = "btn ghost"
  link.textContent = label
  return link
}
