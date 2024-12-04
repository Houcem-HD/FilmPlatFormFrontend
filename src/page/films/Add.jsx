import React, { useState } from "react";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
                      <input
                        className="form-control"
                        type="number"
                        name="id_categorie"
                        value={formData.id_categorie}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">ID Acteur Principal</label>
                      <input
                        className="form-control"
                        type="number"
                        name="id_acteur_principal"
                        value={formData.id_acteur_principal}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <label className="form-label">ID Acteur Secondaire</label>
                      <input
                        className="form-control"
                        type="number"
                        name="id_acteur_secondaire"
                        value={formData.id_acteur_secondaire}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">ID Editeur</label>
                      <input
                        className="form-control"
                        type="number"
                        name="id_editeur"
                        value={formData.id_editeur}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <label className="form-label">ID Langue</label>
                      <input
                        className="form-control"
                        type="number"
                        name="id_langue"
                        value={formData.id_langue}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg={6}>
                      <label className="form-label">ID Réalisateur</label>
                      <input
                        className="form-control"
                        type="number"
                        name="id_realisateur"
                        value={formData.id_realisateur}
                        onChange={handleInputChange}
                        required
                      />
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
