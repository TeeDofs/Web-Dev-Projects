import React, { useState } from "react";
import "../styles/DropdownStyle.css";
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DropdownMenuBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  //This controls the opening and closing of the dropdown menu
  const toggleDropDown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  //This function sets the temperature unit based on the dropdown option selected
  const handleTemperatureUnitSelect = (option) => {
    props.onTemperatureUnitSelect(option);
  };

  return (
    //This is the dropdown menu for editing the app and changing the temperature unit
    <div className="menuDropdown">
      <Container fluid={true} className="justify-content-end">
        <Dropdown isOpen={isOpen} toggle={toggleDropDown}>
          <DropdownToggle caret>Menu</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem
              onClick={() => {
                handleTemperatureUnitSelect({ value: "metric", unit: "°C" });
              }}
            >
              Celsius °C
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                handleTemperatureUnitSelect({ value: "imperial", unit: "°F" });
              }}
            >
              Fahrenheit °F
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                handleTemperatureUnitSelect({ value: "kelvin", unit: "°K" });
              }}
            >
              Kelvin °K
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Container>
    </div>
  );
}

export default DropdownMenuBar;
