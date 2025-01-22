import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container } from "reactstrap";
import axios from '../../plugins/axios';
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FilmForm = () => {
  document.title = "Add Film";

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    date_created: "",
    duree: "",
    prix: "",
    poster: null,
    id_categorie: "",
    id_acteur_principal: "",
    id_acteur_secondaire: "",
    id_editeur: "",
    id_langue: "",
    id_realisateur: ""
  });

  const [categories, setCategories] = useState([]);
  const [acteurs, setActeurs] = useState([]);
  const [editeurs, setEditeurs] = useState([]);
  const [langues, setLangues] = useState([]);
  const [realisateurs, setRealisateurs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, acteursRes, editeursRes, languesRes, realisateursRes] = await Promise.all([
          axios.get("categorie"),
          axios.get("acteur"),
          axios.get("editeur"),
          axios.get("langue"),
          axios.get("realisateur")
        ]);

        setCategories(categoriesRes.data);
        setActeurs(acteursRes.data);
        setEditeurs(editeursRes.data);
        setLangues(languesRes.data);
        setRealisateurs(realisateursRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dropdown data.");
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      poster: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      const response = await axios.post("film", payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 201) {
        navigate("/filmsListAdmin");
      }
    } catch (err) {
      console.error("Error submitting film:", err);
      setError("Failed to add film. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Add Film" />
          <Col lg={12}>
            <Card>
              <CardBody>
                <h4 className="card-title">Ajouter un Film</h4>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={6}>
                      <label className="form-label">Nom</label>
                      <input
                        className="form-control"
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">Description</label>
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <label className="form-label">Date Created</label>
                      <input
                        className="form-control"
                        type="number"
                        name="date_created"
                        value={formData.date_created}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">Durée</label>
                      <input
                        className="form-control"
                        type="number"
                        name="duree"
                        value={formData.duree}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <label className="form-label">Prix</label>
                      <input
                        className="form-control"
                        type="number"
                        name="prix"
                        value={formData.prix}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">Poster</label>
                      <input
                        className="form-control"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <label className="form-label">ID Catégorie</label>
                      <select
                        className="form-control"
                        name="id_categorie"
                        value={formData.id_categorie}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.nom}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">ID Acteur Principal</label>
                      <select
                        className="form-control"
                        name="id_acteur_principal"
                        value={formData.id_acteur_principal}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Actor</option>
                        {acteurs.map((acteur) => (
                          <option key={acteur.id} value={acteur.id}>
                            {acteur.nom} {acteur.prenom}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <label className="form-label">ID Acteur Secondaire</label>
                      <select
                        className="form-control"
                        name="id_acteur_secondaire"
                        value={formData.id_acteur_secondaire}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Actor</option>
                        {acteurs.map((acteur) => (
                          <option key={acteur.id} value={acteur.id}>
                            {acteur.nom} {acteur.prenom}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">ID Editeur</label>
                      <select
                        className="form-control"
                        name="id_editeur"
                        value={formData.id_editeur}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Editor</option>
                        {editeurs.map((editeur) => (
                          <option key={editeur.id} value={editeur.id}>
                            {editeur.nom} {editeur.prenom}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <label className="form-label">ID Langue</label>
                      <select
                        className="form-control"
                        name="id_langue"
                        value={formData.id_langue}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Language</option>
                        {langues.map((langue) => (
                          <option key={langue.id} value={langue.id}>
                            {langue.langues}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">ID Réalisateur</label>
                      <select
                        className="form-control"
                        name="id_realisateur"
                        value={formData.id_realisateur}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Director</option>
                        {realisateurs.map((realisateur) => (
                          <option key={realisateur.id} value={realisateur.id}>
                            {realisateur.nom}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Add Film"}
                      </button>
                    </Col>
                  </Row>
                  {error && <div className="text-danger mt-2">{error}</div>}
                </form>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FilmForm;
