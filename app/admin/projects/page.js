"use client";
import styles from "./projectManagement.module.css";
import { useState, useEffect } from "react";
import {
  Github,
  Globe,
  Info,
  Linkedin,
  Plus,
  Trash,
  Edit,
  User,
} from "lucide-react";

const endpoint = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: [],
    features: [],
    links: [],
    collaborators: [],
  });
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [collaboratorName, setCollaboratorName] = useState("");
  const [collaboratorRole, setCollaboratorRole] = useState("");
  const [token, setToken] = useState("");

  // Fetch projects on load
  useEffect(() => {
    fetchProjects();
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint + "/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        tech: [...formData.tech, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTech = (index) => {
    setFormData({
      ...formData,
      tech: formData.tech.filter((_, i) => i !== index),
    });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [
        ...formData.links,
        {
          url: "",
          icon: "Globe",
          text: "",
        },
      ],
    });
  };

  const updateLink = (index, field, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, links: updatedLinks });
  };

  const removeLink = (index) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index),
    });
  };

  const addCollaborator = () => {
    if (collaboratorName.trim()) {
      setFormData({
        ...formData,
        collaborators: [
          ...formData.collaborators,
          {
            name: collaboratorName.trim(),
            role: collaboratorRole.trim() || "Contributor",
          },
        ],
      });
      setCollaboratorName("");
      setCollaboratorRole("");
    }
  };

  const removeCollaborator = (index) => {
    setFormData({
      ...formData,
      collaborators: formData.collaborators.filter((_, i) => i !== index),
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tech: [],
      features: [],
      links: [],
      collaborators: [],
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Validate form
      if (
        !formData.title ||
        !formData.description ||
        formData.tech.length === 0 ||
        formData.features.length === 0 ||
        formData.links.length === 0
      ) {
        setError("Please fill all required fields");
        return;
      }

      let response;

      if (isEditing) {
        response = await fetch(`${endpoint}/api/projects/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(endpoint + "/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      resetForm();
      fetchProjects();
      setSuccess(
        isEditing
          ? "Project updated successfully!"
          : "Project added successfully!"
      );
    } catch (error) {
      console.error("Error saving project:", error);
      setError(error.message || "Failed to save project");
    }
  };

  const editProject = (project) => {
    const formattedLinks = project.links.map((link) => ({
      ...link,
      icon:
        typeof link.icon === "string"
          ? link.icon
          : link.icon === Github
          ? "Github"
          : link.icon === Globe
          ? "Globe"
          : link.icon === Info
          ? "Info"
          : link.icon === Linkedin
          ? "Linkedin"
          : "Globe",
    }));

    setFormData({
      ...project,
      links: formattedLinks,
    });
    setIsEditing(true);
    setEditId(project.id);
  };

  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`${endpoint}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });

      if (!response.ok) throw new Error("Failed to delete project");

      fetchProjects();
      setSuccess("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Project Management</h1>

      {error && <div className={styles.alertError}>{error}</div>}
      {success && <div className={styles.alertSuccess}>{success}</div>}

      <div className={styles.formContainer}>
        <h2 className={styles.sectionTitle}>
          {isEditing ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.titleInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Technologies</label>
            <div className={styles.flexRow}>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className={`${styles.input} ${styles.inputWithButton}`}
                placeholder="Add a technology"
              />
              <button
                type="button"
                onClick={addTech}
                className={styles.addButton}
              >
                Add
              </button>
            </div>
            <div className={styles.tagContainer}>
              {formData.tech.map((tech, index) => (
                <div key={index} className={styles.tag}>
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(index)}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Features</label>
            <div className={styles.flexRow}>
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                className={`${styles.input} ${styles.inputWithButton}`}
                placeholder="Add a feature"
              />
              <button
                type="button"
                onClick={addFeature}
                className={styles.addButton}
              >
                Add
              </button>
            </div>
            <div className={styles.featuresContainer}>
              {formData.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Links</label>
            <button
              type="button"
              onClick={addLink}
              className={styles.addLinkButton}
            >
              <Plus size={16} /> Add Link
            </button>

            <div className={styles.linksContainer}>
              {formData.links.map((link, index) => (
                <div key={index} className={styles.linkItem}>
                  <div className={styles.linkForm}>
                    <div className={styles.formGroup}>
                      <label className={styles.smallLabel}>URL</label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) =>
                          updateLink(index, "url", e.target.value)
                        }
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.smallLabel}>Type</label>
                      <input
                        type="text"
                        value={link.text}
                        onChange={(e) =>
                          updateLink(index, "text", e.target.value)
                        }
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.smallLabel}>Icon</label>
                      <select
                        value={link.icon}
                        onChange={(e) =>
                          updateLink(index, "icon", e.target.value)
                        }
                        className={styles.select}
                      >
                        <option value="Github">GitHub</option>
                        <option value="Globe">Globe</option>
                        <option value="Info">Info</option>
                        <option value="Linkedin">LinkedIn</option>
                      </select>
                    </div>
                    <div
                      className={styles.formGroup}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className={styles.dangerButton}
                        style={{ marginTop: "1.5rem" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Collaborators</label>
            <div className={styles.flexRow}>
              <input
                type="text"
                value={collaboratorName}
                onChange={(e) => setCollaboratorName(e.target.value)}
                className={`${styles.input} ${styles.inputWithButton}`}
                placeholder="Collaborator name"
                style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
              />
              <input
                type="text"
                value={collaboratorRole}
                onChange={(e) => setCollaboratorRole(e.target.value)}
                className={styles.input}
                placeholder="Role (optional)"
                style={{
                  borderRadius: "0",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
              <button
                type="button"
                onClick={addCollaborator}
                className={styles.addButton}
              >
                Add
              </button>
            </div>
            <div className={styles.collaboratorsContainer}>
              {formData.collaborators.map((collab, index) => (
                <div key={index} className={styles.collaboratorItem}>
                  <div className={styles.collaboratorInfo}>
                    <User size={16} />
                    <span className={styles.collaboratorName}>
                      {collab.name}
                    </span>
                    {collab.role && (
                      <span className={styles.collaboratorRole}>
                        • {collab.role}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCollaborator(index)}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <button type="submit" className={styles.primaryButton}>
              {isEditing ? "Update Project" : "Add Project"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className={styles.secondaryButton}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className={styles.sectionTitle}>Existing Projects</h2>

        {loading ? (
          <p className={styles.loading}>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className={styles.emptyState}>
            No projects found. Add your first project above.
          </p>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => editProject(project)}
                      className={styles.editButton}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className={styles.deleteButton}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
                <p className={styles.projectDescription}>
                  {project.description.substring(0, 100)}...
                </p>
                <div className={styles.techList}>
                  {project.tech.map((tech, i) => (
                    <span key={i} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
