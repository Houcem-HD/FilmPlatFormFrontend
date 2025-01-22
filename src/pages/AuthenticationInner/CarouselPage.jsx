import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";

// img 
import authOverlay from "../../assets/images/bg-auth-overlay.png"

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="bg-overlay" style={{ background: `url(${authOverlay})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
            <div className="d-flex h-100 flex-column">
              <div className="p-4 mt-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <div className="text-center">
                      <h4 className="mb-3">
                        <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                        <span className="text-primary">5k</span>+ Satisfied
                        clients
                      </h4>
                      <div dir="ltr">
                        <Carousel className="owl-carousel owl-theme auth-review-carousel slider_css" id="auth-review-carousel"
                          showThumbs={false}>
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;Notre plateforme de streaming en ligne qui
                                  offre une expérience &apos;unique&lsquo;. Avec une interface
                                  conviviale et des fonctionnalités avancées, elle offre
                                  une expérience immersive et personnalisée aux amateurs de cinéma.. &ldquo;
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;Our platform strinmming online offers a &apos;unique&&lsquo; experience.&ldquo;
                                </p>
                              </div>
                            </div>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment >
  )
}
export default CarouselPage
