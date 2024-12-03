import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFilm = () => {
  const navigate = useNavigate();
  
  const [filmData, setFilmData] = useState({
    nom: '',
    description: '',
    date_created: '',
    duree: '',
    prix: '',
    poster: null,
    id_categorie: '',
    id_acteur_principal: '',
    id_acteur_secondaire: '',
    id_editeur: '',
    id_langue: '',
    id_realisateur: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilmData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFilmData((prevData) => ({
      ...prevData,
      [name]: files[0], // assuming only one file is being uploaded
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    
    // Append all form data to the FormData object, including the file
    for (const key in filmData) {
      if (filmData[key] !== null) {
        if (key === 'poster' && filmData[key] !== null) {
          formData.append(key, filmData[key], filmData[key].name);  // Ensure file is appended with a filename
        } else {
          formData.append(key, filmData[key]);
        }
      }
    }

    try {
      const response = await axios.post("http://sitehd.soft-liberty.com/api/film", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Redirect to the films list after success
      navigate("/filmsList");

    } catch (err) {
      setError("Error while adding the film.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Add New Film</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Film Name</label>
          <input
            type="text"
            name="nom"
            value={filmData.nom}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={filmData.description}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_created">Date Created</label>
          <input
            type="number"
            name="date_created"
            value={filmData.date_created}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="duree">Duration</label>
          <input
            type="number"
            name="duree"
            value={filmData.duree}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="prix">Price</label>
          <input
            type="number"
            name="prix"
            value={filmData.prix}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="poster">Poster Image</label>
          <input
            type="file"
            name="poster"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_categorie">Category</label>
          <input
            type="text"
            name="id_categorie"
            value={filmData.id_categorie}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_acteur_principal">Main Actor</label>
          <input
            type="text"
            name="id_acteur_principal"
            value={filmData.id_acteur_principal}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_acteur_secondaire">Secondary Actor</label>
          <input
            type="text"
            name="id_acteur_secondaire"
            value={filmData.id_acteur_secondaire}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_editeur">Publisher</label>
          <input
            type="text"
            name="id_editeur"
            value={filmData.id_editeur}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_langue">Language</label>
          <input
            type="text"
            name="id_langue"
            value={filmData.id_langue}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_realisateur">Director</label>
          <input
            type="text"
            name="id_realisateur"
            value={filmData.id_realisateur}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Adding..." : "Add Film"}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default AddFilm;
