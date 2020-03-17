import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class PortButtonDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  renderMenu(items) {
    return (
      <DropdownMenu className="float-right">
        {items.map((item, index) => (
          <DropdownItem {...item.handlers} key={index}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  }

  render() {
    const { items } = this.props;
    return (
      <ButtonDropdown
        className="port-dropdown"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret size="sm" className="style-dark"></DropdownToggle>
        {this.renderMenu(items)}
      </ButtonDropdown>
    );
  }
}
