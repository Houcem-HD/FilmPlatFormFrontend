import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from '../../plugins/axios';

// Import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "../../components/Common/TableContainer";

const DatatableTables = () => {
  const [categories, setCategories] = useState({});
  const [acteurs, setActeurs] = useState({});
  const [editeurs, setEditeurs] = useState({});
  const [langues, setLangues] = useState({});
  const [realisateurs, setRealisateurs] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get("categorie");
      const categoryMap = Object.fromEntries(data.map(({ id, nom }) => [id, nom]));
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchActeur = async () => {
    try {
      const { data } = await axios.get("acteur");
      const acteurMap = Object.fromEntries(data.map(({ id, nom, prenom }) => [id, `${nom} ${prenom}`]));
      setActeurs(acteurMap);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };

  const fetchEditeur = async () => {
    try {
      const { data } = await axios.get("editeur");
      const editeurMap = Object.fromEntries(data.map(({ id, nom, prenom }) => [id, `${nom} ${prenom}`]));
      setEditeurs(editeurMap);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };

  const fetchLangues = async () => {
    try {
      const { data } = await axios.get("langue");
      const languesMap = Object.fromEntries(data.map(({ id, langues }) => [id, langues]));
      setLangues(languesMap);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };
  
  const fetchRealisateur = async () => {
    try {
      const { data } = await axios.get("realisateur");
      //console.log(data);
      const realisateursMap = Object.fromEntries(data.map(({ id, nom }) => [id, nom]));
      setRealisateurs(realisateursMap);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };
  
  const fetchData = async () => {
    try {
      const { data } = await axios.get("film");
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([fetchCategory(), fetchActeur(), fetchEditeur(), fetchLangues(),fetchRealisateur(), fetchData()]);
      setLoading(false);
    };
    loadAllData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`film/${id}`);
      if (response.status === 204) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting Editor:", error);
    }
  };

  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id", enableColumnFilter: false, enableSorting: true },
      { header: "Nom", accessorKey: "nom", enableColumnFilter: false, enableSorting: true },
      { header: "Description", accessorKey: "description", enableColumnFilter: false, enableSorting: true },
      { header: "Date Created", accessorKey: "date_created", enableColumnFilter: false, enableSorting: true },
      { header: "Durée (min)", accessorKey: "duree", enableColumnFilter: false, enableSorting: true },
      {
        header: "Category",
        accessorKey: "id_categorie",
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => <span>{categories[row.original.id_categorie] || "Unknown"}</span>,
      },
      {
        header: "Acteur Principal",
        accessorKey: "id_acteur_principal",
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => <span>{acteurs[row.original.id_acteur_principal] || "Unknown"}</span>,
      },
      {
        header: "Acteur Secondaire",
        accessorKey: "id_acteur_secondaire",
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => <span>{acteurs[row.original.id_acteur_secondaire] || "Unknown"}</span>,
      },
      {
        header: "Editeur",
        accessorKey: "id_editeur",
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => <span>{editeurs[row.original.id_editeur] || "Unknown"}</span>,
      },
      {
        header: "Langue",
        accessorKey: "id_langue",
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => <span>{langues[row.original.id_langue] || "Unknown"}</span>,
      },
      {
        header: "Realisateur",
        accessorKey: "id_realisateur",
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => <span>{realisateurs[row.original.id_realisateur] || "Unknown"}</span>,
      },
      { header: "Created At", accessorKey: "created_at", enableColumnFilter: false, enableSorting: true },
      { header: "Updated At", accessorKey: "updated_at", enableColumnFilter: false, enableSorting: true },
      {
        header: "Actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => (
          <div>
            <Link to={`/filmsEdit/${row.original.id}`} className="btn btn-primary mr-2 bx bx-edit"></Link>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="btn btn-danger bx bx-trash"
              title="Delete"
            ></button>
          </div>
        ),
      },
    ],
    [categories, acteurs]
  );

  document.title = "List Langues";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />
        <div className="mb-4">
          <Link to="/filmsAdd" className="btn btn-primary">Add Language</Link>
        </div>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <TableContainer
            columns={columns}
            data={data || []}
            isGlobalFilter={true}
            isPagination={true}
            SearchPlaceholder="Search records..."
            pagination="pagination"
            paginationWrapper="dataTables_paginate paging_simple_numbers"
            tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
          />
        )}
      </div>
    </div>
  );
};

DatatableTables.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default DatatableTables;
