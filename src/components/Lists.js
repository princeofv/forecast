import React from "react";
import { FixedSizeList } from "react-window";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { zipcode } from "../data/zipcode";
const Row = ({ index, style }) => (
  <div style={style}>
    <p>{items[index]}</p>
  </div>
);
const items = [...zipcode]; // some list of items

export default function Lists() {
  return (
    <div>
      <>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search"
            autocomplete="on"
            data={zipcode}
            renderItem={(item) => {
              return <div>{item}</div>;
            }}
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </>
      <div>
        <FixedSizeList
          height={800}
          width={"100%"}
          itemSize={30}
          itemCount={items.length}
          style={{ backgroundColor: "gray" }}
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  );
}
