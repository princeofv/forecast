import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormControl, InputGroup, Button } from "react-bootstrap";
import { FixedSizeList } from "react-window";
import { zipcode } from "../data/zipcode";
import { zipcode1 } from "../data/zip_code_database";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "axios";
import "./index.css";
import NoSearch from "../img/sea.png";
// Gutter
const GUTTER_SIZE = 10;
const COLUMN_WIDTH = 100;
const ROW_HEIGHT = 35;
export default function ForeCast() {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const buttonOnClick = () => {
    setValue(search);
  };
  const URL = `http://api.weatherapi.com/v1/current.json?key=8538a939b8004e0d95951555221601&q=${value}&aqi=no`;
  const Row1 = ({ index, style }) => (
    <>
      <div
        style={{
          ...style,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          left: style.left + GUTTER_SIZE,
          top: style.top + GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
        }}
        onClick={() => {
          console.log("index", items[index][0]);
          setValue(items[index][0]);
        }}
      >
        <p>
          {items[index][1]} - {items[index][0]}
        </p>
      </div>
    </>
  );
  const items = [...zipcode1]; // some list of items
  useEffect(() => {
    axios.get(URL).then((res, i) => {
      console.log(`res.data`, res.data);
      setData(res.data);
    });
  }, [value]);

  return (
    <Container>
      <Row>
          <h1>Weather Forecast - California Zip Codes</h1>
      </Row>
      <hr />
      <Row>
        <Col md={3} lg={3}>
          <div style={{ alignItems: "center" }}>
            <>
              {/* <InputGroup className="mb-3">
                <Typeahead
                  // clearButton
                  // defaultSelected={zipcode.slice(0, 1)}
                  id="selections-example"
                  labelKey="name"
                  onChange={(val) => {
                    setSearch(val[0]);
                  }}
                  options={zipcode}
                  placeholder="Search a Zipcode..."
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={buttonOnClick}>
                  Search
                </Button>
              </InputGroup> */}
            </>
            <div>
              <FixedSizeList
                height={450}
                width={"100%"}
                itemSize={50}
                itemCount={items.length}
                style={{ backgroundColor: "#e4ebe8" }}
                columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
                rowHeight={ROW_HEIGHT + GUTTER_SIZE}
              >
                {Row1}
              </FixedSizeList>
            </div>
          </div>
        </Col>
        <Col md={9}>
          {data ? (
            <div class="">
              <div class="row justify-content-center">
                  <div class="card p-4">
                    <h6>Country:{data.location.country}</h6>
                    <h6>Region:{data.location.region}</h6>
                    <h6>Latitude :{data.location.lat}</h6>
                    <h6>longitude:{data.location.lon}</h6>
                    <hr />
                    <div class="d-flex">
                      <h6 class="flex-grow-1">{data.location.name}</h6>
                      <h6>{data.location.localtime}</h6>
                    </div>
                    <div class="d-flex flex-column temp mt-5 mb-3">
                      <h1 class="mb-0 font-weight-bold" id="heading">
                        {" "}
                        {data.current.temp_c}?? C{" "}
                      </h1>{" "}
                      {/* <span class="small grey">Stormy</span> */}
                    </div>
                    <div class="d-flex">
                      <div class="temp-details flex-grow-1">
                        <p class="my-1">
                          {" "}
                          <img src="https://i.imgur.com/B9kqOzp.png" height="17px" />{" "}
                          <span> {data.current.wind_kph} km/h </span>{" "}
                        </p>
                        <p class="my-1">
                          {" "}
                          <i class="fa fa-tint mr-2" aria-hidden="true"></i>{" "}
                          <span>Wind direction: {data.current.wind_dir} </span>{" "}
                        </p>
                        <p class="my-1">
                          {" "}
                          <img src="https://i.imgur.com/wGSJ8C5.png" height="17px" />{" "}
                          <span> humidity :{data.current.humidity}</span>{" "}
                        </p>
                      </div>
                      <div>
                        {" "}
                        <img src={data.current.condition.icon} width="100px" />{" "}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          ) : (
            <Container style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
              <Row>
                <Col>
                  <h2>Please Select the Zipcode</h2>
                  <img src={NoSearch} height={300} width={300} />
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}
