import React, { useContext,useRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { BeersStore } from "../../../stores/index";
import { observer } from "mobx-react-lite";
import  "./SearchBox.scss";

const SearchBox = () => {
  const beersStore = useContext(BeersStore);
  const inputRef = useRef()

  return (
    <>
        <InputGroup className="mb-3 search">
          <FormControl
            placeholder="Food Pairing"
            ref={inputRef}
          />
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon2"
                onClick={() => beersStore.getFoodPairing(inputRef.current.value)}

            >🔍</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
    </>
  );
};

export default observer(SearchBox);
