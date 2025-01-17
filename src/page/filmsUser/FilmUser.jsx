import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, TabContent, TabPane } from "reactstrap";
import axios from '../../plugins/axios';
import StarRatings from "react-star-ratings";
import classnames from "classnames";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom"; // Import useParams hook from react-router-dom

const EcommerceFilmDetail = () => {
  // Meta title
  document.title = "Film Details";

  const [film, setFilm] = useState(null);  // State to hold the film data
  const [activeTab, setActiveTab] = useState("1");

  // Get the film ID from the URL parameters using useParams hook
  const { id } = useParams();  // This will get the 'id' from the route parameter

  // Fetch the film details from the Laravel backend
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(`film/${id}`);
        setFilm(response.data);
      } catch (error) {
        console.error("Error fetching film data", error);
      }
    };

    if (id) {
      fetchFilm();  // Only fetch data if the id is available
    }
  }, [id]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Film" breadcrumbItem="Film Detail" />
        {!isEmpty(film) && (
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col xl={6}>
                      <div className="product-detai-imgs">
                        <TabContent activeTab={activeTab}>
                          {[1, 2, 3, 4].map((tabId) => (
                            <TabPane key={tabId} tabId={tabId.toString()}>
                              <img
                                src={film.poster} 
                                alt={`film-img-${tabId}`}
                                className="img-fluid mx-auto d-block"
                              />
                            </TabPane>
                          ))}
                        </TabContent>
                        <div className="text-center mt-2">
                          <Button color="success" className="ms-1">
                            <i className="bx bx-show me-2" /> Watch now
                          </Button>
                        </div>
                      </div>
                    </Col>
                    <Col xl={6}>
                      <div className="mt-4 mt-xl-3">
                        <h4 className="mt-1 mb-3">{film.nom}</h4>

                        {!!film.isOffer && (
                          <h6 className="text-success text-uppercase">{film.offer}% Off</h6>
                        )}

                        <p className="text-muted mb-4">{film.description}</p>

                        <Row className="mb-3">
                          <Col md="6">
                            <p className="text-muted">Duration: {film.duree} minutes</p>
                          </Col>
                          <Col md="6">
                            <p className="text-muted">Release Date: {film.date_created}</p>
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          {film.features?.map((item, i) => (
                            <Col md="6" key={i}>
                              <p className="text-muted">
                                <i className={classnames(item.icon, "font-size-16 align-middle text-primary me-2")} />
                                {item.type && `${item.type}: `} {item.value}
                              </p>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default EcommerceFilmDetail;
