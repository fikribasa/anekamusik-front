import React from "react";
import Category from "../Components/Category";
import Item from "../Components/Item";
import { connect } from "react-redux";
import { getCategories, setDisplay } from "../public/redux/actions/categories";
import {
  getItemsByCategory,
  getItemsByName
} from "../public/redux/actions/items";
import "../style/ContentList.css";
import { Link } from "react-router-dom";

class ContentList extends React.Component {
  state = {
    categories: [],
    items: [],
    displayCategories: "",
    search: "",
    user: {},
    token: ""
  };

  componentDidMount = async () => {
    await this.setState({
      user: {
        id: localStorage.getItem("userID"),
        name: localStorage.getItem("userName"),
        email: localStorage.getItem("userEmail"),
        level: localStorage.getItem("userLevel")
      },
      token: localStorage.getItem("token")
    });

    await this.props.dispatch(getCategories());
    await this.setState({
      categories: this.props.categories,
      displayCategories: this.props.displayCategories
    });
  };

  displayItems = async (id) => {
    await this.props.dispatch(getItemsByCategory(id));
    await this.props.dispatch(setDisplay(false));
    await this.setState({
      items: this.props.items,
      displayCategories: this.props.displayCategories
    });
  };

  search = async (event) => {
    // eslint-disable-next-line
    if (event.target.value != "") {
      await this.setState({ [event.target.name]: [event.target.value] });
      await this.props.dispatch(getItemsByName(this.state.search));
      await this.props.dispatch(setDisplay(false));

      await this.setState({
        items: this.props.items,
        displayCategories: this.props.displayCategories
      });
    } else {
      await this.props.dispatch(setDisplay(true));
      await this.setState({ displayCategories: this.props.displayCategories });
    }
  };

  render() {
    return (
      <div style={{ marginBottom: "100px", height: "3000px" }}>
        {/* search bar */}
        <div className="search-container">
          <img className="search-logo" alt=""></img>
          <input
            name="search"
            className="search-bar"
            placeholder="Search"
            onChange={this.search}
          ></input>
        </div>
        {/* setting button */}
        <div className="setting-button-container">
          <img className="setting-button-logo" alt=""></img>
        </div>

        {this.state.displayCategories ? (
          <div className="content">
            {this.state.categories.map((category) => (
              <Category
                displayItems={this.displayItems}
                category={category}
                key={category.id}
              />
            ))}
          </div>
        ) : (
          <div>
            {this.state.items.length !== 0 ? (
              <div className="content">
                {this.state.items.map((item) => (
                  <Item item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="content">
                <h1>null</h1>
              </div>
            )}
          </div>
        )}

        {this.state.user.level != undefined || 0 ? (
          <div className="button-container">
            {this.state.user.level == 1 ? ( // eslint-disable-line
              <div>
                <Link to={"/additem"}>
                  <button className="additem-button">Add Item</button>
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    displayCategories: state.categories.displayCategories,
    items: state.items.items
  };
}

export default connect(mapStateToProps)(ContentList);
