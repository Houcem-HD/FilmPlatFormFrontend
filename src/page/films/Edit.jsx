import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container } from "reactstrap";
import axios from '../../plugins/axios';
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditFilm = () => {
  document.title = "Edit Film";

  const { id } = useParams(); // Get film ID from URL parameters
  const navigate = useNavigate();

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

  // Fetch existing film data
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(`film/${id}`);
        const data = response.data;
        setFormData({
          nom: data.nom,
          description: data.description,
          date_created: data.date_created,
          duree: data.duree,
          prix: data.prix,
          poster: null, // Poster will not be pre-filled as a file
          id_categorie: data.id_categorie,
          id_acteur_principal: data.id_acteur_principal,
          id_acteur_secondaire: data.id_acteur_secondaire,
          id_editeur: data.id_editeur,
          id_langue: data.id_langue,
          id_realisateur: data.id_realisateur
        });
      } catch (err) {
        console.error("Error fetching film data:", err);
        setError("Failed to load film data.");
      }
    };

    fetchFilm();
  }, [id]);

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
      if (formData[key] !== null) { // Avoid appending null values
        payload.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(`film/${id}?_method=PUT`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 200) {
        navigate("/filmsListAdmin");
      }
    } catch (err) {
      console.error("Error updating film:", err);
      setError("Failed to update film. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Edit Film" />
          <Col lg={12}>
            <Card>
              <CardBody>
                <h4 className="card-title">Modifier un Film</h4>
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
                      {formData.poster && <small>Poster already exists; upload a new one to replace.</small>}
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
                        {isSubmitting ? "Updating..." : "Update Film"}
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

export default EditFilm;
